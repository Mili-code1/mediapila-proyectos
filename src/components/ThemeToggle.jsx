import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        () => document.documentElement.getAttribute("data-theme") || "dark"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("mediapila-theme", theme);
    }, [theme]);

    return (
        <button
            type="button"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)]
        bg-[var(--color-surface)] text-[var(--color-text-dim)] transition-colors
        hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
        >
            {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
        </button>
    );
}