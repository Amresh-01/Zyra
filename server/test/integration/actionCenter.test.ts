import request from "supertest";
import app from "../../app";

jest.mock("../../src/services/actionCenter.service", () => ({
  getActionCenterData: jest.fn().mockResolvedValue({
    student: {
      studentId: "stu_001",
      name: "Maya Patel",
      email: "maya.patel@school.edu",
      grade: 11,
      gpa: 3.2,
      enrollmentStatus: "at_risk",
    },

    tasks: {
      summary: {
        total: 5,
        todo: 3,
        inProgress: 1,
        completed: 1,
      },
      urgentTasks: 2,
      overdueTasks: 1,
    },

    messages: {
      unread: 2,
      recent: [],
    },

    insights: {
      urgencyScore: 18.5,
      riskLevel: "critical",
    },
  }),
}));

describe("GET /action-center", () => {
  it("should return action center data", async () => {
    const response = await request(app).get(
      "/api/students/action-center/stu_001"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data.student.studentId).toBe(
      "stu_001"
    );

    expect(response.body.data.tasks).toBeDefined();
    expect(response.body.data.messages).toBeDefined();

    expect(response.body.data.insights.riskLevel).toBe(
      "critical"
    );
  });
});