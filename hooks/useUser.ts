
import React, { createContext, useContext, useMemo, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import type { User } from '../types';
import {
    createSalt,
    hashPassword,
    constantTimeEqual,
    normalizeEmail,
    isValidEmail,
    validatePasswordStrength,
} from '../utils/security';

interface UserContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    signup: (fullName: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    updateUser: (updates: Partial<Omit<User, 'password' | 'passwordHash' | 'passwordSalt'>>) => void;
    completeChallenge: (challengeId: string, xpValue: number, day: number) => void;
    unlockLessonEarly: (day: number) => void;
    checkUserExists: (email: string) => Promise<boolean>;
    resetPassword: (email: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useLocalStorage<User[]>('python-quest-users', []);
    const [activeUserEmail, setActiveUserEmail] = useLocalStorage<string | null>('python-quest-active-user-email', null);

    const user = useMemo((): User | null => {
        if (!activeUserEmail) return null;
        const foundUser = users.find(u => u.email === activeUserEmail);
        if (!foundUser) return null;
        
        // Ensure sensitive credential fields are never exposed via context.
        const { password, passwordHash, passwordSalt, ...userWithoutPassword } = foundUser;
        return userWithoutPassword;
    }, [activeUserEmail, users]);

    const updateUser = useCallback((updates: Partial<Omit<User, 'password' | 'passwordHash' | 'passwordSalt'>>) => {
        if (user) {
            setUsers(prevUsers =>
                prevUsers.map(u =>
                    u.email === user.email ? { ...u, ...updates } : u
                )
            );
        }
    }, [user, setUsers]);
    
    const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
        const normalizedEmail = normalizeEmail(email);
        if (!isValidEmail(normalizedEmail) || !password.trim()) {
            return { success: false, message: 'Invalid email or password.' };
        }

        const foundUser = users.find(u => normalizeEmail(u.email) === normalizedEmail);
        if (!foundUser) {
            return { success: false, message: 'Invalid email or password.' };
        }

        let isValidPassword = false;

        if (foundUser.passwordHash && foundUser.passwordSalt) {
            const incomingHash = await hashPassword(password, foundUser.passwordSalt);
            isValidPassword = constantTimeEqual(foundUser.passwordHash, incomingHash);
        } else if (foundUser.password) {
            // Legacy migration: verify old plaintext once, then upgrade to salted hash.
            isValidPassword = constantTimeEqual(foundUser.password, password);
            if (isValidPassword) {
                const passwordSalt = createSalt();
                const passwordHash = await hashPassword(password, passwordSalt);
                setUsers((prevUsers) => prevUsers.map((item) => (
                    item.email === foundUser.email
                        ? { ...item, password: undefined, passwordHash, passwordSalt }
                        : item
                )));
            }
        }

        if (isValidPassword) {
            setActiveUserEmail(foundUser.email);
            return { success: true };
        }

        return { success: false, message: 'Invalid email or password.' };
    }, [users, setActiveUserEmail, setUsers]);

    const signup = useCallback(async (fullName: string, email: string, password: string): Promise<{ success: boolean; message?: string }> => {
        const normalizedEmail = normalizeEmail(email);
        const normalizedName = fullName.trim();

        if (normalizedName.length < 2 || normalizedName.length > 80) {
            return { success: false, message: 'Please enter a valid full name.' };
        }
        if (!isValidEmail(normalizedEmail)) {
            return { success: false, message: 'Please enter a valid email address.' };
        }

        const passwordPolicy = validatePasswordStrength(password);
        if (!passwordPolicy.valid) {
            return { success: false, message: passwordPolicy.message };
        }

        if (users.find(u => normalizeEmail(u.email) === normalizedEmail)) {
            return { success: false, message: 'An account with this email already exists.' };
        }

        const passwordSalt = createSalt();
        const passwordHash = await hashPassword(password, passwordSalt);
        
        const newUser: User = {
            username: normalizedName,
            email: normalizedEmail,
            passwordHash,
            passwordSalt,
            completedChallenges: [],
            streak: 0,
            createdAt: new Date().toISOString(),
            xp: 0,
            badges: [],
            unlockedEarly: [],
        };

        setUsers(prevUsers => [...prevUsers, newUser]);
        setActiveUserEmail(normalizedEmail);
        return { success: true };
    }, [users, setUsers, setActiveUserEmail]);

    const logout = useCallback(() => {
        setActiveUserEmail(null);
    }, [setActiveUserEmail]);

    const checkUserExists = useCallback(async (email: string): Promise<boolean> => {
        const normalizedEmail = normalizeEmail(email);
        if (!isValidEmail(normalizedEmail)) return false;
        return users.some(u => normalizeEmail(u.email) === normalizedEmail);
    }, [users]);

    const resetPassword = useCallback(async (email: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
        const normalizedEmail = normalizeEmail(email);
        const passwordPolicy = validatePasswordStrength(newPassword);
        if (!isValidEmail(normalizedEmail) || !passwordPolicy.valid) {
            return { success: false, message: passwordPolicy.message || 'Invalid request.' };
        }

        const passwordSalt = createSalt();
        const passwordHashPromise = hashPassword(newPassword, passwordSalt);
        let userFound = false;

        const passwordHash = await passwordHashPromise;
        const updatedUsers = users.map((u) => {
            if (normalizeEmail(u.email) === normalizedEmail) {
                userFound = true;
                return { ...u, password: undefined, passwordHash, passwordSalt };
            }
            return u;
        });

        // Keep response generic to reduce account enumeration risk.
        if (userFound) {
            setUsers(updatedUsers);
        }
        return { success: true };
    }, [users, setUsers]);

    const completeChallenge = useCallback((challengeId: string, xpValue: number, day: number) => {
        if (user && !user.completedChallenges.includes(challengeId)) {
            const newXp = (user.xp || 0) + (xpValue || 50);
            const newStreak = user.streak + 1;
            const newBadges = [...user.badges];

            if (user.completedChallenges.length === 0 && !newBadges.includes('First Steps')) newBadges.push('First Steps');
            if (newStreak === 3 && !newBadges.includes('3-Day Streak')) newBadges.push('3-Day Streak');
            if (newStreak === 7 && !newBadges.includes('7-Day Streak')) newBadges.push('7-Day Streak');

            const updates = {
                completedChallenges: [...user.completedChallenges, challengeId],
                streak: newStreak,
                xp: newXp,
                badges: newBadges,
            };
            updateUser(updates);
        }
    }, [user, updateUser]);

    const unlockLessonEarly = useCallback((day: number) => {
        if (user && !user.unlockedEarly.includes(day)) {
            updateUser({
                unlockedEarly: [...user.unlockedEarly, day]
            });
        }
    }, [user, updateUser]);

    const value = useMemo(() => ({
        user,
        login,
        signup,
        logout,
        updateUser,
        completeChallenge,
        unlockLessonEarly,
        checkUserExists,
        resetPassword,
    }), [user, login, signup, logout, updateUser, completeChallenge, unlockLessonEarly, checkUserExists, resetPassword]);

    return React.createElement(UserContext.Provider, { value: value as any }, children);
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
