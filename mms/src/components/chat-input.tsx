import { useRef, useState, useEffect, type FormEvent } from "react";
import { Paperclip, Mic, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  animatePlaceholder?: boolean;
}

const PLACEHOLDERS = [
  "Describe what you need...",
  "Analyze data and build dashboards...",
  "Create a landing page...",
  "Write documentation...",
  "Debug and fix issues...",
];

export function ChatInput({
  onSubmit,
  placeholder,
  loading = false,
  disabled = false,
  autoFocus = false,
  animatePlaceholder = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  useEffect(() => {
    if (!animatePlaceholder) return;
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [animatePlaceholder]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || loading || disabled) return;
    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const activePlaceholder = animatePlaceholder
    ? PLACEHOLDERS[placeholderIdx]
    : (placeholder ?? PLACEHOLDERS[0]);

  return (
    <div className="shadow-none w-full max-w-4xl mx-auto bg-transparent overflow-visible py-0 pb-5 rounded-3xl relative z-10">
      <div className="w-full p-1.5 pb-2 bg-card border rounded-[24px]">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={activePlaceholder}
          disabled={disabled}
          autoFocus={autoFocus}
          rows={1}
          className="w-full bg-transparent border-none shadow-none focus-visible:ring-0 focus:outline-none px-3 pb-6 pt-4 min-h-[72px] max-h-[200px] text-[15px] rounded-[24px] resize-none overflow-y-auto placeholder:text-muted-foreground/60"
        />

        {/* Controls */}
        <div className="flex items-center justify-between mt-0 mb-1 px-1.5 sm:px-2 gap-1 sm:gap-1.5">
          {/* Left */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button className="h-10 w-10 inline-flex items-center justify-center bg-transparent border-[1.5px] border-border rounded-2xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer">
              <Paperclip className="h-4 w-4" />
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button className="h-10 w-10 inline-flex items-center justify-center bg-transparent border-[1.5px] border-border rounded-2xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer">
              <Mic className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleSubmit()}
              disabled={!value.trim() || loading || disabled}
              className={cn(
                "h-10 w-10 inline-flex items-center justify-center border-[1.5px] rounded-2xl transition-all duration-200 cursor-pointer",
                value.trim()
                  ? "bg-primary text-primary-foreground border-primary hover:opacity-90"
                  : "bg-transparent border-border text-muted-foreground",
              )}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
