
export interface User {
    username: string; // Will store the user's full name
    email: string;
    password?: string; // Legacy-only fallback for old local data.
    passwordHash?: string;
    passwordSalt?: string;
    completedChallenges: string[]; 
    streak: number;
    createdAt: string;
    xp: number;
    badges: string[];
    unlockedEarly: number[];
}

export interface TestCase {
    input: any[];
    expected: string;
    hidden: boolean;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    starterCode: string;
    testCases: TestCase[];
    isOptional: boolean;
    xp: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

// New types for structured tutorial content
export interface ContentBlock {
    type: 'paragraph' | 'code' | 'note' | 'warning' | 'checkpoint';
    content: string;
    language?: 'python';
    // for 'checkpoint' type
    question?: string;
    expectedPattern?: string;
}

export interface TutorialSection {
    title: string;
    icon: 'CoreConceptIcon' | 'SyntaxIcon' | 'ExampleIcon' | 'MistakeIcon';
    blocks: ContentBlock[];
}

// Updated Lesson type
export interface Lesson {
    day: number;
    title: string;
    skill: string;
    tutorial: {
        coreConcept: TutorialSection;
        syntax: TutorialSection;
        realWorldExample: TutorialSection;
        commonMistakes: TutorialSection;
    };
    challenges: Challenge[];
}


export interface TestResult {
    pass: boolean;
    actual: string;
    expected: string;
    input: any[];
}

export interface GroundedPracticeProblem {
    problemText: string;
    sources: Array<{ web?: { uri?: string; title?: string } }>;
}