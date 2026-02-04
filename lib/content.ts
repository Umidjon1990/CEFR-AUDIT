import { Question } from './types';

export const QUESTIONS: Question[] = [
    // ═══════════════════════════════════════════════════════════════════
    // BLOCK A: MAQSAD & DEADLINE (7 savol)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'target_level',
        text: "Sizga qaysi CEFR daraja kerak?",
        type: 'choice',
        block: 'A',
        options: [
            { value: 'A2', label: 'A2 (Elementary) - Bazaviy muloqot' },
            { value: 'B1', label: 'B1 (Intermediate) - Erkin gapirish' },
            { value: 'B2', label: 'B2 (Upper-Intermediate) - Professional daraja' },
        ]
    },
    {
        id: 'current_level',
        text: "Hozirgi darajangiz taxminan qanday?",
        type: 'choice',
        block: 'A',
        options: [
            { value: 'A1', label: 'A1 (Beginner) - Eng oddiy gaplar' },
            { value: 'A2', label: 'A2 (Elementary) - Kundalik mavzular' },
            { value: 'B1', label: 'B1 (Intermediate) - Ko\'pchilik mavzular' },
        ]
    },
    {
        id: 'deadline',
        text: "Natija qachongacha kerak?",
        type: 'choice',
        block: 'A',
        options: [
            { value: '3', label: '3 oy ichida (Juda tezkor)' },
            { value: '6', label: '6 oy ichida (Optimal)' },
            { value: '12', label: '1 yil davomida (Shoshilmasdan)' },
            { value: '0', label: 'Aniq deadline yo\'q' },
        ]
    },
    {
        id: 'purpose',
        text: "Chet tili nimaga kerak?",
        type: 'choice',
        block: 'A',
        options: [
            { value: 'study', label: 'O\'qishga kirish (IELTS/CEFR)' },
            { value: 'work', label: 'Ish / Karyera uchun' },
            { value: 'migration', label: 'Chet elga ko\'chib o\'tish' },
            { value: 'personal', label: 'Shaxsiy rivojlanish' },
        ]
    },
    {
        id: 'pressure',
        text: "Agar natija o'z vaqtida chiqmasa, nima bo'ladi?",
        type: 'choice',
        block: 'A',
        options: [
            { value: 'high', label: 'Jiddiy muammo (ish/o\'qishdan mahrum bo\'laman)' },
            { value: 'medium', label: 'Yomon, lekin hayot davom etadi' },
            { value: 'low', label: 'Hech narsa, keyinroq urinaman' },
        ]
    },
    {
        id: 'previous_attempts',
        text: "Ilgari CEFR/IELTS imtihon topshirganmisiz?",
        type: 'choice',
        block: 'A',
        options: [
            { value: 'never', label: 'Hech qachon' },
            { value: 'once', label: 'Ha, bir marta (muvaffaqiyatsiz)' },
            { value: 'multiple', label: 'Bir necha marta uringanman' },
            { value: 'passed', label: 'Ha, o\'tganman (yangi daraja kerak)' },
        ]
    },
    {
        id: 'investment',
        text: "Til o'rganishga qancha sarmoya qilgansiz (kurslar, kitoblar)?",
        type: 'choice',
        block: 'A',
        options: [
            { value: 'none', label: 'Deyarli hech narsa' },
            { value: 'low', label: 'Kam (bir-ikki kurs)' },
            { value: 'medium', label: 'O\'rtacha (repetitor, kurslar)' },
            { value: 'high', label: 'Ko\'p (bir necha yil davomida)' },
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // BLOCK B: O'QISH TIZIMI (8 savol)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'consistency',
        text: "Oxirgi 3 oyda tilni qanchalik muntazam o'qidingiz?",
        type: 'choice',
        block: 'B',
        options: [
            { value: '1', label: 'Umuman o\'qimadim' },
            { value: '2', label: 'Haftada 1-2 marta (tartibsiz)' },
            { value: '3', label: 'Haftada 3-4 marta (o\'rtacha)' },
            { value: '4', label: 'Deyarli har kuni (ba\'zi uzilishlar)' },
            { value: '5', label: 'Har kuni, uzluksiz' },
        ]
    },
    {
        id: 'daily_hours',
        text: "Bir kunda til o'rganishga real qancha vaqt ajrata olasiz?",
        type: 'choice',
        block: 'B',
        options: [
            { value: '30', label: '30-45 daqiqa (Juda bandman)' },
            { value: '60', label: '1 - 1.5 soat (Standard)' },
            { value: '120', label: '2-3 soat (Jiddiy kirishganman)' },
            { value: '240', label: '4+ soat (Butun kunim bo\'sh)' },
        ]
    },
    {
        id: 'method',
        text: "Hozir qanday usulda o'qiyapsiz?",
        type: 'choice',
        block: 'B',
        options: [
            { value: 'center', label: 'O\'quv markazi / Repetitor bilan' },
            { value: 'online', label: 'Online kurs orqali' },
            { value: 'self', label: 'Mustaqil (YouTube, kitoblar)' },
            { value: 'mixed', label: 'Aralash (hammasi birga)' },
            { value: 'none', label: 'Hozircha o\'qimayapman' },
        ]
    },
    {
        id: 'materials',
        text: "Qanday materiallardan foydalanasiz?",
        type: 'choice',
        block: 'B',
        options: [
            { value: 'textbook', label: 'Maxsus darsliklar va qo‘llanmalar' },
            { value: 'apps', label: 'Mobil ilovalar (Duolingo, LingoDeer, va h.k)' },
            { value: 'video', label: 'Video darslar (YouTube, Online kurslar)' },
            { value: 'mixed', label: 'Hammasi aralash' },
            { value: 'none', label: 'Aniq material yo\'q' },
        ]
    },
    {
        id: 'plan_exists',
        text: "Sizda aniq o'qish rejasi bormi?",
        type: 'choice',
        block: 'B',
        options: [
            { value: 'none', label: 'Yo\'q, tasodifiy o\'qiyman' },
            { value: 'weak', label: 'Bor, lekin doim buziladi' },
            { value: 'moderate', label: 'Bor, ko\'pincha amal qilaman' },
            { value: 'strong', label: 'Ha, aniq va qat\'iy' },
        ]
    },
    {
        id: 'review_habit',
        text: "O'rgangan narsalarni takrorlash odatingiz bormi?",
        type: 'choice',
        block: 'B',
        options: [
            { value: '1', label: 'Hech qachon takrorlamayman' },
            { value: '2', label: 'Juda kam (oyda bir marta)' },
            { value: '3', label: 'Ba\'zan (haftada bir)' },
            { value: '4', label: 'Muntazam (har kuni)' },
        ]
    },
    {
        id: 'speaking_practice',
        text: "Chet tilida gapirishni qanchalik mashq qilasiz?",
        type: 'choice',
        block: 'B',
        options: [
            { value: '1', label: 'Hech qachon gapirmayman' },
            { value: '2', label: 'Juda kam (oyda bir-ikki marta)' },
            { value: '3', label: 'Haftada bir-ikki marta' },
            { value: '4', label: 'Har kuni gapirishga harakat qilaman' },
        ]
    },
    {
        id: 'listening_exposure',
        text: "Chet tilidagi audio/video kontentga qanchalik exposed bo'lasiz?",
        type: 'choice',
        block: 'B',
        options: [
            { value: '1', label: 'Deyarli hech' },
            { value: '2', label: 'Haftada 1-2 soat' },
            { value: '3', label: 'Kuniga 30-60 daqiqa' },
            { value: '4', label: 'Kuniga 2+ soat' },
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // BLOCK C: SKILL FOYDALANISH (8 savol)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'skill_speaking',
        text: "Speaking: Gapirganda o'zingizni qanday his qilasiz?",
        type: 'choice',
        block: 'C',
        options: [
            { value: '1', label: 'Gapira olmayman, so\'zlarim chiqmaydi' },
            { value: '2', label: 'Juda sekin, ko\'p to\'xtalib gapiraman' },
            { value: '3', label: 'Fikrimni yetkaza olaman, lekin xato qilaman' },
            { value: '4', label: 'Erkin va ishonchli gapiraman' },
        ]
    },
    {
        id: 'skill_fluency',
        text: "Gapni uzluksiz davom ettira olasizmi?",
        type: 'choice',
        block: 'C',
        options: [
            { value: '1', label: 'Yo\'q, 2-3 gapdan keyin to\'xtab qolaman' },
            { value: '2', label: '30 soniya davom ettira olaman' },
            { value: '3', label: '1-2 daqiqa gapira olaman' },
            { value: '4', label: 'Ha, bemalol davom ettiraman' },
        ]
    },
    {
        id: 'skill_listening',
        text: "Listening: Chet tilidagi videolarni subtitrsiz tushunasizmi?",
        type: 'choice',
        block: 'C',
        options: [
            { value: '1', label: 'Deyarli tushunmayman' },
            { value: '2', label: 'Faqat tanish so\'zlarni ushlayman (30%)' },
            { value: '3', label: 'Umumiy ma\'noni tushunaman (60-70%)' },
            { value: '4', label: 'Bemalol tushunaman (90%+)' },
        ]
    },
    {
        id: 'skill_speed',
        text: "Tez gapirishni (native speakers) tushunasizmi?",
        type: 'choice',
        block: 'C',
        options: [
            { value: '1', label: 'Yo\'q, umuman tushunmayman' },
            { value: '2', label: 'Juda qiyin, sekinlatish kerak' },
            { value: '3', label: 'Ba\'zan, kontekstga qarab' },
            { value: '4', label: 'Ha, bemalol' },
        ]
    },
    {
        id: 'skill_vocab',
        text: "Vocabulary: So'z boyligingiz gapirishga yetadimi?",
        type: 'choice',
        block: 'C',
        options: [
            { value: '1', label: 'Yo\'q, doim tarjima qilib o\'tiraman' },
            { value: '2', label: 'Yetishmaydi, oddiy so\'zlardan foydalanaman' },
            { value: '3', label: 'Yetadi, lekin akademik so\'zlarni bilmayman' },
            { value: '4', label: 'Boy so\'z zaxiram bor' },
        ]
    },
    {
        id: 'skill_active_vocab',
        text: "O'rgangan so'zlaringizni gapda ishlata olasizmi?",
        type: 'choice',
        block: 'C',
        options: [
            { value: '1', label: 'Yo\'q, faqat tanib olaman' },
            { value: '2', label: 'Kam, ko\'pini esdan chiqaraman' },
            { value: '3', label: 'Ko\'pini ishlata olaman' },
            { value: '4', label: 'Ha, bemalol' },
        ]
    },
    {
        id: 'skill_grammar',
        text: "Grammar: Qoidalarni qanchalik avtomatlashtirgansiz?",
        type: 'choice',
        block: 'C',
        options: [
            { value: '1', label: 'Qoidalarni bilmayman' },
            { value: '2', label: 'Bilaman, lekin gapirganda esdan chiqadi' },
            { value: '3', label: 'To\'g\'ri gapiraman, lekin o\'ylab turaman' },
            { value: '4', label: 'Avtomatlashgan, o\'ylab o\'tirmayman' },
        ]
    },
    {
        id: 'skill_writing',
        text: "Writing: Chet tilida yozganda qanday his qilasiz?",
        type: 'choice',
        block: 'C',
        options: [
            { value: '1', label: 'Yoza olmayman' },
            { value: '2', label: 'Juda qiyin, ko\'p xato qilaman' },
            { value: '3', label: 'Oddiy tekstlar yoza olaman' },
            { value: '4', label: 'Erkin va struktura bilan yozaman' },
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    // BLOCK D: PSIXOLOGIYA & INTIZOM (7 savol)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'fear_mistake',
        text: "Xato qilishdan va boshqalar kulishidan qo'rqasizmi?",
        type: 'choice',
        block: 'D',
        options: [
            { value: 'high', label: 'Ha, juda qattiq qo\'rqaman' },
            { value: 'medium', label: 'Biroz noqulay, lekin harakat qilaman' },
            { value: 'low', label: 'Yo\'q, men uchun natija muhim' },
        ]
    },
    {
        id: 'confidence',
        text: "Chet tilida gapirganingizda o'zingizga ishonasizmi?",
        type: 'choice',
        block: 'D',
        options: [
            { value: '1', label: 'Umuman ishonmayman' },
            { value: '2', label: 'Kam, faqat oson mavzularda' },
            { value: '3', label: 'O\'rtacha, tanish odamlar bilan' },
            { value: '4', label: 'Ha, ishonaman' },
        ]
    },
    {
        id: 'distraction',
        text: "Dars qilayotganda telefonga ko'p chalg'iysizmi?",
        type: 'choice',
        block: 'D',
        options: [
            { value: 'high', label: 'Ha, har 5-10 daqiqada qarayman' },
            { value: 'medium', label: 'Ba\'zan, xabar kelsa' },
            { value: 'low', label: 'Yo\'q, telefonni chetga qo\'yaman' },
        ]
    },
    {
        id: 'motivation',
        text: "Motivatsiya tez-tez tushib ketadimi?",
        type: 'choice',
        block: 'D',
        options: [
            { value: 'high', label: 'Ha, 2-3 kunda tashlab qo\'ygim keladi' },
            { value: 'medium', label: 'Ba\'zan, qiyin mavzuga kelsam' },
            { value: 'low', label: 'Yo\'q, maqsadim aniq' },
        ]
    },
    {
        id: 'burnout',
        text: "O'qishdan charchab ketadimi (burnout)?",
        type: 'choice',
        block: 'D',
        options: [
            { value: 'high', label: 'Ha, tez-tez' },
            { value: 'medium', label: 'Ba\'zan, 2-3 haftadan keyin' },
            { value: 'low', label: 'Yo\'q, maroq bilan o\'qiyman' },
        ]
    },
    {
        id: 'sleep',
        text: "Uyqu rejimingiz qanday?",
        type: 'choice',
        block: 'D',
        options: [
            { value: 'bad', label: 'Yomon (kam uxlayman, kech yotaman)' },
            { value: 'average', label: 'O\'rtacha (6-7 soat)' },
            { value: 'good', label: 'Yaxshi (7-8 soat, muntazam)' },
        ]
    },
    {
        id: 'environment',
        text: "O'qish muhitingiz qanday?",
        type: 'choice',
        block: 'D',
        options: [
            { value: 'bad', label: 'Yomon (shovqin, chalg\'ituvchilar ko\'p)' },
            { value: 'average', label: 'O\'rtacha (ba\'zan tinch)' },
            { value: 'good', label: 'Yaxshi (tinch, qulay)' },
        ]
    },
];
