import { render, screen } from "@testing-library/react";
import StudentCard from "../components/StudentCard";

describe("StudentCard", () => {
  it("renders student information", () => {
    render(
      <StudentCard
        student={{
          studentId: "stu_001",
          name: "Maya Patel",
          email: "maya.patel@school.edu",
          grade: 11,
          gpa: 3.2,
          enrollmentStatus: "at_risk",
        }}
      />
    );

    expect(screen.getByText("Maya Patel")).toBeInTheDocument();
    expect(
      screen.getByText("maya.patel@school.edu")
    ).toBeInTheDocument();
  });
});