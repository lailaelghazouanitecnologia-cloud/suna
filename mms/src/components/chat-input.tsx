import { useRef, useState, useEffect, useCallback, type FormEvent } from "react";
import { Paperclip, CornerDownLeft } from "lucide-react";
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
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");

  // Typing animation for placeholder
  useEffect(() => {
    if (!animatePlaceholder) return;
    const target = PLACEHOLDERS[placeholderIdx] ?? PLACEHOLDERS[0]!;
    let currentIndex = 0;
    setAnimatedPlaceholder("");

    const typingInterval = setInterval(() => {
      if (currentIndex < target.length) {
        setAnimatedPlaceholder(target.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [animatePlaceholder, placeholderIdx]);

  // Cycle through placeholders
  useEffect(() => {
    if (!animatePlaceholder) return;
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [animatePlaceholder]);

  // Auto-resize textarea
  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.maxHeight = "200px";
    el.style.overflowY = el.scrollHeight > 200 ? "auto" : "hidden";
    const newHeight = Math.min(el.scrollHeight, 200);
    el.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || loading || disabled) return;
    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const hasContent = value.trim().length > 0;

  const activePlaceholder = animatePlaceholder
    ? animatedPlaceholder
    : (placeholder ?? PLACEHOLDERS[0]);

  return (
    <div className="shadow-none w-full max-w-4xl mx-auto bg-transparent overflow-visible py-0 pb-5 rounded-3xl relative z-10">
      <div className="w-full p-1.5 pb-2 bg-card border rounded-[24px]">
        {/* Textarea — matches legacy IsolatedTextarea classes */}
        <div className="flex flex-col gap-1 px-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={activePlaceholder}
            disabled={disabled}
            autoFocus={autoFocus}
            rows={1}
            className="w-full bg-transparent border-none shadow-none focus-visible:ring-0 focus:outline-none px-0.5 pb-6 pt-4 min-h-[100px] sm:min-h-[72px] max-h-[200px] !text-[16px] sm:!text-[15px] rounded-[24px] resize-none overflow-y-auto placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Controls — matches legacy layout */}
        <div className="flex items-center justify-between mt-0 mb-1 px-1.5 sm:px-2 gap-1 sm:gap-1.5">
          {/* Left — file upload */}
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-shrink overflow-visible">
            <button className="h-10 w-10 inline-flex items-center justify-center bg-transparent border-[1.5px] border-border rounded-2xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer">
              <Paperclip className="h-4 w-4" />
            </button>
          </div>

          {/* Right — submit */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => handleSubmit()}
              disabled={!hasContent || loading || disabled}
              className={cn(
                "flex-shrink-0 self-end border-[1.5px] border-border rounded-2xl w-10 h-10 inline-flex items-center justify-center transition-all duration-200 cursor-pointer",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <CornerDownLeft className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
