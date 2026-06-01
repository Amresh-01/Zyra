export default function TaskSummary({ tasks }: any) {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="font-bold text-lg">Tasks</h2>

      <p>Total: {tasks.summary.total}</p>
      <p>Todo: {tasks.summary.todo}</p>
      <p>In Progress: {tasks.summary.inProgress}</p>
      <p>Completed: {tasks.summary.completed}</p>
      <p>Urgent: {tasks.urgentTasks}</p>
      <p>Overdue: {tasks.overdueTasks}</p>
    </div>
  );
}