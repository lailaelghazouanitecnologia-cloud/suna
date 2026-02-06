import { useParams } from "react-router-dom";
import { Upload, PanelRightOpen } from "lucide-react";
import { ChatInput } from "@/components/chat-input";
import { ThreadMessages } from "@/components/thread-messages";
import { mockMessages, mockThreads } from "@/lib/mock-data";

export default function ThreadPage() {
  const { threadId } = useParams();

  const messages = mockMessages[threadId ?? ""] ?? [];
  const thread = mockThreads.find((t) => t.id === threadId);

  const handleSubmit = (_value: string) => {
    // mock — no-op
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header — matches legacy: bg-background sticky top-0 z-20 h-12 sm:h-14 */}
      <header className="bg-background sticky top-0 z-20 w-full h-12 sm:h-14 flex-shrink-0">
        <div className="h-full flex items-center justify-between px-3 sm:px-4">
          {/* Left — project name */}
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <span className="text-sm font-medium text-muted-foreground truncate">
              {thread?.name ?? "Thread"}
            </span>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="h-9 px-2.5 inline-flex items-center gap-1.5 rounded-lg hover:bg-accent transition-colors cursor-pointer text-sm text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Share</span>
            </button>
            <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-accent transition-colors cursor-pointer text-muted-foreground">
              <PanelRightOpen className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <ThreadMessages messages={messages} />

      {/* Chat input — at bottom, matches legacy thread layout */}
      <div className="flex-shrink-0 relative bg-background px-4">
        <div className="w-full max-w-3xl mx-auto">
          <ChatInput onSubmit={handleSubmit} autoFocus />
        </div>
      </div>
    </div>
  );
}
