export default function InsightCard({ insights }: any) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-bold text-lg">
        Risk Assessment
      </h2>

      <p>Urgency Score: {insights.urgencyScore}</p>

      <p>Risk Level: {insights.riskLevel}</p>
    </div>
  );
}