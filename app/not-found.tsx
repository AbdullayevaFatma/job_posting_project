import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        <div className="bg-surface border border-border rounded-xl p-8 sm:p-10 shadow-sm">
          <div className="mb-6">
            <span className="text-7xl sm:text-8xl font-bold text-accent">
              404
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Page not found
          </h1>

          <p className="text-muted leading-relaxed mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
            It may have been moved, deleted, or the URL might be incorrect.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-accent text-white font-medium hover:opacity-90 transition-opacity"
            >
              Go Home
            </Link>

            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-border bg-surface-hover text-foreground font-medium hover:opacity-80 transition-opacity"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
