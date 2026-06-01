type Props = {
  student: any;
};

export default function StudentCard({ student }: Props) {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="text-xl font-bold">{student.name}</h2>

      <p>{student.email}</p>

      <p>Grade: {student.grade}</p>

      <p>GPA: {student.gpa}</p>

      <p>Status: {student.enrollmentStatus}</p>
    </div>
  );
}