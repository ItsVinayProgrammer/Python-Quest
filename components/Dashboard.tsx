import React, { useState, useMemo } from 'react';
import { useUser } from '../hooks/useUser';
import { lessons } from '../data/lessons';
import type { Lesson } from '../types';
import { CheckIcon, LockIcon } from './icons/Icons';

interface DashboardProps {
    onSelectLesson: (lesson: Lesson) => void;
}

const UnlockModal: React.FC<{
    lesson: Lesson,
    onClose: () => void,
    onConfirm: () => void
}> = ({ lesson, onClose, onConfirm }) => {
    const [reason, setReason] = useState('');

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-4">Unlock "Day {lesson.day}: {lesson.title}"?</h2>
                <p className="text-[var(--color-text-muted)] mb-4">We recommend following the lessons in order to build a strong foundation. Skipping ahead might be confusing if you miss key concepts.</p>
                <p className="text-[var(--color-text-muted)] mb-6">If you're sure, please let us know why you're skipping ahead:</p>
                <select 
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md text-[var(--color-text-main)] mb-6 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                    <option value="" disabled>Select a reason...</option>
                    <option value="review">I'm reviewing a topic I already know</option>
                    <option value="interview">I'm preparing for an interview</option>
                    <option value="curious">I'm just curious about this topic</option>
                    <option value="other">Other</option>
                </select>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-[var(--color-border)] hover:bg-[#415A77]/70 text-[var(--color-text-main)] rounded-md font-semibold transition-colors">Cancel</button>
                    <button onClick={onConfirm} disabled={!reason} className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-md font-semibold text-white transition-colors disabled:bg-[var(--color-text-muted)]/50 disabled:cursor-not-allowed">Unlock Topic</button>
                </div>
            </div>
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ onSelectLesson }) => {
    const { user, unlockLessonEarly } = useUser();
    const [unlockModalOpen, setUnlockModalOpen] = useState<Lesson | null>(null);

    const completedChallenges = user?.completedChallenges ?? [];
    const unlockedEarly = user?.unlockedEarly ?? [];
    const completedChallengeSet = useMemo(() => new Set(completedChallenges), [completedChallenges]);
    
    const lastCompletedDay = useMemo(() => {
        if (!lessons || lessons.length === 0) return 0;
        const completedCoreDays = lessons
            .filter(lesson => {
                const coreChallenge = lesson.challenges.find(c => !c.isOptional);
                return Boolean(coreChallenge && completedChallengeSet.has(coreChallenge.id));
            })
            .map(lesson => lesson.day);
        return Math.max(0, ...completedCoreDays, 0);
    }, [completedChallengeSet]);

    const handleUnlockLesson = (lesson: Lesson) => {
        if (!lesson) return;
        setUnlockModalOpen(lesson);
    };

    const confirmUnlock = () => {
        if (unlockModalOpen) {
            unlockLessonEarly(unlockModalOpen.day);
            setUnlockModalOpen(null);
        }
    };

    const getSkillClassName = (skill: string) => {
        return `skill-${skill.toLowerCase().replace(/ /g, '-')}`;
    };

    return (
        <div>
            {unlockModalOpen && <UnlockModal lesson={unlockModalOpen} onClose={() => setUnlockModalOpen(null)} onConfirm={confirmUnlock} />}
            <div className="text-center mb-12 animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-main)]">Your Learning Path</h1>
                <p className="text-lg text-[var(--color-text-muted)] mt-2">Complete daily lessons to master Python.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {lessons.map((lesson, index) => {
                    const coreChallenge = lesson.challenges.find(c => !c.isOptional);
                    const isCompleted = coreChallenge ? completedChallenges.includes(coreChallenge.id) : false;
                    const isUnlocked = lesson.day <= lastCompletedDay + 1 || unlockedEarly.includes(lesson.day) || isCompleted;
                    const wasUnlockedEarly = unlockedEarly.includes(lesson.day) && !isCompleted;

                    const cardStateClass = isUnlocked
                        ? 'cursor-pointer'
                        : 'opacity-60 filter saturate-50';
                    
                    const skillClass = getSkillClassName(lesson.skill);

                    return (
                        <div
                            key={lesson.day}
                            className={`animate-fade-in-up ${cardStateClass} ${skillClass}`}
                            style={{ animationDelay: `${index * 50}ms`, '--glow-color': 'var(--skill-color, var(--color-border))' } as React.CSSProperties}
                            onClick={() => isUnlocked ? onSelectLesson(lesson) : handleUnlockLesson(lesson)}
                            aria-disabled={!isUnlocked}
                        >
                            <div
                                className={`group relative p-5 h-full flex flex-col justify-between bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl transition-all duration-300 transform-gpu ${isUnlocked ? 'hover:scale-[1.03] hover:border-[var(--glow-color)] hover:shadow-[0_0_20px_-5px_var(--glow-color)]' : ''}`}
                            >
                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <p className="font-bold text-lg text-[var(--color-text-muted)]">Day {lesson.day}</p>
                                        <span 
                                            className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full text-white/90"
                                            style={{ backgroundColor: 'var(--glow-color)' }}
                                        >
                                            {lesson.skill}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-[var(--color-text-main)] flex-grow">{lesson.title}</h2>
                                </div>
                                
                                <div className="mt-4 flex items-center justify-end h-5">
                                    {isCompleted ? (
                                        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-success)]">
                                            <CheckIcon className="h-5 w-5" />
                                            <span>Completed</span>
                                        </div>
                                    ) : isUnlocked ? (
                                        wasUnlockedEarly && <div className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">UNLOCKED</div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)]">
                                            <LockIcon className="h-4 w-4" />
                                            <span>Locked</span>
                                        </div>
                                    )}
                                </div>
                                {isCompleted && (
                                     <div 
                                        className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                                        style={{ borderColor: 'var(--color-success)', boxShadow: 'inset 0 0 15px -5px var(--color-success)' }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
