import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame } from "@/components/frame";
import { articles, getArticle } from "@/lib/data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => ({ article: getArticle(params.slug) }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.article ? `${loaderData.article.title} — Fermoso` : "Journal — Fermoso",
      },
      {
        name: "description",
        content: loaderData?.article?.excerpt ?? "A note from the Fermoso journal.",
      },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  if (!article) {
    return (
      <Frame>
        <div className="px-6 py-20 text-center">
          <h1 className="text-3xl font-extrabold">That note is not on the desk.</h1>
          <Link to="/blog" className="pill pill-ink mt-4">
            All stories
          </Link>
        </div>
      </Frame>
    );
  }
  const more = articles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <Frame>
      <article className="mx-auto max-w-3xl px-4 py-8 md:px-0">
        <p className="text-xs text-muted">
          {article.date} · {article.author} · {article.comments} notes
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{article.title}</h1>
        <img src={article.image} alt="" className="mt-6 aspect-[16/9] w-full rounded-[1.8rem] object-cover" />
        <div className="mt-6 space-y-4 text-base leading-8">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
      <section className="px-4 py-8 md:px-8">
        <h2 className="text-2xl font-extrabold">Keep reading</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {more.map((item) => (
            <Link key={item.slug} to="/blog/$slug" params={{ slug: item.slug }} className="rounded-card border border-line p-4">
              <span className="font-semibold">{item.title}</span>
              <span className="mt-1 block text-sm text-muted">{item.excerpt}</span>
            </Link>
          ))}
        </div>
      </section>
    </Frame>
  );
}
