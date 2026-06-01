import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    navigate(`/students/${studentId}`);
  };

  const demoStudents = [
    {
      id: "stu_001",
      name: "Maya Patel",
      grade: 11,
      gpa: 3.2,
      status: "at_risk",
      statusText: "At Risk",
      statusClass: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    },
    {
      id: "stu_002",
      name: "Jordan Lee",
      grade: 12,
      gpa: 3.8,
      status: "active",
      statusText: "Active",
      statusClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
    {
      id: "stu_003",
      name: "Carlos Rivera",
      grade: 10,
      gpa: 2.4,
      status: "at_risk",
      statusText: "At Risk",
      statusClass: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 relative overflow-hidden px-4">
      {/* Visual background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="py-6 max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-md">
            Z
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            ZYRA
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
          Action Center v1.0
        </span>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center py-10 z-10">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              Counselor{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Student Action Center
              </span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Quickly assess student academic priorities, overdue work, unread communications, and calculated risk assessments.
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-panel p-8 rounded-2xl shadow-2xl mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="student-id-input" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Find Student Action Center
                </label>
                <div className="relative">
                  <input
                    id="student-id-input"
                    type="text"
                    placeholder="Enter Student ID (e.g. stu_001)"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-800 focus:border-violet-500 rounded-xl py-3.5 pl-4 pr-24 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Demo shortcuts */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px bg-slate-800 flex-grow"></span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest whitespace-nowrap">
                Demo Student Profiles
              </span>
              <span className="h-px bg-slate-800 flex-grow"></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {demoStudents.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => navigate(`/students/${demo.id}`)}
                  className="glass-card p-4 rounded-xl text-left hover:border-violet-500/30 group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-200 group-hover:text-violet-400 transition-colors">
                      {demo.name}
                    </span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${demo.statusClass}`}>
                      {demo.statusText}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Grade {demo.grade}</span>
                    <span>GPA {demo.gpa}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Open Dashboard</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-600 border-t border-slate-900/50">
        © 2026 Zyra Academic. All rights reserved.
      </footer>
    </div>
  );
}