import { Link } from "react-router-dom";
import { DiGithubAlt } from "react-icons/di";
import { ACCENTS } from "../data/accents";

const BORDER_GRADIENT =
    "linear-gradient(135deg, #ff3fa4, #9d6bff 55%, #2dd9ef)";

export default function MosaicCard({ group }) {
    const accent = ACCENTS[group.accent];

    return (
        <Link
            to={`/grupo/${group.slug}`}
            className={`group relative block rounded-2xl p-[1.5px] transition-transform duration-200 hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 ${accent.ring} focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]`}
            style={{ backgroundImage: BORDER_GRADIENT }}
        >
            <div className="flex h-full flex-col gap-4 rounded-[15px] bg-[var(--color-surface)] p-5">
                <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-2)]">
                        <DiGithubAlt size={22} color={accentVar(group.accent)} />
                    </span>
                    <h3 className="font-mono text-base font-extrabold uppercase tracking-tight text-[var(--color-text)]">
                        Grupo {group.numero}
                    </h3>
                </div>

                <div>
                    <p className={`font-mono text-[11px] font-bold uppercase tracking-wide ${accent.text}`}>
                        Proyecto: {group.name}
                    </p>
                </div>

                <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                    {group.tagline}
                </p>

                <div className="mt-auto flex justify-end pt-2">
                    <span className={`inline-flex items-center gap-1 font-mono text-xs font-semibold ${accent.text}`}>
                        Ver detalles
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}

function accentVar(accent) {
    return `var(--color-${accent})`;
}