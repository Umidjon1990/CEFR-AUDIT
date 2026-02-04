import { create } from 'zustand';
import { UserResponses } from './types';

interface AuditStore {
    responses: UserResponses;
    setResponse: (id: string, value: any) => void;

    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
    jumpToStep: (step: number) => void;

    isFinished: boolean;
    finish: () => void;

    reset: () => void;
}

export const useAuditStore = create<AuditStore>((set) => ({
    responses: {},
    setResponse: (id, value) => set((state) => ({
        responses: { ...state.responses, [id]: value }
    })),

    currentStep: 0,
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
    jumpToStep: (step) => set({ currentStep: step }),

    isFinished: false,
    finish: () => set({ isFinished: true }),

    reset: () => set({ responses: {}, currentStep: 0, isFinished: false }),
}));
