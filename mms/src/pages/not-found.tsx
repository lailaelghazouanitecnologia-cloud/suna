import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-6xl font-bold text-muted-foreground/30">404</h1>
      <p className="text-sm text-muted-foreground">Page not found</p>
      <Link
        to="/"
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        Go home
      </Link>
    </div>
  );
}
