type Props = {
  insights: {
    urgencyScore: number;
    riskLevel: "low" | "medium" | "high" | "critical";
  };
};

export default function InsightCard({ insights }: Props) {
  const getRiskDetails = (level: string) => {
    switch (level) {
      case "critical":
        return {
          bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
          progressColor: "bg-gradient-to-r from-rose-500 to-red-600 shadow-rose-500/20",
          title: "Critical Priority",
          desc: "Immediate counselor action is required. This student has multiple overdue tasks and high priority alerts.",
          icon: (
            <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
      case "high":
        return {
          bg: "bg-orange-500/10 border-orange-500/20 text-orange-400",
          progressColor: "bg-gradient-to-r from-orange-500 to-rose-500 shadow-orange-500/20",
          title: "High Attention",
          desc: "Schedule a follow-up session within the next 48 hours. Review missing assignments or unread messages.",
          icon: (
            <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case "medium":
        return {
          bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
          progressColor: "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/20",
          title: "Moderate Risk",
          desc: "Monitor performance. Keep an eye on task progress and remind the student of upcoming deadlines.",
          icon: (
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      default:
        return {
          bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          progressColor: "bg-gradient-to-r from-emerald-400 to-teal-500 shadow-emerald-500/20",
          title: "Stable / Low Risk",
          desc: "Student is performing well and meeting goals. Standard check-ins are sufficient.",
          icon: (
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };

  const details = getRiskDetails(insights.riskLevel);
  // Cap urgency score progress display at 30 points max
  const progressPercent = Math.min((insights.urgencyScore / 30) * 100, 100);

  return (
    <div className="glass-panel p-6 rounded-2xl shadow-2xl flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white tracking-tight">Risk Assessment</h2>
          <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${details.bg}`}>
            {insights.riskLevel}
          </span>
        </div>

        {/* Urgency Progress Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-5">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Urgency Score</span>
            <span className="text-2xl font-extrabold text-white">{insights.urgencyScore}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 shadow-lg ${details.progressColor}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-600 mt-1">
            <span>Low (0)</span>
            <span>Medium (5)</span>
            <span>High (10)</span>
            <span>Critical (15+)</span>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-xl border flex gap-3 ${details.bg}`}>
        <div className="flex-shrink-0 mt-0.5">{details.icon}</div>
        <div>
          <h3 className="font-semibold text-sm mb-0.5">{details.title}</h3>
          <p className="text-xs leading-relaxed opacity-90">{details.desc}</p>
        </div>
      </div>
    </div>
  );
}