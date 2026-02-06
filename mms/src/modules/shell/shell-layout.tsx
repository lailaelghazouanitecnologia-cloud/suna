import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/sidebar";

export function ShellLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-dvh bg-background text-foreground overflow-hidden">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      {/* main content area */}
      <main className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
