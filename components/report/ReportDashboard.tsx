"use client";

import { useAuditStore } from "@/lib/store";
import { calculateResult } from "@/lib/scoring";
import { useEffect, useState, useRef } from "react";
import { AuditResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock, Award, Target, TrendingUp, Download, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const SKILL_NAMES: Record<string, string> = {
    speaking: 'Speaking',
    listening: 'Listening',
    writing: 'Writing',
    vocabulary: 'Vocabulary',
    grammar: 'Grammar'
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
        <div ref={reportRef} className="max-w-4xl mx-auto p-6 space-y-8 pb-20 print:p-4 print:max-w-none">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3 print:space-y-1"
            >
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Target className="h-4 w-4" />
                    Maqsad: {result.level}
                </div>
                <h1 className="text-4xl font-bold text-slate-900 print:text-2xl">CEFR Audit Natijasi</h1>
                <p className="text-slate-500">Sizning shaxsiy diagnostika hisobotingiz</p>
            </motion.div>

            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-3">

                {/* Consistency Score */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                    <Card className="border-l-4 border-l-blue-500 overflow-hidden h-full">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Muntazamlik Indeksi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-2">
                                <span className={`text-5xl font-bold ${getScoreColor(result.consistency)}`}>{result.consistency}</span>
                                <span className="text-lg text-slate-400 mb-2">/ 100</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full mt-4 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.consistency}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`h-full rounded-full ${getBarColor(result.consistency)}`}
                                />
                            </div>
                            <p className="text-sm text-slate-500 mt-3">
                                {result.consistency >= 70 ? "Ajoyib! O'qish tizimingiz barqaror." :
                                    result.consistency >= 40 ? "O'rtacha. Muntazamlikni oshirish kerak." :
                                        "Past. Bu eng katta muammo!"}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Psychology Risk */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                    <Card className={`border-l-4 overflow-hidden h-full ${result.psychologyRisk > 50 ? 'border-l-red-500' : 'border-l-green-500'}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Psixologik Xavf
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-2">
                                <span className={`text-5xl font-bold ${getScoreColor(result.psychologyRisk, true)}`}>{result.psychologyRisk}</span>
                                <span className="text-lg text-slate-400 mb-2">/ 100</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full mt-4 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.psychologyRisk}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`h-full rounded-full ${getBarColor(result.psychologyRisk, true)}`}
                                />
                            </div>
                            <p className="text-sm text-slate-500 mt-3">
                                {result.psychologyRisk <= 30 ? "Zo'r! Psixologik holatiz yaxshi." :
                                    result.psychologyRisk <= 60 ? "O'rtacha. Stress bilan ishlash kerak." :
                                        "Yuqori! Qo'rquv va chalg'ish bilan kurashish kerak."}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Skill Distribution */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-indigo-600" />
                            Skill Taqsimoti
                            {result.recommendations.focusSkill && (
                                <span className="ml-auto text-sm font-normal text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                    Fokus: {SKILL_NAMES[result.recommendations.focusSkill]}
                                </span>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(result.skillUsage).map(([skill, score]) => (
                            <div key={skill} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className={`font-medium ${result.recommendations.focusSkill === skill ? 'text-amber-700' : 'text-slate-700'}`}>
                                        {SKILL_NAMES[skill]}
                                    </span>
                                    <span className={getScoreColor(score)}>{score}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${score}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        className={`h-full rounded-full ${result.recommendations.focusSkill === skill ? 'bg-amber-500' : getBarColor(score)}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Top Blockers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                    <AlertTriangle className="mr-2 text-amber-500" />
                    Sizni to'xtatib turgan to'siqlar
                </h2>
                <div className="space-y-3">
                    {result.topBlockers.map((blocker, idx) => (
                        <motion.div
                            key={blocker.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className={`bg-white border-2 rounded-xl p-4 flex items-start shadow-sm ${blocker.impact === 'high' ? 'border-red-200 bg-red-50/50' :
                                    blocker.impact === 'medium' ? 'border-yellow-200 bg-yellow-50/50' :
                                        'border-green-200 bg-green-50/50'
                                }`}
                        >
                            <div className={`mt-0.5 h-6 w-6 rounded-full flex items-center justify-center mr-3 shrink-0 text-white font-bold text-sm ${blocker.impact === 'high' ? 'bg-red-500' :
                                    blocker.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}>
                                {idx + 1}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">{blocker.description}</h3>
                                <p className="text-sm text-slate-500">
                                    Ta'siri: {blocker.impact === 'high' ? 'Yuqori (Kritik)' : blocker.impact === 'medium' ? 'O\'rtacha' : 'Past'}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6 border border-indigo-100 print:bg-white"
            >
                <h2 className="text-xl font-bold text-indigo-900 mb-6 flex items-center">
                    <Award className="mr-2 text-indigo-600" />
                    Siz uchun shaxsiy reja
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                            <Clock className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="font-bold text-2xl text-slate-900">{result.recommendations.dailyTime}</div>
                        <div className="text-sm text-slate-500 mt-1">Kunlik o'qish vaqti</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-violet-100 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-3">
                            <Target className="h-6 w-6 text-violet-600" />
                        </div>
                        <div className="font-bold text-2xl text-slate-900">{result.recommendations.dailyWords} ta</div>
                        <div className="text-sm text-slate-500 mt-1">Yangi so'z (Aktiv)</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                            <CheckCircle className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="font-bold text-2xl text-slate-900">{result.recommendations.timeline}</div>
                        <div className="text-sm text-slate-500 mt-1">Taxminiy muddat</div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-white/80 rounded-xl border border-indigo-100">
                    <p className="text-sm text-slate-600 leading-relaxed">
                        <strong className="text-indigo-700">Eslatma:</strong> Bu natijalar sizning javoblaringizga asoslangan taxminiy prognoz.
                        Haqiqiy natija muntazamlik va intizomga bog'liq. Har kuni {result.recommendations.dailyTime.split(' ')[0]} daqiqa
                        ajratib, {result.recommendations.dailyWords} ta so'zni aktiv ishlating.
                        {result.recommendations.focusSkill && ` Eng zaif tomoning — ${SKILL_NAMES[result.recommendations.focusSkill]}, unga ko'proq e'tibor ber.`}
                    </p>
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4 print:hidden"
            >
                <Button
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                    className="gap-2"
                >
                    <RotateCcw className="h-4 w-4" />
                    Qayta topshirish
                </Button>
                <Button
                    size="lg"
                    onClick={handlePrint}
                    className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                >
                    <Download className="h-4 w-4" />
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
