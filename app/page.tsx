import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Target, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white px-6 overflow-hidden">
      <div className="max-w-4xl text-center space-y-8 animate-in fade-in zoom-in duration-700">

        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 mb-4 shadow-sm">
          <Zap className="mr-2 h-4 w-4 fill-indigo-500" />
          Test emas. Professional Audit.
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
          Til o‘rganishda nega <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">tiqilib qoldingiz?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Grammatika va so‘z yodlashdan charchadingizmi? <br className="hidden md:block" />
          Biz sizning bilimingizni emas, <strong>o‘qish tizimingizni</strong> tekshiramiz.
        </p>

        {/* CTA */}
        <div className="pt-8 pb-12">
          <Link href="/audit">
            <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-xl shadow-indigo-200/50 hover:shadow-2xl hover:shadow-indigo-300/50 hover:-translate-y-1 transition-all bg-indigo-600 hover:bg-indigo-700 duration-300">
              Auditni boshlash
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-slate-400 mt-4 font-medium">2 daqiqa vaqt oladi • Natija 100% bepul</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-6 rounded-2xl bg-white/60 border border-slate-100 shadow-sm backdrop-blur-md hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Aniq Tashxis</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Sizni aynan nima to‘xtatib turganini (blocker) aniqlaymiz.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/60 border border-slate-100 shadow-sm backdrop-blur-md hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-violet-100 flex items-center justify-center mb-4 text-violet-600">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Shaxsiy Reja</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Kuniga necha daqiqa va nechta so‘z o‘qish kerakligini hisoblaymiz.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/60 border border-slate-100 shadow-sm backdrop-blur-md hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Professional Report</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Natijani PDF formatda yuklab olishingiz mumkin.</p>
          </div>
        </div>

      </div>
    </main>
  );
}
