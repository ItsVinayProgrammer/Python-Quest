
import React, { useState, useMemo } from 'react';
import { useUser } from '../hooks/useUser';
import { lessons } from '../data/lessons';
import { BadgeIcon } from './icons/Icons';

const XpDisplay: React.FC<{ xp: number }> = ({ xp }) => {
    const level = Math.floor(xp / 500) + 1;
    const xpForNextLevel = 500;
    const currentLevelXp = xp % xpForNextLevel;
    const progress = (currentLevelXp / xpForNextLevel) * 100;

    return (
        <div className="my-8">
            <div className="flex justify-between items-end mb-1 text-white">
                <h3 className="text-xl font-bold">Level {level}</h3>
                <p className="text-sm font-mono">{xp.toLocaleString()} XP</p>
            </div>
            <div className="w-full bg-[var(--color-border)] rounded-full h-2.5 overflow-hidden">
                <div 
                    className="bg-[var(--color-primary)] h-2.5 rounded-full transition-all duration-500" 
                    style={{ 
                        width: `${progress}%`,
                        boxShadow: '0 0 10px var(--color-primary)'
                    }}
                ></div>
            </div>
            <p className="text-right text-xs text-[var(--color-text-muted)] mt-1">{xpForNextLevel - currentLevelXp} XP to next level</p>
        </div>
    );
};

const BadgeDisplay: React.FC<{ badges: string[] }> = ({ badges }) => {
    if (!badges || badges.length === 0) {
        return (
            <div className="mt-8 text-center p-6 bg-[var(--color-background)] rounded-lg">
                <p className="text-[var(--color-text-muted)]">Your earned badges will appear here. Keep up the great work!</p>
            </div>
        );
    }
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-[var(--color-text-main)] mb-4">Badges Earned</h3>
            <div className="flex flex-wrap gap-4">
                {badges.map(badge => (
                    <div key={badge} className="flex items-center gap-3 bg-[var(--color-surface)] py-2 px-4 rounded-lg shadow-md border border-transparent hover:border-[var(--color-warning)] transition-colors duration-300">
                        <BadgeIcon className="h-5 w-5 text-[var(--color-warning)] drop-shadow-[0_0_5px_var(--color-warning)]" />
                        <span className="font-semibold text-[var(--color-text-main)]">{badge}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const SkillTree: React.FC = () => {
    const { user } = useUser();
    
    const completedSkills = useMemo(() => {
        if (!user || !lessons) return new Set();
        const completedChallengeIds = new Set(user.completedChallenges);
        
        return new Set(
            lessons
                .filter(l => l.challenges.some(c => !c.isOptional && completedChallengeIds.has(c.id)))
                .map(l => l.skill)
        );
    }, [user]);

    const allSkills = [...new Set(lessons.map(l => l.skill))].filter(s => s && s !== 'TBD' && s !== 'Coming Soon');

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-[var(--color-text-main)] mb-4">Skill Tree</h3>
            <div className="flex flex-wrap gap-4">
                {allSkills.map((skill, index) => {
                    const isUnlocked = completedSkills.has(skill);
                    const colorVar = `var(--skill-color-${skill.toLowerCase().replace(/ /g, '-')})`;
                    return (
                        <div key={index} className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${
                            isUnlocked ? 'text-white' : 'bg-[var(--color-border)] text-[var(--color-text-muted)]'
                        }`}
                        style={{
                            backgroundColor: isUnlocked ? colorVar : undefined,
                            boxShadow: isUnlocked ? `0 0 10px ${colorVar}` : 'none',
                            textShadow: isUnlocked ? '0 0 5px rgba(0,0,0,0.5)' : 'none'
                        }}
                        >
                            {skill}
                        </div>
                    );
                })}
            </div>
             <p className="text-[var(--color-text-muted)] text-sm mt-4">Complete more core challenges to unlock new skills!</p>
        </div>
    );
};

const Profile: React.FC = () => {
    const { user, updateUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user?.username || '');

    if (!user) {
        return <div>Loading profile...</div>;
    }

    const handleSave = () => {
        if (username.trim()) {
            updateUser({ username: username.trim() });
            setIsEditing(false);
        }
    };
    
    const { completedCoreChallenges, totalCoreChallenges } = useMemo(() => {
        const coreChallengeIds = new Set(
            lessons.flatMap(l => l.challenges.filter(c => !c.isOptional).map(c => c.id))
        );
        const completed = user.completedChallenges.filter(id => coreChallengeIds.has(id)).length;
        
        return {
            completedCoreChallenges: completed,
            totalCoreChallenges: coreChallengeIds.size
        };
    }, [user.completedChallenges]);


    return (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 max-w-4xl mx-auto" style={{
            '--glow-color': 'var(--color-primary)',
            boxShadow: '0 0 50px -20px var(--glow-color)',
        } as React.CSSProperties}>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-[var(--color-border)] rounded-full flex items-center justify-center text-4xl font-bold text-[var(--color-primary)] border-4 border-current shadow-lg"
                 style={{ textShadow: '0 0 10px var(--color-primary)'}}
                >
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md px-3 py-2 text-2xl font-bold text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                            <button onClick={handleSave} className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md font-semibold hover:bg-[var(--color-primary-hover)] transition-all shadow-lg hover:shadow-[var(--color-primary)]/50">Save</button>
                            <button onClick={() => setIsEditing(false)} className="bg-[var(--color-border)] text-[var(--color-text-main)] px-4 py-2 rounded-md font-semibold hover:bg-[#415A77]/70">Cancel</button>
                        </div>
                    ) : (
                         <div className="flex items-center gap-4">
                             <h2 className="text-3xl font-bold text-[var(--color-text-main)]">{user.username}</h2>
                             <button onClick={() => setIsEditing(true)} className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                             </button>
                        </div>
                    )}
                    <p className="text-[var(--color-text-muted)]">Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            
            <XpDisplay xp={user.xp} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
                    <p className="text-[var(--color-text-muted)] text-sm font-medium">Core Challenges Completed</p>
                    <p className="text-3xl font-bold text-[var(--color-text-main)]">{completedCoreChallenges} / {totalCoreChallenges}</p>
                </div>
                <div className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
                    <p className="text-[var(--color-text-muted)] text-sm font-medium">Current Streak</p>
                    <p className="text-3xl font-bold text-[var(--color-text-main)]">{user.streak} Days 🔥</p>
                </div>
                <div className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
                    <p className="text-[var(--color-text-muted)] text-sm font-medium">Quest Progress</p>
                    <p className="text-3xl font-bold text-[var(--color-text-main)]">{totalCoreChallenges > 0 ? Math.round((completedCoreChallenges / totalCoreChallenges) * 100) : 0}%</p>
                </div>
            </div>
            
            <BadgeDisplay badges={user.badges} />
            <SkillTree />
        </div>
    );
};

export default Profile;