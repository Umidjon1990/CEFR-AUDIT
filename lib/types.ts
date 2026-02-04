export type BlockType = 'A' | 'B' | 'C' | 'D';
export type QuestionType = 'scale' | 'choice' | 'text' | 'multi-choice';

export interface QuestionOption {
    value: string | number;
    label: string;
}

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: QuestionOption[];
    block: BlockType;
    required?: boolean;
}

export interface UserResponses {
    [questionId: string]: string | number | string[];
}

export interface AuditResult {
    consistency: number;
    psychologyRisk: number;
    skillUsage: {
        speaking: number;
        listening: number;
        writing: number;
        vocabulary: number;
        grammar: number;
    };
    timeCapacity: number;
    topBlockers: {
        id: string;
        description: string;
        impact: 'high' | 'medium' | 'low';
    }[];
    level?: 'A2' | 'B1' | 'B2';
    recommendations: {
        dailyTime: string;
        dailyWords: number;
        timeline: string;
        focusSkill?: string;
    };
}
