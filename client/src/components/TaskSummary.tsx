import { useState } from "react";

type Task = {
  taskId: string;
  studentId: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
};

type Props = {
  tasks: {
    summary: {
      total: number;
      todo: number;
      inProgress: number;
      completed: number;
    };
    urgentTasks: number;
    overdueTasks: number;
    list?: Task[];
  };
  onUpdateStatus: (taskId: string, status: "todo" | "in_progress" | "completed") => Promise<void>;
};

export default function TaskSummary({ tasks, onUpdateStatus }: Props) {
  const [filter, setFilter] = useState<"all" | "todo" | "in_progress" | "completed" | "urgent" | "overdue">("all");
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  const taskList = tasks.list || [];

  const handleStatusChange = async (taskId: string, newStatus: "todo" | "in_progress" | "completed") => {
    setUpdatingTaskId(taskId);
    try {
      await onUpdateStatus(taskId, newStatus);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "high":
        return "px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-orange-500/10 text-orange-400 border border-orange-500/20";
      case "medium":
        return "px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/10 text-amber-400 border border-amber-500/20";
      default:
        return "px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-blue-500/10 text-blue-400 border border-blue-500/20";
    }
  };

  const isOverdue = (dateStr: string, status: string) => {
    if (status === "completed") return false;
    return new Date(dateStr).getTime() < Date.now();
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const filteredTasks = taskList.filter((task) => {
    if (filter === "all") return true;
    if (filter === "urgent") return task.priority === "urgent";
    if (filter === "overdue") return isOverdue(task.dueDate, task.status);
    return task.status === filter;
  });

  return (
    <div className="glass-panel p-6 rounded-2xl shadow-2xl">
      <h2 className="text-xl font-bold text-white tracking-tight mb-5 flex items-center gap-2">
        <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        Student Tasks & Progress
      </h2>

      {/* Mini-dashboard of counts */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="bg-slate-900/40 border border-slate-800/40 rounded-xl p-3 text-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">Total</span>
          <span className="text-xl font-extrabold text-slate-200">{tasks.summary.total}</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-800/40 rounded-xl p-3 text-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">Todo</span>
          <span className="text-xl font-extrabold text-slate-400">{tasks.summary.todo}</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-800/40 rounded-xl p-3 text-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">In Progress</span>
          <span className="text-xl font-extrabold text-amber-400">{tasks.summary.inProgress}</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-800/40 rounded-xl p-3 text-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">Completed</span>
          <span className="text-xl font-extrabold text-emerald-400">{tasks.summary.completed}</span>
        </div>
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-3 text-center">
          <span className="text-[10px] text-rose-400 uppercase tracking-wider font-bold block mb-1">Urgent</span>
          <span className="text-xl font-extrabold text-rose-400">{tasks.urgentTasks}</span>
        </div>
        <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-3 text-center">
          <span className="text-[10px] text-orange-400 uppercase tracking-wider font-bold block mb-1">Overdue</span>
          <span className="text-xl font-extrabold text-orange-400">{tasks.overdueTasks}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4 mb-5">
        {(["all", "todo", "in_progress", "completed", "urgent", "overdue"] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              filter === opt
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                : "bg-slate-900/50 hover:bg-slate-900 text-slate-400 border border-slate-800/50"
            }`}
          >
            {opt.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Task Cards List */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm">
            No tasks match this filter.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const taskOverdue = isOverdue(task.dueDate, task.status);
            return (
              <div
                key={task.taskId}
                className={`p-4 rounded-xl border bg-slate-900/40 transition-all duration-200 ${
                  taskOverdue
                    ? "border-orange-500/20 hover:border-orange-500/40 shadow-sm shadow-orange-500/5"
                    : "border-slate-800/60 hover:border-slate-800"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm text-slate-100">{task.title}</h3>
                      {getPriorityBadge(task.priority)}
                      {taskOverdue && (
                        <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-orange-500 text-slate-950 animate-pulse">
                          Overdue
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
                  </div>

                  {/* Due date */}
                  <div className="text-right sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Due Date</span>
                    <span className={`text-xs font-semibold ${taskOverdue ? "text-orange-400" : "text-slate-300"}`}>
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>

                {/* Status Toggle buttons */}
                <div className="flex items-center justify-between border-t border-slate-800/40 pt-3 mt-3">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Status</span>
                  <div className="flex items-center gap-1">
                    {(["todo", "in_progress", "completed"] as const).map((st) => {
                      const isActive = task.status === st;
                      const getStatusStyles = () => {
                        if (!isActive) return "bg-slate-950 text-slate-500 hover:text-slate-300 hover:bg-slate-900";
                        if (st === "completed") return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
                        if (st === "in_progress") return "bg-amber-500/10 text-amber-400 border border-amber-500/30";
                        return "bg-slate-800 text-slate-200 border border-slate-700";
                      };

                      return (
                        <button
                          key={st}
                          disabled={updatingTaskId === task.taskId}
                          onClick={() => handleStatusChange(task.taskId, st)}
                          className={`px-2.5 py-1 text-[10px] rounded font-semibold uppercase tracking-wider transition-all duration-150 ${getStatusStyles()} ${
                            updatingTaskId === task.taskId ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {st === "in_progress" ? "In Progress" : st}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}