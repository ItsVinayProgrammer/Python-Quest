
import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { CodeIcon } from './icons/Icons';
import { isValidEmail, normalizeEmail, validatePasswordStrength } from '../utils/security';

const Login: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'signup' | 'forgotPassword' | 'resetPassword' | 'success'>('login');
    const { login, signup, checkUserExists, resetPassword } = useUser();
    
    // Form fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // State for flow
    const [emailForReset, setEmailForReset] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const clearFormState = () => {
        setError('');
        setSuccessMessage('');
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const handleFormSwitch = (newMode: 'login' | 'signup' | 'forgotPassword') => {
        setMode(newMode);
        clearFormState();
    };

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const normalizedEmail = normalizeEmail(email);
            if (!isValidEmail(normalizedEmail)) {
                setError('Please enter a valid email address.');
                setLoading(false);
                return;
            }

            if (mode === 'login') {
                const result = await login(normalizedEmail, password);
                if (!result.success) {
                    setError(result.message || 'Login failed.');
                }
            } else { // signup
                const passwordPolicy = validatePasswordStrength(password);
                if (!passwordPolicy.valid) {
                    setError(passwordPolicy.message || 'Password does not meet requirements.');
                    setLoading(false);
                    return;
                }
                const result = await signup(fullName, normalizedEmail, password);
                if (!result.success) {
                    setError(result.message || 'Signup failed.');
                }
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const normalizedEmail = normalizeEmail(email);
        if (!isValidEmail(normalizedEmail)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        const userExists = await checkUserExists(normalizedEmail);
        if (userExists) {
            // In a real app, an email would be sent. Here we proceed to the reset step.
            setEmailForReset(normalizedEmail);
            setMode('resetPassword');
            setEmail('');
        } else {
            // Generic response helps reduce account enumeration.
            setSuccessMessage('If an account exists for that email, reset instructions have been sent.');
            setMode('success');
        }
        setLoading(false);
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const passwordPolicy = validatePasswordStrength(password);
        if (!passwordPolicy.valid) {
            setError(passwordPolicy.message || 'Password does not meet requirements.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError('');
        
        const result = await resetPassword(emailForReset, password);
        if(result.success) {
            setMode('success');
            setSuccessMessage('If an account exists, the password has been reset successfully.');
            setPassword('');
            setConfirmPassword('');
        } else {
            setError(result.message || 'Failed to reset password.');
        }

        setLoading(false);
    };
    
    const renderFormContent = () => {
        switch(mode) {
            case 'login':
            case 'signup':
                return (
                    <form onSubmit={handleAuthSubmit}>
                        {mode === 'signup' && (
                             <div className="mb-4">
                                <label htmlFor="fullName" className="sr-only">Full Name</label>
                                <input
                                    type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
                                    placeholder="Full Name" required
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
                                placeholder="Email Address" required autoComplete="email"
                            />
                        </div>
                        <div className="mb-2">
                             <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
                                placeholder="Password" required minLength={mode === 'signup' ? 6 : undefined}
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                            />
                        </div>
                        {mode === 'login' && (
                            <div className="text-right mb-4">
                                <button type="button" onClick={() => setMode('forgotPassword')} className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200">
                                    Forgot Password?
                                </button>
                            </div>
                        )}
                         {mode === 'signup' && <div className="h-6"></div>}
                        
                        {error && <p className="text-sm text-[var(--color-danger)] mb-4 bg-[var(--color-danger-muted)] py-2 px-3 rounded-md">{error}</p>}
                        
                        <button type="submit" className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] focus:ring-[var(--color-primary)] disabled:bg-[var(--color-text-muted)]/50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-[var(--color-primary)]/40" disabled={loading || !email.trim() || !password.trim() || (mode === 'signup' && !fullName.trim())}>
                            {loading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Create Account')}
                        </button>
                    </form>
                );
            case 'forgotPassword':
                 return (
                    <form onSubmit={handleForgotSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
                                placeholder="Enter your registered email" required autoComplete="email"
                            />
                        </div>
                        {error && <p className="text-sm text-[var(--color-danger)] mb-4 bg-[var(--color-danger-muted)] py-2 px-3 rounded-md">{error}</p>}
                        <button type="submit" className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] focus:ring-[var(--color-primary)] disabled:bg-[var(--color-text-muted)]/50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-[var(--color-primary)]/40" disabled={loading || !email.trim()}>
                            {loading ? 'Checking...' : 'Send Reset Instructions'}
                        </button>
                    </form>
                );
            case 'resetPassword':
                return (
                    <form onSubmit={handleResetSubmit}>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">New Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
                                placeholder="New Password" required minLength={6} autoComplete="new-password"
                            />
                        </div>
                         <div className="mb-6">
                            <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
                            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
                                placeholder="Confirm New Password" required minLength={6} autoComplete="new-password"
                            />
                        </div>
                        {error && <p className="text-sm text-[var(--color-danger)] mb-4 bg-[var(--color-danger-muted)] py-2 px-3 rounded-md">{error}</p>}
                        <button type="submit" className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] focus:ring-[var(--color-primary)] disabled:bg-[var(--color-text-muted)]/50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-[var(--color-primary)]/40" disabled={loading || !password.trim() || !confirmPassword.trim()}>
                            {loading ? 'Resetting...' : 'Set New Password'}
                        </button>
                    </form>
                );
             case 'success':
                 return (
                    <button onClick={() => handleFormSwitch('login')} className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] focus:ring-[var(--color-primary)] shadow-lg hover:shadow-[var(--color-primary)]/40">
                        Return to Login
                    </button>
                 );
            default: return null;
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)] p-4">
            <div className="w-full max-w-md mx-auto">
                <div 
                    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden transition-all duration-500"
                    style={{'--glow-color': 'var(--color-primary)', boxShadow: '0 0 80px -20px var(--glow-color)', backgroundImage: 'radial-gradient(circle at center, rgba(0, 191, 255, 0.1), transparent 40%)'} as React.CSSProperties}
                >
                    <div className="flex justify-center mb-6">
                        <CodeIcon className="h-16 w-16 text-[var(--color-primary)] drop-shadow-[0_0_10px_var(--color-primary)]" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-[var(--color-text-main)] mb-2">
                        {mode === 'login' && 'Welcome Back!'}
                        {mode === 'signup' && 'Join Python Quest'}
                        {mode === 'forgotPassword' && 'Reset Password'}
                        {mode === 'resetPassword' && 'Create New Password'}
                        {mode === 'success' && 'Success!'}
                    </h1>
                    <p className="text-[var(--color-text-muted)] mb-8 min-h-[2rem]">
                        {mode === 'login' && 'Log in to continue your adventure.'}
                        {mode === 'signup' && 'Start your 30-day coding adventure today.'}
                        {mode === 'forgotPassword' && 'Enter your email to receive reset instructions.'}
                        {mode === 'resetPassword' && `Enter a new password for ${emailForReset}.`}
                        {mode === 'success' && successMessage}
                    </p>
                    
                    {renderFormContent()}

                    { (mode === 'login' || mode === 'signup') && (
                        <p className="text-sm text-[var(--color-text-muted)] mt-8">
                            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                            <button onClick={() => handleFormSwitch(mode === 'login' ? 'signup' : 'login')} className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] ml-2 focus:outline-none">
                                {mode === 'login' ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    )}
                    { (mode === 'forgotPassword' || mode === 'resetPassword') && (
                         <p className="text-sm text-[var(--color-text-muted)] mt-8">
                            Remembered your password?
                            <button onClick={() => handleFormSwitch('login')} className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] ml-2 focus:outline-none">
                                Back to Login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
