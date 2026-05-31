import { Student } from "../models/Student.ts";
import { Task } from "../models/Task";
import { Message } from "../models/Message";

type RiskLevel = "low" | "medium" | "high" | "critical";

export const getActionCenterData = async (studentId: string) => {  
  const student = await Student.findOne({ studentId });
  const tasks = await Task.find({ studentId });
  const messages = await Message.find({ studentId });

  if (!student) {
    throw new Error("Student not found");
  }

  const taskSummary = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const urgentTasks = tasks.filter(
    (t) => t.priority === "urgent"
  ).length;

  const overdueTasks = tasks.filter((t) => {
    return (
      new Date(t.dueDate).getTime() < Date.now() &&
      t.status !== "completed"
    );
  }).length;


  const unreadMessages = messages.filter((m) => !m.read).length;

  const recentMessages = messages
    .sort(
      (a, b) =>
        new Date(b.receivedAt).getTime() -
        new Date(a.receivedAt).getTime()
    )
    .slice(0, 5);


  let urgencyScore = 0;

  urgencyScore += urgentTasks * 3;
  urgencyScore += overdueTasks * 4;
  urgencyScore += unreadMessages * 1;


  let riskLevel: RiskLevel = "low";

  if (urgencyScore >= 15) {
    riskLevel = "critical";
  } else if (urgencyScore >= 10) {
    riskLevel = "high";
  } else if (urgencyScore >= 5) {
    riskLevel = "medium";
  }

 
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