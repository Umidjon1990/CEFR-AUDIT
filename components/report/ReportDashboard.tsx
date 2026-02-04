"use client";

import { useAuditStore } from "@/lib/store";
import { calculateResult } from "@/lib/scoring";
import { useEffect, useState, useRef } from "react";
import { AuditResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Download, RotateCcw } from "lucide-react"; // Only keep utility icons
import { motion } from "framer-motion";
import Image from "next/image"; // For 3D icons

const SKILL_NAMES: Record<string, string> = {
    speaking: 'Gapirish',
    listening: 'Tinglab tushunish',
    writing: 'Yozish',
    vocabulary: 'So\'z boyligi',
    grammar: 'Grammatika'
};

export default function ReportDashboard() {
    const { responses, reset } = useAuditStore();
    const [result, setResult] = useState<AuditResult | null>(null);
    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const res = calculateResult(responses);
        setResult(res);
    }, [responses]);

    const handlePrint = () => {
        window.print();
    };

    const handleReset = () => {
        reset();
        window.location.href = '/';
    };

    if (!result) return (
        <div className="flex h-screen items-center justify-center">
            <div className="animate-pulse text-lg text-slate-500">Hisoblanmoqda...</div>
        </div>
    );

    const getScoreColor = (score: number, inverse = false) => {
        if (inverse) {
            if (score > 60) return 'text-red-600';
            if (score > 30) return 'text-yellow-600';
            return 'text-green-600';
        }
        if (score > 70) return 'text-green-600';
        if (score > 40) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getBarColor = (score: number, inverse = false) => {
        if (inverse) {
            if (score > 60) return 'bg-red-500';
            if (score > 30) return 'bg-yellow-500';
            return 'bg-green-500';
        }
        if (score > 70) return 'bg-green-500';
        if (score > 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div ref={reportRef} className="max-w-4xl mx-auto p-6 space-y-10 pb-20 print:p-4 print:max-w-none">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 print:space-y-1"
            >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-200">
                    <span>🎯 Maqsad: {result.level}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 print:text-2xl tracking-tight">
                    Audit Natijasi
                </h1>
                <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
                    Sizning til o'rganish jarayoningizning to'liq 360° tahlili
                </p>
            </motion.div>

            {/* Main Metrics Grid with 3D Icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-3">

                {/* Consistency Score */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                    <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden h-full relative group hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Image src="/icons/rocket-dynamic-color.png" alt="consistency" width={120} height={120} className="object-contain" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <span className="bg-blue-100 p-1.5 rounded-lg">🚀</span> Muntazamlik
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-3">
                                <span className={`text-6xl font-black ${getScoreColor(result.consistency)}`}>{result.consistency}</span>
                                <span className="text-xl text-slate-400 mb-2 font-medium">/ 100</span>
                            </div>
                            <div className="h-4 bg-slate-100 rounded-full mt-5 overflow-hidden ring-1 ring-slate-100">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.consistency}%` }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                    className={`h-full rounded-full shadow-sm ${getBarColor(result.consistency)}`}
                                />
                            </div>
                            <p className="text-sm font-medium text-slate-600 mt-4 leading-relaxed">
                                {result.consistency >= 70 ? "🚀 Ajoyib! Sizning o'qish tizimingiz juda barqaror." :
                                    result.consistency >= 40 ? "⚖️ Yomon emas, lekin barqarorlik yetishmayapti." :
                                        "⚠️ Diqqat! O'qishda uzilishlar juda ko'p."}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Psychology Risk */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                    <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden h-full relative group hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Image src="/icons/target-dynamic-color.png" alt="psychology" width={120} height={120} className="object-contain" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <span className="bg-red-100 p-1.5 rounded-lg">🧠</span> Psixologik Xavf
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-3">
                                <span className={`text-6xl font-black ${getScoreColor(result.psychologyRisk, true)}`}>{result.psychologyRisk}</span>
                                <span className="text-xl text-slate-400 mb-2 font-medium">/ 100</span>
                            </div>
                            <div className="h-4 bg-slate-100 rounded-full mt-5 overflow-hidden ring-1 ring-slate-100">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.psychologyRisk}%` }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                    className={`h-full rounded-full shadow-sm ${getBarColor(result.psychologyRisk, true)}`}
                                />
                            </div>
                            <p className="text-sm font-medium text-slate-600 mt-4 leading-relaxed">
                                {result.psychologyRisk <= 30 ? "✅ Holatingiz a'lo! O'zingizga ishonch yuqori." :
                                    result.psychologyRisk <= 60 ? "⚠️ O'rtacha xavf. Stress va chalg'ish bor." :
                                        "⛔️ Kritik! Qo'rquv sizni to'xtatib turibdi."}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Personal Plan (Reordered for emphasis) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-300"
            >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-indigo-900 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-8 flex items-center">
                        <span className="text-3xl mr-3">💎</span>
                        Siz uchun Shaxsiy Reja
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-colors">
                            <div className="text-indigo-200 text-sm font-medium mb-1 flex items-center gap-2"><ClockIcon /> Vaqt</div>
                            <div className="text-3xl font-bold">{result.recommendations.dailyTime}</div>
                            <div className="text-xs text-indigo-200 mt-2">Kunlik tavsiya</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-colors">
                            <div className="text-indigo-200 text-sm font-medium mb-1 flex items-center gap-2"><BookIcon /> So'zlar</div>
                            <div className="text-3xl font-bold">{result.recommendations.dailyWords} ta</div>
                            <div className="text-xs text-indigo-200 mt-2">Yangi so'z (Active)</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-colors">
                            <div className="text-indigo-200 text-sm font-medium mb-1 flex items-center gap-2"><CalendarIcon /> Muddat</div>
                            <div className="text-3xl font-bold text-emerald-300">{result.recommendations.timeline}</div>
                            <div className="text-xs text-indigo-200 mt-2">Taxminiy natija</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Detailed Advice Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-white border-0 shadow-lg rounded-2xl p-6 md:p-8"
            >
                <div className="flex items-center gap-4 mb-6">
                    <Image src="/icons/notebook-dynamic-color.png" alt="advice" width={60} height={60} className="object-contain" />
                    <h2 className="text-2xl font-bold text-slate-900">
                        Maxsus tavsiyalar
                    </h2>
                </div>

                <div className="space-y-4">
                    {result.recommendations.actionPlan.map((action, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                            <div className="bg-indigo-600 text-white h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold shadow-md shadow-indigo-200">{idx + 1}</div>
                            <p className="text-slate-700 font-medium leading-relaxed">{action}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Top Blockers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h2 className="text-lg font-bold text-slate-700 mb-4 px-2">
                    🚫 Asosiy to'siqlar
                </h2>
                <div className="space-y-3">
                    {result.topBlockers.map((blocker, idx) => (
                        <div
                            key={blocker.id}
                            className={`border-l-4 rounded-r-xl p-4 flex items-center bg-white shadow-sm ${blocker.impact === 'high' ? 'border-l-red-500' :
                                blocker.impact === 'medium' ? 'border-l-yellow-500' :
                                    'border-l-green-500'
                                }`}
                        >
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800">{blocker.description}</h3>
                                <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">
                                    {blocker.impact === 'high' ? 'Yuqori (Kritik)' : blocker.impact === 'medium' ? 'O\'rtacha' : 'Past'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-8 print:hidden"
            >
                <Button
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                    className="gap-2 h-14 px-8 rounded-full text-lg border-2"
                >
                    <RotateCcw className="h-5 w-5" />
                    Qayta topshirish
                </Button>
                <Button
                    size="lg"
                    onClick={handlePrint}
                    className="gap-2 h-14 px-10 rounded-full text-lg bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200"
                >
                    <Download className="h-5 w-5" />
                    PDF yuklab olish
                </Button>
            </motion.div>

            {/* Print Footer */}
            <div className="hidden print:block text-center text-sm text-slate-400 pt-8 border-t">
                CEFR Audit Report • {new Date().toLocaleDateString('uz-UZ')}
            </div>
        </div>
    );
}

// Mini components for icons
function ClockIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> }
function BookIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg> }
function CalendarIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> }
