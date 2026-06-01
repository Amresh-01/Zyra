type Message = {
  messageId: string;
  from: string;
  subject: string;
  preview: string;
  read: boolean;
  receivedAt: string;
};

type Props = {
  messages: Message[];
  unreadCount: number;
};

export default function MessageList({ messages, unreadCount }: Props) {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl shadow-2xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          Recent Communications
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-extrabold rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 animate-pulse">
              {unreadCount} New
            </span>
          )}
        </h2>
      </div>

      <div className="flex-grow overflow-y-auto space-y-3 max-h-[360px] pr-1">
        {messages.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm">
            No recent messages.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.messageId}
              className={`p-4 rounded-xl border transition-all duration-200 relative ${
                msg.read
                  ? "bg-slate-900/30 border-slate-900 hover:border-slate-800 text-slate-300"
                  : "bg-slate-900/80 border-indigo-500/20 hover:border-indigo-500/40 text-white shadow-md shadow-indigo-500/5"
              }`}
            >
              {/* Unread indicator bar */}
              {!msg.read && (
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-l-xl"></div>
              )}

              <div className="flex justify-between items-start gap-2 mb-1.5 pl-1">
                <div>
                  <span className={`font-semibold text-sm ${!msg.read ? "text-indigo-300 font-bold" : "text-slate-200"}`}>
                    {msg.from}
                  </span>
                  <h3 className="text-xs text-slate-400 font-medium truncate mt-0.5">
                    {msg.subject}
                  </h3>
                </div>
                <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
                  {formatDate(msg.receivedAt)}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pl-1">
                {msg.preview}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}