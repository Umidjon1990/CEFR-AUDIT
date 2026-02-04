"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageLoadSound from "@/components/ui/PageLoadSound";
import { ArrowRight, Zap } from "lucide-react";
import { useAppSounds } from "@/lib/useAppSounds";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { playClick, playHover, startBgMusic } = useAppSounds();

  // Start background music on landing page
  useEffect(() => {
    startBgMusic();
  }, [startBgMusic]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white px-6 overflow-hidden relative">

      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="max-w-5xl text-center space-y-12 animate-in fade-in zoom-in duration-700 relative z-10">

        <PageLoadSound />

        {/* Hero Section */}
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50/80 backdrop-blur-sm px-4 py-1.5 text-sm font-bold text-indigo-700 shadow-sm hover:scale-105 transition-transform cursor-default">
            <Zap className="mr-2 h-4 w-4 fill-indigo-500" />
            Test emas. Professional Audit.
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Nega til o‘rganishda <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 drop-shadow-sm">natija qila olmayapsiz?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Grammatika va so‘z yodlashdan charchadingizmi? <br className="hidden md:block" />
            Biz sizning bilimingizni emas, <strong>o‘qish tizimingizni</strong> tekshiramiz.
          </p>
        </div>

        {/* CTA */}
        <div className="pb-8">
          <Link href="/audit">
            <Button
              size="lg"
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="h-16 px-10 text-lg rounded-full shadow-2xl shadow-indigo-300/50 hover:shadow-indigo-400/60 hover:-translate-y-1 transition-all bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 duration-300 ring-2 ring-white/20"
            >
              Auditni boshlash
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
          <p className="text-sm text-slate-400 mt-4 font-semibold uppercase tracking-wide">2 daqiqa vaqt oladi • Natija 100% bepul</p>
        </div>

        {/* Features Grid with 3D Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 text-left">

          {/* Card 1 */}
          <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Image src="/icons/magnifier-dynamic.png" alt="icon" width={100} height={100} />
            </div>
            <div className="h-14 w-14 mb-6 relative group-hover:scale-110 transition-transform duration-300">
              <Image src="/icons/magnifier-dynamic.png" alt="Diagnosis" fill className="object-contain" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-2">Aniq Tashxis</h3>
            <p className="text-slate-500 leading-relaxed">Sizni aynan nima to‘xtatib turganini (blocker) aniqlaymiz.</p>
          </div>

          {/* Card 2 */}
          <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Image src="/icons/calendar-dynamic.png" alt="icon" width={100} height={100} />
            </div>
            <div className="h-14 w-14 mb-6 relative group-hover:scale-110 transition-transform duration-300">
              <Image src="/icons/calendar-dynamic.png" alt="Plan" fill className="object-contain" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-2">Shaxsiy Reja</h3>
            <p className="text-slate-500 leading-relaxed">Kuniga necha daqiqa va nechta so‘z o‘qish kerakligini hisoblaymiz.</p>
          </div>

          {/* Card 3 */}
          <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Image src="/icons/memo-dynamic.png" alt="icon" width={100} height={100} />
            </div>
            <div className="h-14 w-14 mb-6 relative group-hover:scale-110 transition-transform duration-300">
              <Image src="/icons/memo-dynamic.png" alt="Report" fill className="object-contain" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-2">Professional Report</h3>
            <p className="text-slate-500 leading-relaxed">Natijani PDF formatda yuklab olishingiz mumkin.</p>
          </div>

        </div>

      </div>
    </main>
  );
}
