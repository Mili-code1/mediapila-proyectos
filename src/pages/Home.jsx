import PathBar from "../components/PathBar";
import MosaicCard from "../components/MosaicCard";
import { groups } from "../data/groups";

export default function Home() {
    return (
        <div className="min-h-screen">
            <PathBar crumbs={[{ label: "mediapila" }, { label: "2C-2026" }]} />

            <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 md:pt-8">
                {/* hero */}
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 font-mono text-lg text-[var(--color-text-dim)]">
                            $ ls grupos/ <span className="text-[var(--color-text-faint)]">— {groups.length} resultados</span>
                        </div>
                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text)] sm:text-5xl">
                            Elegí tu grupo{" "}
                            <span className="bg-gradient-to-r from-[var(--color-accent-1)] via-[var(--color-accent-3)] to-[var(--color-accent-2)] bg-clip-text text-transparent">
                                para ver la especificación completa
                            </span>
                        </h1>
                        <p className="mt-5 text-base leading-relaxed text-[var(--color-text-dim)]">
                            Cada mosaico es la carpeta de un proyecto. Entrá al tuyo para ver la descripción, el
                            modelo de datos, los endpoints que tiene que exponer el backend y los criterios de
                            evaluación.
                        </p>
                    </div>

                    <img
                        src="/pc-mediapila.png"
                        alt="Mediapila"
                        className="hidden w-56 shrink-0 sm:w-72 lg:block lg:w-96"
                    />
                </div>

                {/* grid */}
                <div className="mt-14 flex flex-wrap justify-center gap-4 md:mt-2">
                    {groups.map((g) => (
                        <div
                            key={g.id}
                            className="w-full sm:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_3rem)/4)]"
                        >
                            <MosaicCard group={g} />
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
