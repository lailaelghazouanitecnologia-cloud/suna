import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, ThemeProvider } from "@/modules/shell";
import { router } from "./router";

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}
