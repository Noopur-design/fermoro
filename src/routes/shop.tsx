import { createFileRoute } from "@tanstack/react-router";
import { Frame } from "@/components/frame";
import { ProductCard } from "@/components/product-card";
import { categoryNames, defaultShopSearch, filterProducts, type ShopSearch } from "@/lib/data";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" ? search.q : "",
    category: typeof search.category === "string" ? search.category : "All",
    sort: typeof search.sort === "string" ? search.sort : "featured",
  }),
  head: () => ({
    meta: [
      { title: "Shop the edit — Fermoso" },
      { name: "description", content: "Browse Fermoso coats, blazers, knits, denim, tailoring, and bags." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = filterProducts(search);

  return (
    <Frame>
      <section className="px-4 py-8 md:px-8">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">The edit</p>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight">Shop</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {search.q ? `Results for “${search.q}”.` : "Everything currently on the rail."}{" "}
          {list.length} {list.length === 1 ? "piece" : "pieces"}.
        </p>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Categories">
          {categoryNames.map((category) => {
            const active = search.category === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                className={active ? "pill pill-ink" : "pill pill-line"}
                onClick={() => void navigate({ search: { ...search, category } })}
              >
                {category}
              </button>
            );
          })}
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-muted">
          Sort
          <select
            className="field w-auto"
            value={search.sort}
            onChange={(event) => void navigate({ search: { ...search, sort: event.target.value } })}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
        {list.length === 0 ? (
          <div className="mt-10 rounded-card border border-dashed border-line px-6 py-12 text-center">
            <p className="font-semibold">No pieces match that filter.</p>
            <button
              type="button"
              className="pill pill-blush mt-4"
              onClick={() => void navigate({ search: defaultShopSearch })}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </Frame>
  );
}
