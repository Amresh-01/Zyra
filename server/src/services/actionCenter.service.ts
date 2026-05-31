import { Student } from "../models/student.model";
import { Task } from "../models/Task.model";
import { Message } from "../models/Message.model";
import ApiError from "../utils/ApiError";

type RiskLevel = "low" | "medium" | "high" | "critical";

export const getActionCenterData = async (studentId: string) => {
  const [student, tasks, messages] = await Promise.all([
    Student.findOne({ studentId }).lean(),
    Task.find({ studentId }).lean(),
    Message.find({ studentId }).lean(),
  ]);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  const now = Date.now();

  let urgencyScore = 0;

  let overdueTasks = 0;

  for (const t of tasks) {
    if (t.status === "todo") urgencyScore += 1;
    if (t.status === "in_progress") urgencyScore += 0.5;

    if (t.priority === "urgent") urgencyScore += 3;
    else if (t.priority === "high") urgencyScore += 2;
    else if (t.priority === "medium") urgencyScore += 1;

    if (new Date(t.dueDate).getTime() < now && t.status !== "completed") {
      urgencyScore += 4;
      overdueTasks++;
    }
  }

  const taskSummary = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const urgentTasks = tasks.filter((t) => t.priority === "urgent").length;

  const unreadMessages = messages.filter((m) => !m.read).length;

  const recentMessages = messages
    .sort(
      (a, b) =>
        new Date(b.receivedAt).getTime() -
        new Date(a.receivedAt).getTime()
    )
    .slice(0, 5);

  let riskLevel: RiskLevel = "low";

  if (urgencyScore >= 15) riskLevel = "critical";
  else if (urgencyScore >= 10) riskLevel = "high";
  else if (urgencyScore >= 5) riskLevel = "medium";

  return {
    student: {
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      grade: student.grade,
      gpa: student.gpa,
      enrollmentStatus: student.enrollmentStatus,
    },

    tasks: {
      summary: taskSummary,
      urgentTasks,
      overdueTasks,
    },

    messages: {
      unread: unreadMessages,
      recent: recentMessages,
    },

    insights: {
      urgencyScore,
      riskLevel,
    },
  };
};