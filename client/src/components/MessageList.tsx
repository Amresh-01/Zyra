export default function MessageList({ messages }: any) {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="font-bold text-lg">
        Recent Messages
      </h2>

      {messages.map((msg: any) => (
        <div key={msg.messageId} className="mt-3">
          <h3>{msg.subject}</h3>
          <p>{msg.preview}</p>
        </div>
      ))}
    </div>
  );
}