
import React, { Suspense, lazy, useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useUser, UserProvider } from './hooks/useUser';
import type { Lesson, Challenge } from './types';
import { lessons } from './data/lessons';
import { CodeIcon, UserIcon, BookOpenIcon, ChevronRightIcon, LogoutIcon, LinkedInIcon, InstagramIcon } from './components/icons/Icons';
import ErrorBoundary from './components/ErrorBoundary';

const Profile = lazy(() => import('./components/Profile'));
const LessonView = lazy(() => import('./components/LessonView'));
const ChallengeView = lazy(() => import('./components/ChallengeView'));

const AppContent: React.FC = () => {
    const { user, logout } = useUser();
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
    const [view, setView] = useState<'main' | 'profile'>('main');

    const handleSelectLesson = (lesson: Lesson) => {
        setActiveLesson(lesson);
        setActiveChallenge(null);
        setView('main');
    };

    const handleSelectChallenge = (challenge: Challenge) => {
        setActiveChallenge(challenge);
    };

    const handleBackToDashboard = () => {
        setActiveLesson(null);
        setActiveChallenge(null);
        setView('main');
    };

    const handleBackToLesson = () => {
        setActiveChallenge(null);
    };

    const handleCompleteAndContinue = () => {
        if (!activeLesson) return;
        const currentIndex = lessons.findIndex(l => l.day === activeLesson.day);
        if (currentIndex < 0) {
            handleBackToDashboard();
            return;
        }
        const nextLesson = lessons[currentIndex + 1];

        if (nextLesson) {
            setActiveLesson(nextLesson);
            setActiveChallenge(null); 
        } else {
            handleBackToDashboard();
        }
    };

    const handleLogout = () => {
        logout();
        // The main component will re-render and show the Login component
        // because the user object will be null.
        handleBackToDashboard();
    }

    const renderView = () => {
        if (view === 'profile') {
            return <Profile />;
        }
        if (activeChallenge && activeLesson) {
             const currentChallengeIndex = activeLesson.challenges.findIndex(c => c.id === activeChallenge.id);
             const isFirstChallenge = currentChallengeIndex === 0;
             const isLastChallenge = currentChallengeIndex === activeLesson.challenges.length - 1;

             const handleNextChallenge = () => {
                 if (!isLastChallenge) {
                     setActiveChallenge(activeLesson.challenges[currentChallengeIndex + 1]);
                 }
             };

             const handlePreviousChallenge = () => {
                 if (!isFirstChallenge) {
                     setActiveChallenge(activeLesson.challenges[currentChallengeIndex - 1]);
                 }
             };

            return (
                <ChallengeView
                    lesson={activeLesson}
                    challenge={activeChallenge}
                    onBackToLesson={handleBackToLesson}
                    onNextChallenge={handleNextChallenge}
                    onPreviousChallenge={handlePreviousChallenge}
                    isFirstChallenge={isFirstChallenge}
                    isLastChallenge={isLastChallenge}
                />
            );
        }
        if (activeLesson) {
            return <LessonView lesson={activeLesson} onSelectChallenge={handleSelectChallenge} onCompleteAndContinue={handleCompleteAndContinue} />;
        }
        return <Dashboard onSelectLesson={handleSelectLesson} />;
    };

    if (!user) {
        return <Login />;
    }
    
    const isProfileActive = view === 'profile';
    const isDashboardActive = view === 'main' && !activeLesson && !activeChallenge;

    return (
        <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
            <header className="bg-[var(--color-surface-translucent)] backdrop-blur-lg border-b border-[var(--color-border)] sticky top-0 z-20">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                             <a href="#" onClick={(e) => { e.preventDefault(); handleBackToDashboard(); }} className="flex items-center space-x-3 group">
                                <CodeIcon className="h-8 w-8 text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)] group-hover:animate-pulse transition-transform duration-300 group-hover:scale-110" />
                                <h1 className="text-2xl font-bold text-[var(--color-text-main)]">Python Quest</h1>
                            </a>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button onClick={() => { handleBackToDashboard(); setView('main'); }} className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_15px_var(--color-primary)]/40 ${isDashboardActive ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_var(--color-primary)]/50' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-main)]'}`}>
                                <BookOpenIcon className="h-5 w-5" />
                                <span>Dashboard</span>
                            </button>
                             <button onClick={() => setView('profile')} className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_15px_var(--color-primary)]/40 ${isProfileActive ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_var(--color-primary)]/50' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-main)]'}`}>
                                <UserIcon className="h-5 w-5" />
                                <span>{user.username}'s Profile</span>
                            </button>
                             <button onClick={handleLogout} title="Logout" className="flex items-center justify-center w-9 h-9 rounded-md text-sm font-medium transition-all duration-300 text-[var(--color-text-muted)] hover:bg-[var(--color-danger-muted)] hover:text-[var(--color-danger)]">
                                <LogoutIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </nav>
                 {view === 'main' && activeLesson && (
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 border-t border-[var(--color-border)] bg-black/10">
                        <div className="flex items-center text-sm font-medium text-[var(--color-text-muted)]">
                            <a href="#" onClick={(e) => { e.preventDefault(); handleBackToDashboard(); }} className="hover:text-[var(--color-primary)]">Dashboard</a>
                            <ChevronRightIcon className="h-4 w-4 mx-1" />
                            <a href="#" onClick={(e) => { e.preventDefault(); handleBackToLesson(); }} className="hover:text-[var(--color-primary)]">Day {activeLesson.day}: {activeLesson.title}</a>
                            {activeChallenge && (
                                <>
                                    <ChevronRightIcon className="h-4 w-4 mx-1" />
                                    <span className="text-[var(--color-text-main)]">{activeChallenge.title}</span>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
                <ErrorBoundary>
                    <Suspense fallback={<div className="text-[var(--color-text-muted)] animate-pulse">Loading view...</div>}>
                        {renderView()}
                    </Suspense>
                </ErrorBoundary>
            </main>
            <footer className="py-6 text-center text-[var(--color-text-muted)] text-sm border-t border-[var(--color-border)] mt-auto">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="mb-2">Created by V. Vinay Verma</p>
                    <div className="flex justify-center items-center space-x-4">
                        <a href="https://www.linkedin.com/in/vvinayverma/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors" aria-label="V. Vinay Verma's LinkedIn Profile">
                            <LinkedInIcon className="h-5 w-5" />
                        </a>
                        <a href="https://www.instagram.com/vinay.vtg/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors" aria-label="V. Vinay Verma's Instagram Profile">
                            <InstagramIcon className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <UserProvider>
            <AppContent />
        </UserProvider>
    );
};

export default App;
