"use client";

import { useAuditStore } from "@/lib/store";
import { QUESTIONS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSounds } from "@/lib/useAppSounds";

export default function SurveyFlow() {
    const { currentStep, responses, setResponse, nextStep, isFinished, finish } = useAuditStore();
    const router = useRouter();
    const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

    // Sounds
    const { playClick, playTick, playSuccess, startBgMusic } = useAppSounds();

    // Start background music when survey begins
    useEffect(() => {
        startBgMusic();
    }, [startBgMusic]);

    const question = QUESTIONS[currentStep];
    const totalSteps = QUESTIONS.length;

    if (!question && !isFinished && totalSteps > 0 && currentStep >= totalSteps) {
        finish();
    }

    useEffect(() => {
        if (isFinished) {
            playSuccess();
            router.push("/report");
        }
    }, [isFinished, router, playSuccess]);

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            nextStep();
        } else {
            finish();
        }
    };

    const handleOptionSelect = (val: string | number) => {
        if (isAutoAdvancing) return;

        playTick(); // Tick sound on selection
        setResponse(question.id, val);

        // Auto advance for single choice
        if (question.type === 'choice' || question.type === 'scale') {
            setIsAutoAdvancing(true);
            setTimeout(() => {
                nextStep(); // Just advance, no extra sound
                setIsAutoAdvancing(false);
            }, 350);
        }
    };

    if (!question) return null;

    return (
        <div className="w-full max-w-2xl mx-auto p-6 md:p-0 min-h-[60vh] flex flex-col justify-center">
            {/* Progress Component */}
            <div className="mb-8 md:mb-12">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    <span>Savol {currentStep + 1}</span>
                    <span>{totalSteps} ta</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                        transition={{ ease: "circOut", duration: 0.5 }}
                        className="h-full bg-indigo-600 rounded-full"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-6 md:space-y-8"
                >
                    {/* Question Text */}
                    <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                        {question.text}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3 pt-2">
                        {question.options?.map((option, idx) => (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={option.value}
                                onClick={() => handleOptionSelect(option.value)}
                                disabled={isAutoAdvancing}
                                className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group relative overflow-hidden active:scale-[0.98] tap-highlight-transparent
                  ${responses[question.id] === option.value
                                        ? "border-indigo-600 bg-indigo-50/80 shadow-lg shadow-indigo-100 ring-1 ring-indigo-600"
                                        : "border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50/80 hover:shadow-md"
                                    }`}
                            >
                                <span className={`text-base md:text-lg font-medium relative z-10 ${responses[question.id] === option.value ? "text-indigo-900" : "text-slate-700"}`}>
                                    {option.label}
                                </span>

                                {responses[question.id] === option.value && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center z-10 shrink-0 ml-2"
                                    >
                                        <Check className="w-4 h-4 text-white" />
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-12 flex justify-end">
                <Button
                    onClick={handleNext}
                    disabled={!responses[question.id] || isAutoAdvancing}
                    size="lg"
                    className="rounded-full h-12 md:h-14 px-6 md:px-8 text-base md:text-lg bg-slate-900 hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-xl w-full md:w-auto"
                >
                    Davom etish
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
