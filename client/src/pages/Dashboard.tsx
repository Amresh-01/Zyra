import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActionCenter } from "../api/actionsCenter";

import StudentCard from "../components/StudentCard";
import InsightCard from "../components/InsightCard";
import MessageList from "../components/MessageList";
import TaskSummary from "../components/TaskSummary";

type DashboardData = {
  student: {
    studentId: string;
    name: string;
    email: string;
    grade: number;
    gpa: number;
    enrollmentStatus: "at_risk" | "active" | "inactive";
  };

  tasks: {
    summary: {
      total: number;
      todo: number;
      inProgress: number;
      completed: number;
    };
    urgentTasks: number;
    overdueTasks: number;
  };

  messages: {
    unread: number;
    recent: {
      messageId: string;
      from: string;
      subject: string;
      preview: string;
      read: boolean;
      receivedAt: string;
    }[];
  };

  insights: {
    urgencyScore: number;
    riskLevel: "low" | "medium" | "high" | "critical";
  };
};

export default function Dashboard() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) return;

    setLoading(true);
    setError(null);

    getActionCenter(studentId)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Could not load student data. Please check the ID and try again."
        );

        setLoading(false);
      });
  }, [studentId]);

  // rest of your component stays exactly the same
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium">Loading Action Center Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="glass-panel p-8 rounded-2xl max-w-md w-full border border-rose-500/20 shadow-2xl text-center">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
            <svg className="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Retrieval Error</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">{error || "Student profile not found."}</p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all"
          >
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navigation bar */}
      <nav className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group text-sm font-semibold"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Directory
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              Z
            </div>
            <span className="font-extrabold text-xs tracking-wider text-slate-400 uppercase">
              Action Center
            </span>
          </div>
        </div>
      </nav>

      {/* Main Grid content */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6 flex-grow space-y-6">
        {/* Student Profile Card (top level full width) */}
        <StudentCard student={data.student} />

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 & 2: Tasks List */}
          <div className="lg:col-span-2 space-y-6">
            <TaskSummary
                summary={data.tasks.summary}
                urgentTasks={data.tasks.urgentTasks}
                overdueTasks={data.tasks.overdueTasks}
            />
          </div>

          {/* Column 3: Insights and Messages */}
          <div className="space-y-6">
            <InsightCard insights={data.insights} />
            <MessageList messages={data.messages.recent} unreadCount={data.messages.unread} />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-700 border-t border-slate-900/50 mt-10">
        Zyra Academic Counselor Dashboard • Verified Connection
      </footer>
    </div>
  );
}