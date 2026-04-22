
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Challenge, GroundedPracticeProblem } from "../types";
import { sanitizeTextForDisplay } from "../utils/security";

// Keep API key out of hardcoded build defines.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

if (!API_KEY) {
    console.warn("VITE_GEMINI_API_KEY is not set. AI helper features are disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const withAiClient = <T,>(task: (client: GoogleGenAI) => Promise<T>): Promise<T> => {
    if (!ai) {
        return Promise.reject(new Error("AI service unavailable: missing API key."));
    }
    return task(ai);
};

const clampPromptInput = (value: string, maxLength = 3000): string => sanitizeTextForDisplay(value, maxLength);

export const getHint = async (code: string, problemDescription: string, error: string): Promise<string> => {
    try {
        const prompt = `
        I'm a beginner learning Python and I'm stuck on a challenge.
        The goal is: "${clampPromptInput(problemDescription)}"

        Here is my current code:
        \`\`\`python
        ${clampPromptInput(code)}
        \`\`\`

        This is the result I'm getting, which is incorrect:
        "${clampPromptInput(error)}"

        Please provide a single, short, and encouraging hint to help me find the solution myself. Don't give me the answer directly.
        `;

        const response: GenerateContentResponse = await withAiClient((client) => client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a friendly Python tutor for absolute beginners. Your goal is to guide them to the solution without giving it away.",
                temperature: 0.5,
            }
        }));
        
        return sanitizeTextForDisplay(response.text);
    } catch (error) {
        console.error("Error getting hint from Gemini:", error);
        return "Sorry, I couldn't fetch a hint right now. Please check your API key and network connection.";
    }
};

export const explainCode = async (code: string): Promise<string> => {
    try {
        const prompt = `
I need a very concise and beginner-friendly explanation for the following Python code. The goal is to help a new learner quickly understand what each line does.

**Code:**
\`\`\`python
${clampPromptInput(code)}
\`\`\`

**Instructions:**
1.  **Summary:** Start with a one-sentence summary.
2.  **Line-by-Line:** Add a heading: "Line-by-Line Insights".
3.  **Explanations:** For each line of code, provide a direct, 1-2 sentence explanation.
4.  **Format:** Structure each line like this: greeting = "Hello": This line creates a variable named greeting and stores a message string.
5.  **Tone:** Be clear and direct. Avoid long stories, metaphors, or complex analogies. The goal is fast, easy-to-scan comprehension.
6.  **Output:** Return plain text only.
        `;

        const response: GenerateContentResponse = await withAiClient((client) => client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                 systemInstruction: "You are an expert Python tutor who provides concise, plain-text explanations for beginners.",
            }
        }));
        return sanitizeTextForDisplay(response.text);
    } catch (error) {
        console.error("Error getting explanation from Gemini:", error);
        return "Sorry, I couldn't generate an explanation. Please check your API key and network connection.";
    }
};

export const clarifyConcept = async (topic: string, concept: string): Promise<string> => {
    try {
        const prompt = `
I need a new, very simple explanation for the Python concept: "${topic}".
The existing explanation is provided for context only: "${concept}".

Please generate a completely new explanation following the rules in the system instruction. Do not use the old explanation as a template; create a fresh one based on the topic and the rules.
        `;
    const response: GenerateContentResponse = await withAiClient((client) => client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: `You are an expert Python tutor who explains concepts to absolute beginners. Your goal is to provide simple, conceptually sound explanations that are easy to understand at a glance.

Follow these rules precisely for your response:
1.  **Format & Length:** The explanation must be a single paragraph of 4-6 sentences.
2.  **Structure:** Start with a very brief, one-sentence real-world analogy. Immediately follow it with a clear, plain-English explanation of **what** the concept is and **why** it's useful in programming.
3.  **Content Focus:** Explain the core idea conceptually. Do NOT explain specific syntax or how to write the code. Focus on the high-level 'what' and 'why'. For example, when explaining variables, talk about them as labeled boxes for storing information, not about the \`variable_name = value\` syntax.
4.  **Tone:** Friendly, direct, and encouraging.
5.  **Output:** Return plain text only.`,
                temperature: 0.7,
            }
        }));
        return sanitizeTextForDisplay(response.text);
    } catch (error) {
        console.error("Error clarifying concept from Gemini:", error);
        return "Sorry, I couldn't get a clarification right now. Please check your network connection.";
    }
};


export const generateWebPracticeProblem = async (topic: string): Promise<GroundedPracticeProblem | null> => {
    try {
        const prompt = `Find a beginner-friendly Python practice problem about "${topic}" from the web, for example from the '30-Days-Of-Python' GitHub repository or other educational sites. Present the problem clearly as a small challenge.`;

                const response: GenerateContentResponse = await withAiClient((client) => client.models.generateContent({
           model: "gemini-2.5-flash",
           contents: prompt,
           config: {
             tools: [{googleSearch: {}}],
             systemInstruction: "You find and present Python practice problems for beginners based on web search results."
           },
                }));

        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];

        return {
            problemText: sanitizeTextForDisplay(response.text, 12000),
            sources: sources.filter(s => s.web?.uri)
        };
    } catch (error) {
        console.error("Error generating web practice problem from Gemini:", error);
        return null;
    }
};


export const getCheckpointFeedback = async (question: string, userAnswer: string, expectedPattern: string): Promise<string> => {
    try {
        const prompt = `
        A beginner Python learner was asked the following question:
        "${question}"

        They provided this answer:
        \`\`\`python
        ${userAnswer}
        \`\`\`

        The expected answer should follow this pattern or idea: "${expectedPattern}".

        Please evaluate their answer. 
        1. If it's correct, congratulate them and briefly explain why it's a good answer.
        2. If it's incorrect, gently point out the mistake and give a small hint towards the correct answer without giving it away.
        
        Keep the tone very friendly, encouraging, and concise.
        `;

        const response: GenerateContentResponse = await withAiClient((client) => client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a friendly and encouraging AI tutor for Python beginners.",
                temperature: 0.4,
            }
        }));
        
        return sanitizeTextForDisplay(response.text);

    } catch (error) {
        console.error("Error getting checkpoint feedback from Gemini:", error);
        return "Sorry, I couldn't process your answer right now. Please try again.";
    }
}


export const generatePracticeProblem = async (topic: string): Promise<Challenge | null> => {
    try {
        const prompt = `Generate a new, simple Python practice problem for a beginner focused on the topic of "${topic}". The problem should be distinct from common examples like 'Hello World' or simple addition.`;
        
        const response: GenerateContentResponse = await withAiClient((client) => client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a Python instructor who creates practice problems. You always respond in the exact JSON format requested.",
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        starterCode: { type: Type.STRING },
                        isOptional: { type: Type.BOOLEAN },
                        xp: { type: Type.INTEGER },
                        testCases: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    input: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    expected: { type: Type.STRING },
                                    hidden: { type: Type.BOOLEAN }
                                },
                                required: ["input", "expected", "hidden"]
                            }
                        }
                    },
                    required: ["title", "description", "starterCode", "testCases", "isOptional", "xp"]
                }
            }
        }));

        const jsonText = response.text;
        const parsed = JSON.parse(jsonText);
        
        return { ...parsed, id: `ai-generated-${Date.now()}` };

    } catch (error) {
        console.error("Error generating practice problem from Gemini:", error);
        return null;
    }
};
