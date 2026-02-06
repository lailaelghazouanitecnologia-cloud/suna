import { useParams } from "react-router-dom";

export default function ChatPage() {
  const { threadId } = useParams();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Chat</h1>
      <p className="text-sm text-muted-foreground">
        Thread: {threadId ?? "new"} — Module 2
      </p>
    </div>
  );
}
