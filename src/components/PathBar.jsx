import { Link } from "react-router-dom";

export default function PathBar({ crumbs }) {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-4">
        <div className="mr-2 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#ff3fa4]" />
          <span className="h-2.5 w-2.5 rounded-sm bg-[#2dd9ef]" />
          <span className="h-2.5 w-2.5 rounded-sm bg-[#9d6bff]" />
        </div>
        <nav className="flex items-center gap-1.5 font-mono text-[13px]">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-[var(--color-text-faint)]">/</span>}
              {c.to ? (
                <Link
                  to={c.to}
                  className="text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-text)]"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-[var(--color-text)]">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
