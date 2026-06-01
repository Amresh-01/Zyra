import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActionCenter, updateTaskStatus } from "../api/actionsCenter";
import StudentCard from "../components/StudentCard";
import InsightCard from "../components/InsightCard";
import MessageList from "../components/MessageList";
import TaskSummary from "../components/TaskSummary";

type Task = {
  taskId: string;
  studentId: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
};

export default function Dashboard() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (studentId) {
      setLoading(true);
      setError(null);
      getActionCenter(studentId)
        .then((res) => {
          if (!res.tasks.list || res.tasks.list.length === 0) {
            res.tasks.list = getFallbackTasks(studentId);
          }
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
    }
  }, [studentId]);

const getFallbackTasks = (id: string): Task[] => {
  const allFallbackTasks: Task[] = [
    {
      taskId: "tsk_001",
      studentId: "stu_001",
      title: "Submit FAFSA application",
      description: "Deadline is approaching. Student has not started the form.",
      status: "todo",
      priority: "urgent",
      dueDate: "2026-06-05",
    },
    {
      taskId: "tsk_002",
      studentId: "stu_001",
      title: "Meet with math tutor",
      description: "Failing algebra — tutoring sessions must begin immediately.",
      status: "in_progress",
      priority: "high",
      dueDate: "2026-06-01",
    },
    {
      taskId: "tsk_003",
      studentId: "stu_001",
      title: "Attendance improvement plan",
      description: "Student missed 8 days this semester. Plan must be signed.",
      status: "todo",
      priority: "urgent",
      dueDate: "2026-05-28",
    },
    {
      taskId: "tsk_004",
      studentId: "stu_001",
      title: "Review college interest list",
      description: "Compile 5 target schools based on GPA and interests.",
      status: "todo",
      priority: "medium",
      dueDate: "2026-07-01",
    },
    {
      taskId: "tsk_005",
      studentId: "stu_001",
      title: "Parent meeting scheduled",
      description: "Coordinate a meeting with guardian to discuss current standing.",
      status: "completed",
      priority: "high",
      dueDate: "2026-05-18",
    },
    {
      taskId: "tsk_006",
      studentId: "stu_002",
      title: "Finalise Common App essay",
      description: "Essay draft reviewed — needs final polish before submission.",
      status: "in_progress",
      priority: "high",
      dueDate: "2026-06-08",
    },
    {
      taskId: "tsk_007",
      studentId: "stu_002",
      title: "Request teacher recommendations",
      description: "Two letters needed. One confirmed, one pending.",
      status: "in_progress",
      priority: "medium",
      dueDate: "2026-06-04",
    },
    {
      taskId: "tsk_008",
      studentId: "stu_002",
      title: "Send official transcripts",
      description: "All 6 schools require official transcripts via Naviance.",
      status: "completed",
      priority: "urgent",
      dueDate: "2026-05-13",
    },
    {
      taskId: "tsk_009",
      studentId: "stu_002",
      title: "Scholarship research",
      description: "Identify 3 scholarships relevant to intended major.",
      status: "todo",
      priority: "low",
      dueDate: "2026-07-18",
    },
    {
      taskId: "tsk_010",
      studentId: "stu_003",
      title: "Credit recovery: English 10",
      description: "Must complete online modules to recover failing grade.",
      status: "todo",
      priority: "urgent",
      dueDate: "2026-05-30",
    },
    {
      taskId: "tsk_011",
      studentId: "stu_003",
      title: "Behavioural support referral",
      description: "Refer student to student support services after incident report.",
      status: "in_progress",
      priority: "high",
      dueDate: "2026-06-02",
    },
    {
      taskId: "tsk_012",
      studentId: "stu_003",
      title: "Explore vocational pathways",
      description: "Student expressed interest in trades. Share relevant programs.",
      status: "todo",
      priority: "medium",
      dueDate: "2026-06-18",
    },
    {
      taskId: "tsk_013",
      studentId: "stu_003",
      title: "Initial counselling intake",
      description: "First formal session completed. Notes filed.",
      status: "completed",
      priority: "high",
      dueDate: "2026-05-11",
    },
  ];

  const studentTasks = allFallbackTasks.filter((t) => t.studentId === id);
  if (studentTasks.length > 0) return studentTasks;

  return [
    {
      taskId: `tsk_gen_${id}_1`,
      studentId: id,
      title: "Initial counselor intake session",
      description: "Review academic standing and establish counseling goals.",
      status: "todo",
      priority: "high",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
    {
      taskId: `tsk_gen_${id}_2`,
      studentId: id,
      title: "Review course requirements",
      description: "Audit credits to ensure graduation pathways are met.",
      status: "in_progress",
      priority: "medium",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  ];
};

  const handleUpdateTaskStatus = async (taskId: string, newStatus: "todo" | "in_progress" | "completed") => {
    try {
      // Send updates to backend (remote or local)
      await updateTaskStatus(taskId, newStatus);

      // Recalculate frontend state locally for instantaneous user feedback
      setData((prev: any) => {
        if (!prev) return prev;

        // 1. Update the status of the specific task in the list
        const updatedList = (prev.tasks.list || []).map((t: Task) =>
          t.taskId === taskId ? { ...t, status: newStatus } : t
        );

        // 2. Recalculate summary metrics
        const total = updatedList.length;
        const todo = updatedList.filter((t: Task) => t.status === "todo").length;
        const inProgress = updatedList.filter((t: Task) => t.status === "in_progress").length;
        const completed = updatedList.filter((t: Task) => t.status === "completed").length;

        // 3. Recalculate urgent and overdue task counts
        const urgentTasks = updatedList.filter((t: Task) => t.priority === "urgent").length;
        
        const now = Date.now();
        let overdueTasks = 0;
        let urgencyScore = 0;

        for (const t of updatedList) {
          // Priority additions
          if (t.status === "todo") urgencyScore += 1;
          if (t.status === "in_progress") urgencyScore += 0.5;

          if (t.priority === "urgent") urgencyScore += 3;
          else if (t.priority === "high") urgencyScore += 2;
          else if (t.priority === "medium") urgencyScore += 1;

          // Overdue calculation
          if (new Date(t.dueDate).getTime() < now && t.status !== "completed") {
            urgencyScore += 4;
            overdueTasks++;
          }
        }

        // Calculate risk levels
        let riskLevel: "low" | "medium" | "high" | "critical" = "low";
        if (urgencyScore >= 15) riskLevel = "critical";
        else if (urgencyScore >= 10) riskLevel = "high";
        else if (urgencyScore >= 5) riskLevel = "medium";

        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            summary: { total, todo, inProgress, completed },
            urgentTasks,
            overdueTasks,
            list: updatedList,
          },
          insights: {
            urgencyScore,
            riskLevel,
          },
        };
      });
    } catch (err: any) {
      alert("Failed to update task status: " + (err.response?.data?.message || err.message));
    }
  };

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
            <TaskSummary tasks={data.tasks} onUpdateStatus={handleUpdateTaskStatus} />
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