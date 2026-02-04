import { UserResponses, AuditResult } from './types';

export function calculateResult(responses: UserResponses): AuditResult {
    // --- 1. CONSISTENCY INDEX (Block B) ---
    const consistencyVal = parseInt(responses['consistency'] as string || '1');
    const planVal = responses['plan_exists'] === 'strong' ? 4 : responses['plan_exists'] === 'moderate' ? 3 : responses['plan_exists'] === 'weak' ? 2 : 1;
    const reviewVal = parseInt(responses['review_habit'] as string || '1');

    const consistencyRaw = (consistencyVal + planVal + reviewVal) / 3;
    const consistencyIndex = Math.round((consistencyRaw / 4) * 100);

    // --- 2. SKILL USAGE (Block C) ---
    const getSkillScore = (key: string) => {
        const val = parseInt(responses[key] as string || '1');
        return Math.round((val / 4) * 100);
    };

    const skills = {
        speaking: Math.round((getSkillScore('skill_speaking') + getSkillScore('skill_fluency')) / 2),
        listening: Math.round((getSkillScore('skill_listening') + getSkillScore('skill_speed')) / 2),
        writing: getSkillScore('skill_writing'),
        vocabulary: Math.round((getSkillScore('skill_vocab') + getSkillScore('skill_active_vocab')) / 2),
        grammar: getSkillScore('skill_grammar'),
    };

    // --- 3. PSYCHOLOGY RISK (Block D) ---
    const calcRisk = (val: string) => {
        if (val === 'high' || val === 'bad' || val === '1') return 100;
        if (val === 'medium' || val === 'average' || val === '2') return 50;
        return 0;
    };

    const riskFactors = [
        calcRisk(responses['fear_mistake'] as string),
        calcRisk(responses['distraction'] as string),
        calcRisk(responses['motivation'] as string),
        calcRisk(responses['burnout'] as string),
        calcRisk(responses['sleep'] as string),
        100 - (parseInt(responses['confidence'] as string || '2') / 4 * 100)
    ];
    const psychologyRisk = Math.round(riskFactors.reduce((a, b) => a + b, 0) / riskFactors.length);

    // --- 4. TIME CAPACITY ---
    const timeCapacity = parseInt(responses['daily_hours'] as string || '60');

    // --- 5. BLOCKERS & ACTION PLAN ---
    const blockers: { id: string; description: string; impact: 'high' | 'medium' | 'low' }[] = [];
    const actionPlan: string[] = [];

    // Consistency Advice
    if (consistencyVal <= 2) {
        blockers.push({ id: 'consistency', description: 'Muntazamlik juda past', impact: 'high' });
        actionPlan.push("Har kuni o'rganish zanjirini (chain) uzmaslik uchun '2 daqiqa qoidasi'ni qo'llang. Hatto eng og'ir kunda ham, 2 daqiqa shug'ullaning.");
    } else {
        actionPlan.push("Muntazamlikni saqlab qolish uchun hafta oxirida o'zingizni kichik mukofot bilan rag'batlantiring.");
    }

    // Speaking Advice
    if (skills.speaking <= 50) {
        blockers.push({ id: 'speaking', description: 'Gapirish praktikasi yetishmaydi', impact: 'high' });
        actionPlan.push("Shadowing (soyadek ergashish) texnikasidan foydalaning: Audio eshitib, pauza qilmasdan diktor orqasidan qaytaring.");
        actionPlan.push("O'zingizni videoga olib, gapirishingizni tahlil qiling (Self-correction).");
    }

    // Listening Advice
    if (skills.listening <= 50) {
        blockers.push({ id: 'listening', description: 'Eshitib tushunish oqsamoqda', impact: 'medium' });
        actionPlan.push("Podkastlarni 0.75x tezlikda eshitib ko'ring, keyin asta-sekin tezlashtiring.");
    }

    // Vocabulary Advice
    if (skills.vocabulary <= 50) {
        actionPlan.push("So'zlarni ro'yxat qilib emas, kontekstda (gap ichida) yodlang. Anki ilovasidan foydalaning.");
    }

    // Psychology Advice
    if (responses['fear_mistake'] === 'high') {
        blockers.push({ id: 'fear', description: 'Xato qilishdan qo\'rqish', impact: 'high' });
        actionPlan.push("Xatolar - bu o'rganish jarayonining tabiiy qismi. 'Growth Mindset' kitobini o'qing.");
    }

    if (responses['distraction'] === 'high') {
        blockers.push({ id: 'focus', description: 'Telefon/Internetga chalg\'ish', impact: 'medium' });
        actionPlan.push("Pomodoro texnikasini ishlating: 25 daqiqa dars, 5 daqiqa dam. Dars vaqtida telefonni boshqa xonaga qo'ying.");
    }

    // Review Habit
    if (parseInt(responses['review_habit'] as string || '1') <= 2) {
        actionPlan.push("Spaced Repetition (oraliq takrorlash) usulidan foydalaning. Kecha o'qiganingizni bugun, 3 kundan keyin va 1 haftadan keyin takrorlang.");
    }

    // Ensure unique actions and limit to top 5
    const uniqueActions = Array.from(new Set(actionPlan)).slice(0, 5);

    const sortedBlockers = blockers
        .sort((a, b) => (a.impact === 'high' ? -1 : 1) - (b.impact === 'high' ? -1 : 1))
        .slice(0, 3);

    if (sortedBlockers.length === 0) {
        sortedBlockers.push({ id: 'none', description: 'Jiddiy to\'siqlar aniqlanmadi. Ajoyib!', impact: 'low' });
        if (uniqueActions.length === 0) uniqueActions.push("Hozirgi templni saqlang va qiyinroq materiallarga o'ting.");
    }

    // --- 6. RECOMMENDATIONS ---
    const targetLevel = responses['target_level'] as string || 'B1';
    const currentLevel = responses['current_level'] as string || 'A1';

    let dailyWords = 10;
    if (targetLevel === 'B2') dailyWords = 15;
    if (targetLevel === 'A2') dailyWords = 8;

    let dailyTimeRec = '60-90 daqiqa';
    if (timeCapacity <= 45 || psychologyRisk > 60) dailyTimeRec = '45-60 daqiqa';
    else if (timeCapacity >= 120 && psychologyRisk < 40) dailyTimeRec = '90-120 daqiqa';

    const levelGap = { 'A1': 0, 'A2': 1, 'B1': 2, 'B2': 3 };
    const gap = (levelGap[targetLevel as keyof typeof levelGap] || 2) - (levelGap[currentLevel as keyof typeof levelGap] || 0);

    let baseMonths = gap * 3;
    const consistencyPenalty = consistencyIndex < 50 ? 1.5 : consistencyIndex < 70 ? 1.2 : 1;
    const psychologyPenalty = psychologyRisk > 60 ? 1.3 : psychologyRisk > 40 ? 1.1 : 1;
    const capacityBonus = timeCapacity >= 120 ? 0.8 : timeCapacity <= 30 ? 1.3 : 1;

    const adjustedMonths = Math.round(baseMonths * consistencyPenalty * psychologyPenalty * capacityBonus);
    const minMonths = Math.max(2, adjustedMonths - 1);
    const maxMonths = adjustedMonths + 2;

    const weakestSkill = Object.entries(skills).reduce((a, b) => a[1] < b[1] ? a : b)[0];

    return {
        consistency: consistencyIndex,
        psychologyRisk,
        skillUsage: skills,
        timeCapacity,
        topBlockers: sortedBlockers,
        level: targetLevel as 'A2' | 'B1' | 'B2',
        recommendations: {
            dailyTime: dailyTimeRec,
            dailyWords,
            timeline: `${minMonths}-${maxMonths} oy`,
            focusSkill: weakestSkill,
            actionPlan: uniqueActions
        }
    };
}
