import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Code,
  Presentation,
  Table,
  FileText,
  PenTool,
  Bell,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatInput } from "@/components/chat-input";
import { mockModes } from "@/lib/mock-data";

const MODE_ICONS: Record<string, React.ReactNode> = {
  search: <Search className="h-4 w-4" />,
  code: <Code className="h-4 w-4" />,
  presentation: <Presentation className="h-4 w-4" />,
  table: <Table className="h-4 w-4" />,
  "file-text": <FileText className="h-4 w-4" />,
  "pen-tool": <PenTool className="h-4 w-4" />,
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleSubmit = (_value: string) => {
    navigate("/thread/t1");
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative">
      {/* Top bar: mode indicator + credits */}
      <div className="absolute flex items-center gap-1 left-3 sm:left-4 top-1.5 z-10">
        <div className="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg text-sm text-muted-foreground">
          {selectedMode && (
            <>
              {MODE_ICONS[mockModes.find((m) => m.id === selectedMode)?.icon ?? ""] ?? null}
              <span className="text-xs font-medium capitalize">{selectedMode}</span>
            </>
          )}
        </div>
      </div>

      <div className="absolute flex items-center gap-1 right-3 sm:right-4 top-1.5 z-10">
        <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-accent transition-colors text-muted-foreground">
          <Bell className="h-4 w-4" />
        </button>
        <button className="h-9 px-2.5 inline-flex items-center gap-1.5 rounded-lg hover:bg-accent transition-colors text-sm text-muted-foreground">
          <Coins className="h-4 w-4" />
          <span className="text-xs">250</span>
        </button>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col relative z-[1]">
        <div className="absolute inset-0 flex items-center justify-center px-4 pb-28 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center pointer-events-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight">
              {getGreeting()}
            </h1>

            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground/70">
              Choose a mode or describe what you need
            </p>

            {/* Mode pills */}
            <div className="mt-6 sm:mt-8 w-full">
              <div className="flex items-center justify-center flex-wrap gap-2">
                {mockModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(selectedMode === mode.id ? null : mode.id)}
                    className={cn(
                      "flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all text-sm font-medium",
                      selectedMode === mode.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background/80 border-border/60 hover:bg-accent hover:border-foreground/20",
                    )}
                  >
                    {MODE_ICONS[mode.icon]}
                    <span>{mode.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat input at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="w-full max-w-3xl mx-auto">
            <ChatInput onSubmit={handleSubmit} animatePlaceholder autoFocus />
          </div>
        </div>
      </div>
    </div>
  );
}
