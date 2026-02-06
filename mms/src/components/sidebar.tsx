import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Plus,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  MessageCircle,
  Users,
  Zap,
  FolderOpen,
  ChevronsUpDown,
  LogOut,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUser, mockThreads } from "@/lib/mock-data";
import { useTheme } from "@/modules/shell/theme-provider";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

type View = "chats" | "workers" | "triggers";

export function AppSidebar({ collapsed, onToggle }: SidebarProps) {
  const [activeView, setActiveView] = useState<View>("chats");
  const location = useLocation();
  const { theme, setTheme, resolved } = useTheme();
  const isOnFiles = location.pathname === "/files";

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-border/50 bg-background shrink-0 h-dvh transition-[width] duration-300 ease-out",
        collapsed ? "w-[52px]" : "w-[280px]",
      )}
    >
      {/* ── Header ── */}
      <div className="pt-4 overflow-visible">
        <div className="relative flex h-[32px] items-center">
          {/* Logo */}
          <div className={cn("absolute flex items-center justify-center group/logo", "left-6")}>
            <Link to="/" className="flex items-center justify-center">
              <div
                className={cn(
                  "h-5 w-5 rounded-sm bg-foreground flex-shrink-0 transition-[transform,opacity] duration-300 ease-out hover:rotate-180 hover:duration-700",
                  collapsed && "group-hover/logo:opacity-0 group-hover/logo:scale-90",
                )}
              />
            </Link>
            {collapsed && (
              <button
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer opacity-0 scale-75 group-hover/logo:opacity-100 group-hover/logo:scale-100 transition-[opacity,transform] duration-300 ease-out"
                onClick={onToggle}
              >
                <PanelLeftOpen className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Right buttons */}
          <div
            className={cn(
              "absolute right-6 flex items-center gap-1 transition-[opacity] duration-300 ease-out",
              collapsed ? "opacity-0 pointer-events-none" : "opacity-100",
            )}
          >
            <button className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-accent transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
              onClick={onToggle}
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative flex-1 overflow-hidden">
        {/* Collapsed view */}
        <div
          className={cn(
            "absolute inset-0 px-6 pt-4 space-y-3 flex flex-col items-center transition-opacity duration-150 ease-out",
            collapsed ? "opacity-100 pointer-events-auto delay-100" : "opacity-0 pointer-events-none",
          )}
        >
          <Link
            to="/"
            className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <Plus className="h-4 w-4" />
          </Link>
          <Link
            to="/files"
            className={cn(
              "h-10 w-10 inline-flex items-center justify-center rounded-lg hover:bg-accent transition-colors",
              isOnFiles && "bg-card border-[1.5px] border-border",
            )}
          >
            <FolderOpen className="h-4 w-4" />
          </Link>
          <div className="flex flex-col items-center space-y-3">
            {([
              { view: "chats" as View, icon: MessageCircle },
              { view: "workers" as View, icon: Users },
              { view: "triggers" as View, icon: Zap },
            ] as const).map(({ view, icon: Icon }) => (
              <button
                key={view}
                className={cn(
                  "h-10 w-10 inline-flex items-center justify-center rounded-lg cursor-pointer hover:bg-card hover:border-[1.5px] hover:border-border transition-colors",
                  activeView === view && "bg-card border-[1.5px] border-border",
                )}
                onClick={() => { setActiveView(view); onToggle(); }}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Expanded view */}
        <div
          className={cn(
            "flex flex-col h-full transition-opacity duration-150 ease-out",
            collapsed ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto delay-100",
          )}
        >
          <div className="px-6 pt-4 space-y-4">
            {/* New Chat */}
            <Link
              to="/"
              className="w-full h-10 px-3 inline-flex items-center justify-between rounded-lg border border-border text-sm hover:bg-accent transition-colors group/new-chat"
            >
              <span className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Chat
              </span>
              <span className="flex items-center gap-1 opacity-0 group-hover/new-chat:opacity-100 transition-opacity text-xs text-muted-foreground">
                <kbd className="px-1 py-0.5 rounded bg-muted text-[10px]">⌘</kbd>
                <kbd className="px-1 py-0.5 rounded bg-muted text-[10px]">J</kbd>
              </span>
            </Link>

            {/* Files link */}
            <Link
              to="/files"
              className={cn(
                "w-full h-10 px-3 inline-flex items-center gap-2 rounded-lg text-sm transition-colors hover:text-foreground",
                isOnFiles ? "bg-card border-[1.5px] border-border text-foreground" : "text-muted-foreground",
              )}
            >
              <FolderOpen className="h-4 w-4" />
              Files
            </Link>

            {/* View tabs */}
            <div className="flex justify-between items-center gap-2">
              {([
                { view: "chats" as View, icon: MessageCircle, label: "Chats" },
                { view: "workers" as View, icon: Users, label: "Workers" },
                { view: "triggers" as View, icon: Zap, label: "Triggers" },
              ] as const).map(({ view, icon: Icon, label }) => (
                <button
                  key={view}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-1.5 rounded-2xl cursor-pointer transition-colors w-[64px] h-[64px]",
                    "hover:bg-muted/60 hover:border-[1.5px] hover:border-border",
                    activeView === view
                      ? "bg-card border-[1.5px] border-border"
                      : "border-[1.5px] border-transparent",
                  )}
                  onClick={() => setActiveView(view)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Thread list */}
          <div className="px-6 flex-1 overflow-y-auto mt-2 scrollbar-hide">
            {activeView === "chats" && (
              <div className="space-y-0.5">
                {mockThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    to={`/thread/${thread.id}`}
                    className={cn(
                      "flex flex-col gap-0.5 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-accent",
                      location.pathname === `/thread/${thread.id}` && "bg-accent",
                    )}
                  >
                    <span className="truncate text-foreground">{thread.name}</span>
                    <span className="text-xs text-muted-foreground">{thread.updatedAt}</span>
                  </Link>
                ))}
              </div>
            )}
            {activeView === "workers" && (
              <p className="px-3 py-6 text-xs text-muted-foreground text-center">No workers yet</p>
            )}
            {activeView === "triggers" && (
              <p className="px-3 py-6 text-xs text-muted-foreground text-center">No triggers yet</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer: User ── */}
      <div className={cn("px-6 pb-4", collapsed && "px-2")}>
        <div
          className={cn(
            "flex items-center border-[1.5px] border-border rounded-lg transition-all",
            collapsed ? "h-10 w-10 mx-auto justify-center p-0" : "h-[64px] p-3 gap-3",
          )}
        >
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm font-medium">
            {mockUser.name.charAt(0)}
          </div>
          {!collapsed && (
            <>
              <div className="flex flex-col justify-between flex-1 min-w-0 h-10">
                <span className="truncate font-medium text-sm leading-tight">{mockUser.name}</span>
                <span className="text-xs text-muted-foreground leading-tight">{mockUser.plan}</span>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
