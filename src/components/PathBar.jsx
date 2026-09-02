import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function PathBar({ crumbs }) {
    return (
        <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-4">
                <img
                    src="/logo-compacto.png"
                    alt="Mediapila"
                    className="mr-2 h-8 w-auto shrink-0"
                />
                <nav className="flex flex-1 items-center gap-1.5 font-mono text-[13px]">
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
                <ThemeToggle />
            </div>
        </div>
    );
}
