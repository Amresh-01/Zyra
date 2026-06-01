import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId.trim()) return;

    navigate(`/students/${studentId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Zyra Action Center
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            View Dashboard
          </button>
        </form>

        <div className="mt-6">
          <p className="font-semibold mb-2">Try:</p>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate("/students/stu_001")}
              className="border p-2 rounded"
            >
              stu_001
            </button>

            <button
              onClick={() => navigate("/students/stu_002")}
              className="border p-2 rounded"
            >
              stu_002
            </button>

            <button
              onClick={() => navigate("/students/stu_003")}
              className="border p-2 rounded"
            >
              stu_003
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}