import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PathBar from "../components/PathBar";
import { groups, evaluacionComun } from "../data/groups";
import { ACCENTS } from "../data/accents";


const METHOD_STYLE = {
    GET: "text-[var(--color-cyan)] border-[var(--color-cyan)] bg-[var(--color-cyan-dim)]",
    POST: "text-[var(--color-magenta)] border-[var(--color-magenta)] bg-[var(--color-magenta-dim)]",
    PUT: "text-[var(--color-violet)] border-[var(--color-violet)] bg-[var(--color-violet-dim)]",
    PATCH: "text-[var(--color-violet)] border-[var(--color-violet)] bg-[var(--color-violet-dim)]",
    DELETE: "text-[var(--color-danger)] border-[var(--color-danger)] bg-[var(--color-danger-dim)]",
};

const BASE_FILES = [
    { id: "readme", label: "README.md" },
    { id: "modelo", label: "modelo-de-datos.md" },
    { id: "endpoints", label: "endpoints.md" },
    { id: "ideas", label: "ideas.md" },
    { id: "entregables", label: "entregables.md" },
    { id: "evaluacion", label: "evaluacion.md" },
];

function Section({ id, title, children }) {
    return (
        <section id={id} className="scroll-mt-24 border-b border-[var(--color-border)] py-10 first:pt-0 last:border-b-0">
            <h2 className="mb-5 font-mono text-lg font-bold text-[var(--color-text)]">{title}</h2>
            {children}
        </section>
    );
}

export default function GroupDetail() {
    const { slug } = useParams();
    const group = groups.find((g) => g.slug === slug);
    const hasIdeas = group?.ideas && group.ideas.length > 0;
    const files = useMemo(
        () =>
            group
                ? hasIdeas
                    ? BASE_FILES
                    : BASE_FILES.filter((f) => f.id !== "ideas")
                : [],
        [group, hasIdeas]
    );
    const [activeId, setActiveId] = useState(files[0]?.id);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // fondo sólido en las páginas de detalle: la foto de fondo queda solo en el Home
    useEffect(() => {
        document.body.classList.add("solid-bg");
        return () => document.body.classList.remove("solid-bg");
    }, []);

    // muestra el botón de volver arriba después de scrollear un poco
    useEffect(() => {
        const onScroll = () => setShowScrollTop(window.scrollY > 500);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // resalta en el sidebar la sección que se está leyendo
    useEffect(() => {
        const sectionEls = files
            .map((f) => document.getElementById(f.id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
        );

        sectionEls.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [files]);

    if (!group) return <Navigate to="/" replace />;

    const accent = ACCENTS[group.accent];

    return (
        <div className="min-h-screen">
            <PathBar
                crumbs={[
                    { label: "mediapila", to: "/" },
                    { label: "grupos" },
                    { label: group.slug },
                ]}
            />

            {/* header */}
            <header className="border-b border-[var(--color-border)]">
                <div className="mx-auto max-w-6xl px-6 py-12">
                    <Link
                        to="/"
                        className={`group relative mb-6 inline-flex w-fit items-center gap-1.5 font-mono text-xs font-semibold ${accent.text}`}
                    >
                        <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-x-1">
                            ←
                        </span>
                        <span className="relative">
                            volver atrás
                            <span
                                className={`absolute -bottom-0.5 left-0 h-px w-0 ${accent.bg} transition-all duration-200 ease-out group-hover:w-full`}
                            />
                        </span>
                    </Link>
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="font-mono text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
                            {group.name}
                        </h1>
                        <span
                            className={`rounded-full border ${accent.border} ${accent.dim} px-2.5 py-0.5 font-mono text-[11px] font-semibold ${accent.text}`}
                        >
                            requiere backend
                        </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-base text-[var(--color-text-dim)]">{group.tagline}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {group.stack.map((s) => (
                            <span
                                key={s}
                                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-text-dim)]"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            {/* body: sidebar + content */}
            <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
                <aside className="sticky top-10 hidden h-fit w-52 shrink-0 md:block">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-faint)]">
                        archivos
                    </p>
                    <ul className="space-y-0.5 border-l border-[var(--color-border)]">
                        {files.map((f) => (
                            <li key={f.id}>
                                <a
                                    href={`#${f.id}`}
                                    className={`block border-l-2 py-1.5 pl-3 font-mono text-[13px] transition-colors ${activeId === f.id
                                        ? `${accent.border} ${accent.text} font-semibold`
                                        : "border-transparent text-[var(--color-text-dim)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
                                        }`}
                                >
                                    {f.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="min-w-0 flex-1">
                    <Section id="readme" title="Descripción">
                        <p className="mb-6 max-w-3xl leading-relaxed text-[var(--color-text-dim)]">
                            {group.description}
                        </p>
                        <p className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
                            Funcionalidades
                        </p>
                        <ul className="space-y-2">
                            {group.funcionalidades.map((f, i) => (
                                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-dim)]">
                                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.bg}`} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section id="modelo" title="Modelo de datos">
                        <div className="space-y-5">
                            {group.modelos.map((m) => (
                                <div
                                    key={m.nombre}
                                    className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
                                >
                                    <div className="border-b border-[var(--color-border)] px-4 py-2 font-mono text-sm font-semibold text-[var(--color-text)]">
                                        {m.nombre}
                                    </div>
                                    <div className="px-4 py-3">
                                        {m.campos.map((c, i) => (
                                            <div key={i} className="py-1 font-mono text-[13px] text-[var(--color-text-dim)]">
                                                <span className="text-[var(--color-text-faint)]">·</span> {c}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section id="endpoints" title="Endpoints requeridos">
                        <div className="overflow-hidden rounded-lg border border-[var(--color-border)]">
                            {group.endpoints.map((e, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col gap-1 border-[var(--color-border)] px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${i !== group.endpoints.length - 1 ? "border-b" : ""
                                        } ${i % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-[var(--color-surface-2)]"}`}
                                >
                                    <span
                                        className={`w-fit shrink-0 rounded border px-2 py-0.5 font-mono text-[11px] font-bold ${METHOD_STYLE[e.metodo] || METHOD_STYLE.GET
                                            }`}
                                    >
                                        {e.metodo}
                                    </span>
                                    <code className="shrink-0 font-mono text-sm text-[var(--color-text)]">{e.ruta}</code>
                                    <span className="text-sm text-[var(--color-text-dim)]">{e.desc}</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {hasIdeas && (
                        <Section id="ideas" title="Ideas de desarrollo">
                            <p className="mb-4 text-sm text-[var(--color-text-dim)]">
                                Elegí UNA de estas ideas para desarrollar el proyecto — la elección tiene que
                                quedar reflejada en el código y en el README.
                            </p>
                            <div className="space-y-4">
                                {group.ideas.map((idea, i) => (
                                    <div
                                        key={idea.id}
                                        className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
                                    >
                                        <div
                                            className={`flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2.5 ${i % 3 === 0
                                                ? "border-l-2 border-l-[var(--color-magenta)]"
                                                : i % 3 === 1
                                                    ? "border-l-2 border-l-[var(--color-cyan)]"
                                                    : "border-l-2 border-l-[var(--color-violet)]"
                                                }`}
                                        >
                                            <span className="font-mono text-[11px] text-[var(--color-text-faint)]">
                                                {idea.id}
                                            </span>
                                        </div>
                                        <div className="px-4 py-3">
                                            <h3 className="mb-1.5 font-mono text-sm font-bold text-[var(--color-text)]">
                                                {idea.titulo}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                                                {idea.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    <Section id="entregables" title="Entregables">
                        <ul className="space-y-2">
                            {group.entregables.map((e, i) => (
                                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-dim)]">
                                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.bg}`} />
                                    {e}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section id="evaluacion" title="Criterios de evaluación">
                        <p className="mb-4 text-sm text-[var(--color-text-dim)]">
                            Aplican a todos los grupos por igual, más allá del dominio del proyecto:
                        </p>
                        <ul className="space-y-2">
                            {evaluacionComun.map((c, i) => (
                                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-dim)]">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text-faint)]" />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </Section>
                </div>
            </div>

            <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Volver arriba"
                className={`fixed bottom-6 right-6 z-50 hidden h-12 w-12 items-center justify-center rounded-full border ${accent.border}
                bg-[var(--color-surface)] ${accent.text} shadow-lg transition-all duration-200 ease-out
                hover:-translate-y-0.5 hover:${accent.glow} sm:flex
                ${showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 19V5M12 5L6 11M12 5L18 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}