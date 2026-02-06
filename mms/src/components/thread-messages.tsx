import { useEffect, useRef } from "react";
import type { MockMessage } from "@/lib/mock-data";

interface ThreadMessagesProps {
  messages: MockMessage[];
}

export function ThreadMessages({ messages }: ThreadMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (messages.length === 0) return null;

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 pb-0 bg-background min-h-0">
      <div className="mx-auto max-w-3xl min-w-0 w-full px-3 sm:px-6">
        <div className="space-y-6 min-w-0">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <UserBubble key={msg.id} content={msg.content} />
            ) : (
              <AssistantBubble key={msg.id} content={msg.content} />
            ),
          )}
        </div>
        <div ref={bottomRef} className="h-8" />
      </div>
    </div>
  );
}

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="flex max-w-[90%] rounded-3xl rounded-br-lg bg-card border px-4 py-3 break-words overflow-hidden">
        <div className="space-y-2 min-w-0 flex-1">
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
}

function AssistantBubble({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Agent header */}
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-sm bg-foreground shrink-0" />
        <span className="text-xs font-medium text-muted-foreground">Assistant</span>
      </div>

      <div className="flex w-full break-words">
        <div className="space-y-1.5 min-w-0 flex-1">
          {content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
