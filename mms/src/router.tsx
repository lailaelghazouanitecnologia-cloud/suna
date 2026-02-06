import { createBrowserRouter } from "react-router-dom";
import { AuthGuard, ShellLayout } from "@/modules/shell";

import AuthPage from "@/pages/auth";
import DashboardPage from "@/pages/dashboard";
import ThreadPage from "@/pages/thread";
import NotFoundPage from "@/pages/not-found";

export const router = createBrowserRouter([
  /* ── Public ── */
  { path: "/auth", element: <AuthPage /> },

  /* ── Protected (shell) ── */
  {
    element: (
      <AuthGuard>
        <ShellLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "thread/:threadId", element: <ThreadPage /> },

      /* future modules will register their routes here */
    ],
  },

  /* ── Catch-all ── */
  { path: "*", element: <NotFoundPage /> },
]);
