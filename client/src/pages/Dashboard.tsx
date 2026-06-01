import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActionCenter } from "../api/actionsCenter";
import StudentCard from "../components/StudentCard";
import InsightCard from "../components/InsightCard";
import MessageList from "../components/MessageList";
import TaskSummary from "../components/TaskSummary";

export default function Dashboard() {
  const { studentId } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (studentId) {
      getActionCenter(studentId).then(setData);
    }
  }, [studentId]);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Action Center Dashboard
      </h1>

      <StudentCard student={data.student} />
      <TaskSummary tasks={data.tasks} />
      <MessageList messages={data.messages.recent} />
      <InsightCard insights={data.insights} />
    </div>
  );
}