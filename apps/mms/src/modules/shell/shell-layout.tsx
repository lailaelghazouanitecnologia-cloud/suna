import { Outlet } from "react-router-dom";

export function ShellLayout() {
  return (
    <div className="flex h-dvh bg-background text-foreground">
      {/* sidebar will go here in module 3 */}
      <aside className="hidden w-64 shrink-0 border-r border-border md:block">
        <div className="flex h-14 items-center px-4">
          <span className="text-sm font-semibold tracking-tight">MMS</span>
        </div>
        <nav className="px-2 py-4">
          <p className="px-2 text-xs text-muted-foreground">
            Sidebar — phase 3
          </p>
        </nav>
      </aside>

      {/* main content area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
