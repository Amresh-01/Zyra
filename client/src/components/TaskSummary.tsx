
type Props = {
  summary: {
    total: number;
    todo: number;
    inProgress: number;
    completed: number;
  };
  urgentTasks: number;
  overdueTasks: number;
};

export default function TaskSummary({
  summary,
  urgentTasks,
  overdueTasks,
}: Props) {
  return (
    <div className="glass-panel p-6 rounded-2xl shadow-2xl">
      <h2 className="text-xl font-bold text-white tracking-tight mb-6">
        Student Task Overview
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-xs uppercase mb-2">Total Tasks</p>
          <p className="text-3xl font-bold text-white">
            {summary.total}
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-xs uppercase mb-2">Todo</p>
          <p className="text-3xl font-bold text-slate-300">
            {summary.todo}
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-xs uppercase mb-2">
            In Progress
          </p>
          <p className="text-3xl font-bold text-amber-400">
            {summary.inProgress}
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-xs uppercase mb-2">
            Completed
          </p>
          <p className="text-3xl font-bold text-emerald-400">
            {summary.completed}
          </p>
        </div>

        <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4">
          <p className="text-rose-400 text-xs uppercase mb-2">
            Urgent Tasks
          </p>
          <p className="text-3xl font-bold text-rose-400">
            {urgentTasks}
          </p>
        </div>

        <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
          <p className="text-orange-400 text-xs uppercase mb-2">
            Overdue Tasks
          </p>
          <p className="text-3xl font-bold text-orange-400">
            {overdueTasks}
          </p>
        </div>
      </div>
    </div>
  );
}