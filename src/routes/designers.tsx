import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Frame } from "@/components/frame";
import { designers } from "@/lib/data";

export const Route = createFileRoute("/designers")({
  head: () => ({
    meta: [
      { title: "Designers — Fermoso" },
      { name: "description", content: "Meet the Fermoso designers behind the seasonal edits." },
    ],
  }),
  component: DesignersPage,
});

function DesignersPage() {
  return (
    <Frame>
      <section className="px-4 py-8 md:px-8">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">The hands</p>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight">Designers</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Four editors. Four climates. One rail. Choose a name to see the pieces they cut.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {designers.map((designer) => (
            <Link
              key={designer.slug}
              to="/designers/$slug"
              params={{ slug: designer.slug }}
              className="group relative overflow-hidden rounded-[1.8rem]"
              style={{ background: designer.tint }}
            >
              <img src={designer.image} alt={designer.name} className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              <span className="absolute right-3 bottom-3 left-3 rounded-2xl bg-white p-3">
                <span className="flex items-center justify-between font-semibold">
                  {designer.name}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-on-red">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
                <span className="text-xs text-muted">
                  {designer.role} · {designer.city}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Frame>
  );
}
