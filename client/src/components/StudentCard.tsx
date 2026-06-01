type Props = {
  student: {
    studentId: string;
    name: string;
    email: string;
    grade: number;
    gpa: number;
    enrollmentStatus: "active" | "at_risk" | "inactive";
  };
};

export default function StudentCard({ student }: Props) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Active
          </span>
        );
      case "at_risk":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
            At Risk
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Inactive
          </span>
        );
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden shadow-2xl">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar Placeholder */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-indigo-500/20">
            {student.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">{student.name}</h2>
              {getStatusBadge(student.enrollmentStatus)}
            </div>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {student.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:flex items-center gap-3 md:gap-6 border-t border-slate-800/80 md:border-t-0 pt-4 md:pt-0">
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl px-4 py-2.5 min-w-[100px]">
            <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Grade</span>
            <span className="text-lg font-extrabold text-slate-200">{student.grade}th Grade</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl px-4 py-2.5 min-w-[100px]">
            <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">GPA</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-violet-400">{student.gpa.toFixed(2)}</span>
              <span className="text-[10px] text-slate-600">/ 4.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}