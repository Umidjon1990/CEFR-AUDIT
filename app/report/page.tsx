import ReportDashboard from "@/components/report/ReportDashboard";

export default function ReportPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="absolute inset-0 bg-slate-50 z-0" />
            <div className="relative z-10 w-full">
                <ReportDashboard />
            </div>
        </main>
    );
}
