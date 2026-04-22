import React from 'react';
import type { Lesson, Challenge, TutorialSection, ContentBlock } from '../types';
import { useUser } from '../hooks/useUser';
import { lessons } from '../data/lessons';
import { 
    CoreConceptIcon, SyntaxIcon, ExampleIcon, MistakeIcon,
    CheckIcon, SparklesIcon, PythonIcon, ChevronRightIcon
} from './icons/Icons';

// --- Helper Components ---

const TUTORIAL_ICONS = {
    CoreConceptIcon: (props: React.SVGProps<SVGSVGElement>) => <CoreConceptIcon {...props} />,
    SyntaxIcon: (props: React.SVGProps<SVGSVGElement>) => <SyntaxIcon {...props} />,
    ExampleIcon: (props: React.SVGProps<SVGSVGElement>) => <ExampleIcon {...props} />,
    MistakeIcon: (props: React.SVGProps<SVGSVGElement>) => <MistakeIcon {...props} />,
};

const SimpleSyntaxHighlighter: React.FC<{ code: string }> = ({ code }) => {
    const pythonKeywords = new Set([
        'print', 'if', 'else', 'elif', 'def', 'for', 'in', 'while', 'return',
        'True', 'False', 'None', 'class', '__init__', 'import', 'from', 'as'
    ]);

    const renderToken = (token: string, index: number): React.ReactNode => {
        if (/^\s+$/.test(token)) return <span key={index}>{token}</span>;
        if (/^#/.test(token)) return <span key={index} className="text-[var(--color-text-muted)]">{token}</span>;
        if (/^(["']).*\1$/.test(token)) return <span key={index} className="text-[var(--color-warning)]">{token}</span>;
        if (/^\d+(\.\d+)?$/.test(token)) return <span key={index} className="text-[var(--color-secondary)]">{token}</span>;
        if (token === 'self') return <span key={index} className="text-purple-400">{token}</span>;
        if (pythonKeywords.has(token)) return <span key={index} className="text-[var(--color-primary)]">{token}</span>;
        return <span key={index}>{token}</span>;
    };

    const lines = code.split('\n');

    return (
        <pre className="font-mono text-sm bg-[#0B1726] p-4 rounded-lg border border-[var(--color-border)] overflow-x-auto">
            <code>
                {lines.map((line, lineIndex) => {
                    const tokens = line.match(/#.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b|\s+|./g) || [];
                    return (
                        <React.Fragment key={`${lineIndex}-${line}`}>
                            {tokens.map((token, tokenIndex) => renderToken(token, tokenIndex))}
                            {lineIndex < lines.length - 1 && '\n'}
                        </React.Fragment>
                    );
                })}
            </code>
        </pre>
    );
};


const ContentBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
    switch (block.type) {
        case 'paragraph':
            return <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">{block.content}</p>;
        case 'code':
            return <div className="my-4"><SimpleSyntaxHighlighter code={block.content} /></div>;
        case 'note':
            return <div className="my-4 p-4 bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)] rounded-r-lg text-[var(--color-text-muted)] text-sm">{block.content}</div>;
        case 'warning':
            return <div className="my-4 p-4 bg-[var(--color-warning)]/10 border-l-4 border-[var(--color-warning)] rounded-r-lg text-[var(--color-text-muted)] text-sm">{block.content}</div>;
        case 'checkpoint':
             // NOTE: Interactive checkpoint UI and logic would be implemented here.
             // This is a placeholder to show where it would go.
            return (
                 <div className="my-6 p-4 bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <SparklesIcon className="h-6 w-6 text-[var(--color-primary)]"/>
                        <h4 className="font-bold text-lg text-[var(--color-text-main)]">Knowledge Check</h4>
                    </div>
                    <p className="text-[var(--color-text-muted)] mb-3">{block.question}</p>
                    <div className="text-sm text-[var(--color-text-muted)] italic">(Interactive checkpoint feature coming soon!)</div>
                </div>
            )
        default:
            return null;
    }
};

const TutorialSectionRenderer: React.FC<{ section: TutorialSection }> = ({ section }) => {
    const Icon = TUTORIAL_ICONS[section.icon];
    return (
        <section id={section.title.replace(/\s+/g, '-')} className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
                <Icon className="h-8 w-8 text-[var(--color-primary)]" />
                <h3 className="text-2xl font-bold text-[var(--color-text-main)]">{section.title}</h3>
            </div>
            {section.blocks.map((block, index) => <ContentBlockRenderer key={index} block={block} />)}
        </section>
    );
};

const ChallengeGroup: React.FC<{
    title: 'Beginner' | 'Intermediate' | 'Advanced',
    challenges: Challenge[],
    completedChallenges: string[],
    onSelectChallenge: (challenge: Challenge) => void,
}> = ({ title, challenges, completedChallenges, onSelectChallenge }) => {
    if (challenges.length === 0) return null;

    const difficultyStyles = {
        Beginner: {
            text: 'text-teal-300',
            border: 'border-teal-500/30'
        },
        Intermediate: {
            text: 'text-sky-300',
            border: 'border-sky-500/30'
        },
        Advanced: {
            text: 'text-rose-300',
            border: 'border-rose-500/30'
        },
    };
    const styles = difficultyStyles[title];

    return (
        <div className="mb-10">
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${styles.text}`}>{title} Challenges</h3>
            <div className={`space-y-4 border-l-2 ${styles.border} pl-6`}>
                {challenges.map(challenge => {
                    const isCompleted = completedChallenges.includes(challenge.id);
                    return (
                        <div key={challenge.id} onClick={() => onSelectChallenge(challenge)}
                             className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all hover:bg-[var(--color-surface)]/70 hover:border-[var(--color-primary)]/50 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 ${isCompleted ? 'opacity-70 filter saturate-50' : ''}`}>
                            <div className="flex-grow">
                                <h4 className="font-semibold text-[var(--color-text-main)]">{challenge.title}</h4>
                                <div className="flex items-center gap-3 mt-2 flex-wrap">
                                    {!challenge.isOptional && <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-1 rounded-full">Core</span>}
                                    <span className="text-sm font-semibold text-[var(--color-warning)]">{challenge.xp} XP</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                {isCompleted ? (
                                    <div className="flex items-center gap-2 text-sm text-[var(--color-success)] font-semibold">
                                        <CheckIcon className="h-5 w-5" />
                                        <span>Done</span>
                                    </div>
                                ) : (
                                    <ChevronRightIcon className="h-6 w-6 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// --- Main Component ---

interface LessonViewProps {
    lesson: Lesson;
    onSelectChallenge: (challenge: Challenge) => void;
    onCompleteAndContinue: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onSelectChallenge, onCompleteAndContinue }) => {
    const { user } = useUser();
    const completedChallenges = user?.completedChallenges || [];

    const coreChallenges = lesson.challenges.filter(c => !c.isOptional);
    const beginnerChallenges = lesson.challenges.filter(c => c.difficulty === 'Beginner');
    const intermediateChallenges = lesson.challenges.filter(c => c.difficulty === 'Intermediate');
    const advancedChallenges = lesson.challenges.filter(c => c.difficulty === 'Advanced');

    const allCoreCompleted = coreChallenges.length > 0 && coreChallenges.every(c => completedChallenges.includes(c.id));
    
    const currentIndex = lessons.findIndex(l => l.day === lesson.day);
    const nextLesson = lessons[currentIndex + 1];

    const tutorialSections = [
        lesson.tutorial.coreConcept,
        lesson.tutorial.syntax,
        lesson.tutorial.realWorldExample,
        lesson.tutorial.commonMistakes,
    ].filter((section): section is TutorialSection => !!section);

    const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            const targetId = href.substring(1); // remove the '#'
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                window.history.pushState(null, '', href);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Table of Contents - Sticky */}
            <aside className="md:col-span-3">
                <div className="sticky top-24">
                     <h3 className="text-sm font-semibold uppercase text-[var(--color-text-muted)] tracking-wider mb-3">On this page</h3>
                    <ul className="space-y-2">
                        {tutorialSections.map(section => {
                             const Icon = TUTORIAL_ICONS[section.icon];
                             return (
                                 <li key={section.title}>
                                    <a href={`#${section.title.replace(/\s+/g, '-')}`} onClick={handleTocClick} className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                                       <Icon className="h-4 w-4" />
                                       <span>{section.title}</span>
                                    </a>
                                </li>
                             );
                        })}
                         <li>
                             <a href="#challenges" onClick={handleTocClick} className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                                <PythonIcon className="h-4 w-4" />
                                <span>Challenges</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-9">
                <header className="mb-12">
                    <p className="text-lg font-semibold text-[var(--color-primary)]">Day {lesson.day} &bull; {lesson.skill}</p>
                    <h1 className="text-5xl font-extrabold text-[var(--color-text-main)] mt-1">{lesson.title}</h1>
                </header>

                <div className="prose prose-invert max-w-none">
                    {tutorialSections.map(section => <TutorialSectionRenderer key={section.title} section={section} />)}
                </div>
                
                <section id="challenges" className="mt-16 pt-8 border-t border-[var(--color-border)] scroll-mt-24">
                     <ChallengeGroup
                        title="Beginner"
                        challenges={beginnerChallenges}
                        completedChallenges={completedChallenges}
                        onSelectChallenge={onSelectChallenge}
                    />
                    <ChallengeGroup
                        title="Intermediate"
                        challenges={intermediateChallenges}
                        completedChallenges={completedChallenges}
                        onSelectChallenge={onSelectChallenge}
                    />
                    <ChallengeGroup
                        title="Advanced"
                        challenges={advancedChallenges}
                        completedChallenges={completedChallenges}
                        onSelectChallenge={onSelectChallenge}
                    />
                </section>

                {allCoreCompleted && (
                    <div className="mt-12 text-center p-8 bg-[var(--color-surface)] border border-dashed border-[var(--color-primary)] rounded-xl flex flex-col items-center animate-fade-in-up">
                        <div className="w-16 h-16 rounded-full bg-[var(--color-success)] flex items-center justify-center mb-4 border-4 border-white/20 shadow-lg">
                            <CheckIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--color-text-main)]">Lesson Complete!</h3>
                        <p className="text-[var(--color-text-muted)] mb-6">Great job! You've mastered the concepts for Day {lesson.day}.</p>
                        <button
                            onClick={onCompleteAndContinue}
                            className="inline-flex items-center justify-center gap-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] focus:ring-[var(--color-primary)] shadow-lg hover:shadow-[var(--color-primary)]/40"
                        >
                            <span>{nextLesson ? `Continue to Day ${nextLesson.day}` : 'Finish Quest & Return to Dashboard'}</span>
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonView;