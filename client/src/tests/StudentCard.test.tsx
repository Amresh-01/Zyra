
import { render, screen } from "@testing-library/react";
import StudentCard from "../components/StudentCard";

describe("StudentCard", () => {
  it("renders student information", () => {
    render(
      <StudentCard
        student={{
          name: "Maya Patel",
          email: "maya@test.com",
          grade: 11,
          gpa: 3.2,
          enrollmentStatus: "at_risk",
        }}
      />
    );

    expect(
      screen.getByText("Maya Patel")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Grade:/)
    ).toBeInTheDocument();
  });
});