import PathBar from "../components/PathBar";
import MosaicCard from "../components/MosaicCard";
import { groups } from "../data/groups";

export default function Home() {
    return (
        <div className="min-h-screen">
            <PathBar crumbs={[{ label: "mediapila" }, { label: "2C-2026" }]} />

            <main className="mx-auto max-w-6xl px-6 pb-24 pt-14">
                {/* hero */}
                <div className="mb-4 font-mono text-sm text-[var(--color-cyan)]">
                    $ ls grupos/ <span className="text-[var(--color-text-faint)]">— 8 resultados</span>
                </div>
                <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text)] sm:text-5xl">
                    Elegí tu grupo{" "}
                    <span className="bg-gradient-to-r from-[var(--color-magenta)] via-[var(--color-violet)] to-[var(--color-cyan)] bg-clip-text text-transparent">
                        para ver la especificación completa
                    </span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-dim)]">
                    Cada mosaico es la carpeta de un proyecto. Entrá al tuyo para ver la descripción, el
                    modelo de datos, los endpoints que tiene que exponer el backend y los criterios de
                    evaluación.
                </p>


                {/* grid */}
                <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {groups.map((g) => (
                        <MosaicCard key={g.id} group={g} />
                    ))}
                </div>
                
            </main>
        </div>
    );
}
