


import React, { useState, useEffect, useCallback } from 'react';
import { diffChars } from 'diff';
import type { Lesson, Challenge, TestResult, TestCase, GroundedPracticeProblem } from '../types';
import { executePython } from '../services/pythonExecutor';
import { getHint, explainCode, clarifyConcept, generateWebPracticeProblem } from '../services/geminiService';
import { useUser } from '../hooks/useUser';
import { SparklesIcon, LightbulbIcon, CheckIcon, XIcon, AcademicCapIcon, GlobeAltIcon, BookOpenIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';
import CelebrationAnimation from './CelebrationAnimation';
import { sanitizeTextForDisplay } from '../utils/security';

const CodeEditor: React.FC<{
    code: string,
    setCode: (code: string) => void,
    onRun: () => void,
}> = ({ code, setCode, onRun }) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                onRun();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onRun]);

    return (
        <div className="h-full flex flex-col bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] shadow-inner">
            <div className="flex-grow relative">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full bg-transparent text-[var(--color-text-main)] font-mono text-base p-4 resize-none focus:outline-none leading-relaxed"
                    spellCheck="false"
                    aria-label="Code Editor"
                />
            </div>
            <div className="text-xs text-[var(--color-text-muted)] p-2 border-t border-[var(--color-border)] bg-[var(--color-background)]/50 text-center">
                <span className="font-semibold">{navigator.userAgent.includes("Mac") ? "Cmd" : "Ctrl"}+Enter</span> to Run
            </div>
        </div>
    );
};


const DiffViewer: React.FC<{ str1: string, str2: string }> = ({ str1, str2 }) => {
    const parts = diffChars(str1, str2);

    return (
        <pre className="font-mono whitespace-pre-wrap text-left p-2 rounded-md bg-[#0B1726]">
            <span className="text-[var(--color-text-muted)] text-xs block">Expected:</span>
            <span className="text-[var(--color-success)]/80">{str2}</span>
            <span className="text-[var(--color-text-muted)] text-xs block mt-2">Your Output:</span>
            {parts.map((part, i) => {
                const style = part.added ? 'bg-[var(--color-success-muted)] text-[var(--color-success)]' :
                              part.removed ? 'bg-[var(--color-danger-muted)] text-[var(--color-danger)]' : 'text-[var(--color-text-muted)]';
                return <span key={i} className={style}>{part.value}</span>;
            })}
        </pre>
    );
};

const Terminal: React.FC<{ 
    results: TestResult[], 
    isSubmitting: boolean,
    testCases: TestCase[] 
}> = ({ results, isSubmitting, testCases }) => {
    
    if (isSubmitting) {
        return <div className="p-4 text-[var(--color-text-muted)] animate-pulse">Running tests...</div>;
    }

    return (
        <div className="p-4 font-mono text-sm h-full overflow-y-auto">
            {!results.length && <p className="text-[var(--color-text-muted)]">Run your code to see the test results here.</p>}
            {results.map((result, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-[var(--color-border)] last:border-b-0">
                    <div className="flex items-center mb-2">
                        {result.pass ? (
                            <CheckIcon className="h-5 w-5 text-[var(--color-success)] mr-2 flex-shrink-0" />
                        ) : (
                            <XIcon className="h-5 w-5 text-[var(--color-danger)] mr-2 flex-shrink-0" />
                        )}
                        <h4 className={`font-bold ${result.pass ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                            Test Case #{index + 1} {testCases[index]?.hidden ? '(Hidden)' : ''} &mdash; {result.pass ? 'Passed' : 'Failed'}
                        </h4>
                    </div>
                    {!result.pass && (
                        <div>
                            <DiffViewer str1={result.actual} str2={result.expected} />
                        </div>
                    )}
                     {result.pass && testCases[index]?.hidden && <p className="text-[var(--color-text-muted)] italic text-xs mt-1">Output is hidden for this test case.</p>}
                </div>
            ))}
        </div>
    );
};

const AIHelper: React.FC<{
    lesson: Lesson,
    challenge: Challenge,
    code: string,
    results: TestResult[],
}> = ({ lesson, challenge, code, results }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [activeTab, setActiveTab] = useState<'hint' | 'explain' | 'clarify' | 'practice' | null>(null);

    const resetPanels = () => {
        setAiResponse('');
    }

    const runAiTask = async (task: () => Promise<string>) => {
        setIsLoading(true);
        try {
            const response = await task();
            setAiResponse(sanitizeTextForDisplay(response));
        } catch {
            setAiResponse('Sorry, something went wrong while contacting the AI helper. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetHint = async () => {
        resetPanels();
        setActiveTab('hint');
        const firstError = results.find(r => !r.pass);
        const errorDetails = firstError ? `Expected: "${firstError.expected}", but got: "${firstError.actual}"` : "The code runs but doesn't produce the correct final output.";
        await runAiTask(() => getHint(code, challenge.description, errorDetails));
    };

    const handleExplainCode = async () => {
        resetPanels();
        setActiveTab('explain');
        await runAiTask(() => explainCode(code));
    };

    const handleClarifyConcept = async () => {
        resetPanels();
        setActiveTab('clarify');
        // A simple extraction of the first paragraph of the concept
        const conceptSummary = lesson.tutorial?.coreConcept?.blocks?.find(b => b.type === 'paragraph')?.content || '';
        await runAiTask(() => clarifyConcept(lesson.title, conceptSummary));
    }
    
    const renderPanelContent = () => {
        if(isLoading) return <p className="p-4 text-[var(--color-text-muted)] animate-pulse">AI Assistant is thinking...</p>;
        // Render plain text only so untrusted model output cannot execute markup.
        if(aiResponse) return <div className="p-4 text-[var(--color-text-muted)] whitespace-pre-wrap leading-relaxed text-sm">{aiResponse}</div>;
        return null;
    }

    return (
        <div className="mt-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--color-border)] rounded-t-lg overflow-hidden">
                <button onClick={handleGetHint} disabled={isLoading} className={`flex items-center justify-center space-x-2 font-semibold py-2 px-3 transition text-sm ${activeTab === 'hint' ? 'bg-[var(--color-background)] text-[var(--color-primary)]' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}`}>
                    <LightbulbIcon className="h-5 w-5" /> <span>Get Hint</span>
                </button>
                <button onClick={handleExplainCode} disabled={isLoading} className={`flex items-center justify-center space-x-2 font-semibold py-2 px-3 transition text-sm ${activeTab === 'explain' ? 'bg-[var(--color-background)] text-[var(--color-primary)]' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}`}>
                    <SparklesIcon className="h-5 w-5" /> <span>Explain Code</span>
                </button>
                 <button onClick={handleClarifyConcept} disabled={isLoading} className={`flex items-center justify-center space-x-2 font-semibold py-2 px-3 transition text-sm ${activeTab === 'clarify' ? 'bg-[var(--color-background)] text-[var(--color-primary)]' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'}`}>
                    <AcademicCapIcon className="h-5 w-5" /> <span>Clarify Concept</span>
                </button>
            </div>
            {activeTab && (
                 <div className="bg-[var(--color-background)]/70 rounded-b-lg min-h-[6rem]">
                    {renderPanelContent()}
                 </div>
            )}
        </div>
    );
};

interface ChallengeViewProps {
    lesson: Lesson;
    challenge: Challenge;
    onBackToLesson: () => void;
    onNextChallenge: () => void;
    onPreviousChallenge: () => void;
    isFirstChallenge: boolean;
    isLastChallenge: boolean;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ lesson, challenge, onBackToLesson, onNextChallenge, onPreviousChallenge, isFirstChallenge, isLastChallenge }) => {
    const { completeChallenge, user } = useUser();
    const [code, setCode] = useState(challenge.starterCode);
    const [results, setResults] = useState<TestResult[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [challengeSuccess, setChallengeSuccess] = useState(false);
    const [draftRecovered, setDraftRecovered] = useState(false);
    const draftStorageKey = `python-quest-draft-${challenge.id}`;
    
    const isChallengeCompleted = user?.completedChallenges.includes(challenge.id) || false;
    
    useEffect(() => {
        const savedDraft = window.localStorage.getItem(draftStorageKey);
        if (savedDraft && savedDraft !== challenge.starterCode) {
            setCode(savedDraft);
            setDraftRecovered(true);
        } else {
            setCode(challenge.starterCode);
            setDraftRecovered(false);
        }
        setResults([]);
        setIsSubmitting(false);
        setChallengeSuccess(false);
    }, [challenge, draftStorageKey]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            window.localStorage.setItem(draftStorageKey, code);
        }, 350);

        return () => window.clearTimeout(timer);
    }, [code, draftStorageKey]);

    useEffect(() => {
        if (challengeSuccess) {
            const timer = setTimeout(() => {
                setChallengeSuccess(false);
            }, 4000); // Animation lasts 4 seconds
            return () => clearTimeout(timer);
        }
    }, [challengeSuccess]);

    const handleRunCode = useCallback(async () => {
        setIsSubmitting(true);
        const res = await executePython(code, challenge);
        setResults(res);
        setIsSubmitting(false);

        const allPassed = res.every(r => r.pass);
        if (allPassed && res.length > 0) {
            completeChallenge(challenge.id, challenge.xp, lesson.day);
            window.localStorage.removeItem(draftStorageKey);
            setChallengeSuccess(true);
            setDraftRecovered(false);
        }
    }, [code, challenge, completeChallenge, lesson.day, draftStorageKey]);

    const handleReset = () => {
        setCode(challenge.starterCode);
        setResults([]);
        window.localStorage.removeItem(draftStorageKey);
        setDraftRecovered(false);
    };
    
    const NavButton: React.FC<{ direction: 'prev' | 'next', onClick: () => void, disabled: boolean }> = ({ direction, onClick, disabled }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={direction === 'prev' ? "Previous Challenge" : "Next Challenge"}
            className={`fixed top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center justify-center w-12 h-12 bg-[var(--color-surface-translucent)] backdrop-blur-sm border border-[var(--color-border)] rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-[var(--color-border)] disabled:hover:text-[var(--color-text-muted)] shadow-lg
            ${direction === 'prev' ? 'left-4 xl:left-8' : 'right-4 xl:right-8'}`}
        >
            {direction === 'prev' ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
        </button>
    );

    const difficultyStyles = {
        Beginner: 'text-teal-300 bg-teal-500/10',
        Intermediate: 'text-sky-300 bg-sky-500/10',
        Advanced: 'text-rose-300 bg-rose-500/10',
    };

    return (
        <div className="relative">
            {challengeSuccess && <CelebrationAnimation />}
            <NavButton direction="prev" onClick={onPreviousChallenge} disabled={isFirstChallenge} />
            <NavButton direction="next" onClick={onNextChallenge} disabled={isLastChallenge} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Instructions and AI Helper */}
                <div className="flex flex-col gap-6">
                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                            <h2 className="text-2xl font-bold text-[var(--color-text-main)]">{challenge.title}</h2>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${difficultyStyles[challenge.difficulty]}`}>{challenge.difficulty}</span>
                                {!challenge.isOptional && <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 px-2 py-1 rounded-full">Core</span>}
                                <span className="text-xs font-bold bg-[var(--color-warning)] text-[var(--color-background)] px-2 py-1 rounded-full">{challenge.xp} XP</span>
                            </div>
                        </div>

                        {isChallengeCompleted && !challengeSuccess && (
                            <div className="my-3 p-3 bg-[var(--color-success-muted)] border border-[var(--color-success)]/50 rounded-lg text-[var(--color-success)] text-sm font-semibold flex items-center gap-2">
                               <CheckIcon className="h-5 w-5" /> Challenge Completed!
                            </div>
                        )}
                        {draftRecovered && (
                            <div className="my-3 p-3 bg-cyan-500/10 border border-cyan-500/50 rounded-lg text-cyan-200 text-sm font-semibold">
                                Draft recovered from local storage.
                            </div>
                        )}
                        
                        <p className="text-[var(--color-text-muted)] leading-relaxed">{challenge.description}</p>
                    </div>
                    
                    <AIHelper lesson={lesson} challenge={challenge} code={code} results={results} />
                </div>

                {/* Right Column: Editor and Terminal */}
                <div className="flex flex-col gap-4">
                     <div className="flex-grow flex flex-col gap-4" style={{minHeight: '500px'}}>
                        <div className="flex-1 flex flex-col">
                            <CodeEditor code={code} setCode={setCode} onRun={handleRunCode} />
                        </div>
                        <div className="flex-1 flex flex-col bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
                            <div className="p-3 border-b border-[var(--color-border)]">
                                <h4 className="font-semibold text-[var(--color-text-main)]">Test Results</h4>
                            </div>
                            <Terminal results={results} isSubmitting={isSubmitting} testCases={challenge.testCases} />
                        </div>
                    </div>

                    <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <button onClick={onBackToLesson} className="flex items-center justify-center gap-2 bg-transparent border border-[var(--color-border)] hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] font-bold py-3 px-6 rounded-lg transition">
                            <BookOpenIcon className="h-5 w-5" /> Back to Lesson
                        </button>
                        
                        {/* Mobile Navigation */}
                        <div className="flex items-center justify-center gap-4 lg:hidden">
                            <button
                                onClick={onPreviousChallenge}
                                disabled={isFirstChallenge}
                                className="p-3 bg-[var(--color-border)] hover:bg-[#415A77]/70 text-[var(--color-text-main)] rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Previous Challenge"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={onNextChallenge}
                                disabled={isLastChallenge}
                                className="p-3 bg-[var(--color-border)] hover:bg-[#415A77]/70 text-[var(--color-text-main)] rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Next Challenge"
                            >
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        </div>

                         <div className="flex gap-4">
                             <button onClick={handleReset} className="bg-[var(--color-border)] hover:bg-[#415A77]/70 text-[var(--color-text-main)] font-bold py-3 px-6 rounded-lg transition">
                                Reset
                            </button>
                            <button onClick={handleRunCode} disabled={isSubmitting} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-6 rounded-lg transition disabled:bg-[var(--color-text-muted)]/50 disabled:cursor-not-allowed flex-grow justify-center">
                                {isSubmitting ? 'Running...' : (isChallengeCompleted ? 'Run Again' : 'Run & Submit')}
                            </button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChallengeView;