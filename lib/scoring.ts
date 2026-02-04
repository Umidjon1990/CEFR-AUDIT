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

    // --- 5. DEADLINE PRESSURE ---
    const pressureLevel = responses['pressure'] as string || 'medium';

    // --- 6. BLOCKERS ---
    const blockers: { id: string; description: string; impact: 'high' | 'medium' | 'low' }[] = [];

    if (consistencyVal <= 2) {
        blockers.push({ id: 'consistency', description: 'Muntazamlik juda past — o\'qish tartibsiz', impact: 'high' });
    }
    if (skills.speaking <= 50) {
        blockers.push({ id: 'speaking', description: 'Speaking praktikasi yetarli emas', impact: 'high' });
    }
    if (parseInt(responses['speaking_practice'] as string || '1') <= 2) {
        blockers.push({ id: 'practice', description: 'Gapirishni mashq qilish kam', impact: 'high' });
    }
    if (responses['distraction'] === 'high') {
        blockers.push({ id: 'focus', description: 'Diqqat jamlash muammosi (telefon)', impact: 'medium' });
    }
    if (responses['fear_mistake'] === 'high') {
        blockers.push({ id: 'fear', description: 'Xato qilishdan qo\'rqish (psixologik to\'siq)', impact: 'high' });
    }
    if (responses['motivation'] === 'high') {
        blockers.push({ id: 'motivation', description: 'Motivatsiya barqaror emas', impact: 'medium' });
    }
    if (reviewVal <= 2) {
        blockers.push({ id: 'review', description: 'Takrorlash odati yo\'q (unutish xavfi)', impact: 'medium' });
    }
    if (skills.listening <= 50) {
        blockers.push({ id: 'listening', description: 'Listening ko\'nikmalari past', impact: 'medium' });
    }
    if (responses['plan_exists'] === 'none') {
        blockers.push({ id: 'plan', description: 'Aniq o\'qish rejasi yo\'q', impact: 'medium' });
    }

    // Sort: high first, then medium
    const sortedBlockers = blockers
        .sort((a, b) => (a.impact === 'high' ? -1 : 1) - (b.impact === 'high' ? -1 : 1))
        .slice(0, 3);

    if (sortedBlockers.length === 0) {
        sortedBlockers.push({ id: 'none', description: 'Jiddiy to\'siqlar aniqlanmadi. Davom eting!', impact: 'low' });
    }

    // --- 7. RECOMMENDATIONS ---
    const targetLevel = responses['target_level'] as string || 'B1';
    const currentLevel = responses['current_level'] as string || 'A1';

    // Daily words based on target
    let dailyWords = 10;
    if (targetLevel === 'B2') dailyWords = 15;
    if (targetLevel === 'A2') dailyWords = 8;

    // Daily time based on capacity and psychology
    let dailyTimeRec = '60-90 daqiqa';
    if (timeCapacity <= 45 || psychologyRisk > 60) {
        dailyTimeRec = '45-60 daqiqa (bosqichma-bosqich)';
    } else if (timeCapacity >= 120 && psychologyRisk < 40) {
        dailyTimeRec = '90-120 daqiqa';
    }

    // Timeline calculation (simplified)
    const levelGap = { 'A1': 0, 'A2': 1, 'B1': 2, 'B2': 3 };
    const gap = (levelGap[targetLevel as keyof typeof levelGap] || 2) - (levelGap[currentLevel as keyof typeof levelGap] || 0);

    // Base months per level, adjusted by factors
    let baseMonths = gap * 3; // 3 months per level
    const consistencyPenalty = consistencyIndex < 50 ? 1.5 : consistencyIndex < 70 ? 1.2 : 1;
    const psychologyPenalty = psychologyRisk > 60 ? 1.3 : psychologyRisk > 40 ? 1.1 : 1;
    const capacityBonus = timeCapacity >= 120 ? 0.8 : timeCapacity <= 30 ? 1.3 : 1;

    const adjustedMonths = Math.round(baseMonths * consistencyPenalty * psychologyPenalty * capacityBonus);
    const minMonths = Math.max(2, adjustedMonths - 1);
    const maxMonths = adjustedMonths + 2;

    // Skill distribution recommendation (what to focus on)
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
            focusSkill: weakestSkill
        }
    };
}
