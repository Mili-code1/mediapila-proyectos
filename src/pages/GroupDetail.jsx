import { useParams, Link, Navigate } from "react-router-dom";
import PathBar from "../components/PathBar";
import { groups, evaluacionComun } from "../data/groups";
import { ACCENTS } from "../data/accents";

const METHOD_STYLE = {
    GET: "text-[#2dd9ef] border-[#2dd9ef]/40 bg-[#0d2a30]",
    POST: "text-[#ff3fa4] border-[#ff3fa4]/40 bg-[#3a1428]",
    PUT: "text-[#9d6bff] border-[#9d6bff]/40 bg-[#241a3d]",
    PATCH: "text-[#9d6bff] border-[#9d6bff]/40 bg-[#241a3d]",
    DELETE: "text-[#f85149] border-[#f85149]/40 bg-[#3a1414]",
};

const FILES = [
    { id: "readme", label: "README.md" },
    { id: "modelo", label: "modelo-de-datos.md" },
    { id: "endpoints", label: "endpoints.md" },
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

    if (!group) return <Navigate to="/" replace />;

    const accent = ACCENTS[group.accent];

    return (
        <div className="min-h-screen">
            <PathBar
                crumbs={[
                    { label: "mediapila", to: "/" },
                    { label: "drive", to: "/" },
                    { label: "grupos" },
                    { label: group.slug },
                ]}
            />

            {/* header */}
            <header className="border-b border-[var(--color-border)]">
                <div className="mx-auto max-w-6xl px-6 py-12">
                    <Link
                        to="/"
                        className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text)]"
                    >
                        ← volver al drive
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
                        {FILES.map((f) => (
                            <li key={f.id}>
                                <a
                                    href={`#${f.id}`}
                                    className="block border-l-2 border-transparent py-1.5 pl-3 font-mono text-[13px] text-[var(--color-text-dim)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
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
        </div>
    );
}
