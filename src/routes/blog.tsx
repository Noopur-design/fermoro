import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, MessageCircle } from "lucide-react";
import { Frame } from "@/components/frame";
import { articles } from "@/lib/data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Fermoso" },
      { name: "description", content: "Fermoso journal: notes on cloth, city dressing, and the edit." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <Frame>
      <section className="px-4 py-8 md:px-8">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">Notes</p>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight">Fermoso journal</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.slug} className="overflow-hidden rounded-[1.8rem] border border-line">
              <Link to="/blog/$slug" params={{ slug: article.slug }}>
                <img src={article.image} alt="" className="aspect-[16/10] w-full object-cover" />
              </Link>
              <div className="p-5">
                <h2 className="text-2xl font-bold tracking-tight">
                  <Link to="/blog/$slug" params={{ slug: article.slug }}>
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">{article.excerpt}</p>
                <div className="mt-3 flex gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" /> {article.comments}
                  </span>
                </div>
                <Link to="/blog/$slug" params={{ slug: article.slug }} className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-on-red">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  Continue reading
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Frame>
  );
}
