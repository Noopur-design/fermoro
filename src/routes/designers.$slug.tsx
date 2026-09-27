import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame } from "@/components/frame";
import { ProductCard } from "@/components/product-card";
import { getDesigner, products } from "@/lib/data";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/designers/$slug")({
  loader: ({ params }) => ({ designer: getDesigner(params.slug) }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.designer ? `${loaderData.designer.name} — Fermoso` : "Designer — Fermoso",
      },
      {
        name: "description",
        content: loaderData?.designer?.bio ?? "A Fermoso designer.",
      },
    ],
  }),
  component: DesignerPage,
});

function DesignerPage() {
  const { designer } = Route.useLoaderData();
  const open = useShop((state) => state.open);
  if (!designer) {
    return (
      <Frame>
        <div className="px-6 py-20 text-center">
          <h1 className="text-3xl font-extrabold">We could not find that designer.</h1>
          <Link to="/designers" className="pill pill-ink mt-4">
            All designers
          </Link>
        </div>
      </Frame>
    );
  }
  const pieces = products.filter((product) => product.designer === designer.slug);

  return (
    <Frame>
      <article className="grid items-center gap-8 px-4 py-8 md:grid-cols-2 md:px-10">
        <img src={designer.image} alt={designer.name} className="w-full rounded-[2rem] object-cover" />
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">{designer.city}</p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight">{designer.name}</h1>
          <p className="mt-1 text-sm font-medium">{designer.role}</p>
          <p className="mt-4 text-sm leading-7 text-muted">{designer.bio}</p>
          <p className="mt-3 text-sm leading-7">{designer.note}</p>
          <button
            type="button"
            className="pill pill-blush mt-6"
            onClick={() => open("consult", `I'd like a fitting in the spirit of ${designer.name}.`)}
          >
            Book with this edit
          </button>
        </div>
      </article>
      <section className="px-4 py-6 md:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight">Pieces by {designer.name.split(" ")[0]}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {pieces.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Frame>
  );
}
