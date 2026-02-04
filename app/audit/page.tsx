import SurveyFlow from "@/components/audit/SurveyFlow";

export default function AuditPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-transparent to-transparent opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-violet-100 via-transparent to-transparent opacity-50 pointer-events-none" />

            <div className="relative z-10 w-full">
                <SurveyFlow />
            </div>
        </main>
    );
}
