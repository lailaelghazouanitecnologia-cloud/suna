import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Code,
  Presentation,
  BarChart3,
  FileText,
  Palette,
  Bell,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatInput } from "@/components/chat-input";

type ModeType = "research" | "slides" | "data" | "docs" | "canvas" | "code";

interface Mode {
  id: ModeType;
  label: string;
  icon: React.ReactNode;
}

const modes: Mode[] = [
  { id: "slides", label: "Slides", icon: <Presentation className="w-4 h-4" strokeWidth={2} /> },
  { id: "data", label: "Data", icon: <BarChart3 className="w-4 h-4" strokeWidth={2} /> },
  { id: "docs", label: "Docs", icon: <FileText className="w-4 h-4" strokeWidth={2} /> },
  { id: "canvas", label: "Canvas", icon: <Palette className="w-4 h-4" strokeWidth={2} /> },
  { id: "research", label: "Research", icon: <Search className="w-4 h-4" strokeWidth={2} /> },
  { id: "code", label: "Code", icon: <Code className="w-4 h-4" strokeWidth={2} /> },
];

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
    <div className="flex flex-col h-screen w-full overflow-hidden relative">
      {/* Left side — Mode indicator (absolute) */}
      <div className="absolute flex items-center gap-1 left-3 sm:left-4 top-1.5 z-10">
        <div className="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg text-sm text-muted-foreground">
          {selectedMode && (
            <>
              {modes.find((m) => m.id === selectedMode)?.icon ?? null}
              <span className="text-xs font-medium capitalize">{selectedMode}</span>
            </>
          )}
        </div>
      </div>

      {/* Right side — Notifications & Credits (absolute) */}
      <div className="absolute flex items-center gap-1 right-3 sm:right-4 top-1.5 z-10">
        <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-accent transition-colors text-muted-foreground">
          <Bell className="h-4 w-4" />
        </button>
        <button className="h-9 px-2.5 inline-flex items-center gap-1.5 rounded-lg hover:bg-accent transition-colors text-sm text-muted-foreground">
          <Coins className="h-4 w-4" />
          <span className="text-xs">250</span>
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col relative z-[1]">
        {/* Centered content: Greeting + Subtitle + Mode pills
            Mobile: shifted up with pb-28, Desktop: true center */}
        <div className="absolute inset-0 flex items-center justify-center px-4 pb-28 sm:pb-0 pointer-events-none">
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center pointer-events-auto">
            {/* Greeting */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight">
              {getGreeting()}
            </h1>

            {/* Subtitle */}
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground/70">
              Choose a mode or describe what you need
            </p>

            {/* Mode pills — matches legacy suna-modes-panel:
                grid on mobile, inline-flex on desktop
                rounded-2xl h-10 border-[1.5px] */}
            <div className="mt-6 sm:mt-8 w-full">
              <div className="flex items-center justify-center">
                <div className="w-full grid grid-cols-3 gap-2 sm:w-auto sm:inline-flex sm:gap-2">
                  {modes.map((mode) => {
                    const isActive = selectedMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setSelectedMode(isActive ? null : mode.id)}
                        className={cn(
                          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium",
                          "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "relative h-10 px-3 sm:px-4 gap-2 shrink-0 rounded-2xl cursor-pointer",
                          "border-[1.5px] transition-all duration-200",
                          isActive
                            ? "bg-muted text-foreground border-border font-medium"
                            : "bg-background/50 border-border/40 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted dark:bg-card/30 dark:hover:bg-muted",
                        )}
                      >
                        <span className="transition-colors duration-200 [&>svg]:w-4 [&>svg]:h-4">
                          {mode.icon}
                        </span>
                        <span className="transition-colors duration-200">
                          {mode.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat input — fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="w-full max-w-3xl mx-auto">
            <ChatInput onSubmit={handleSubmit} animatePlaceholder autoFocus />
          </div>
        </div>
      </div>
    </div>
  );
}
