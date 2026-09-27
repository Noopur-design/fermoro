import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Frame } from "@/components/frame";
import { ProductCard } from "@/components/product-card";
import { defaultShopSearch, getProduct, relatedProducts } from "@/lib/data";
import { useShop } from "@/lib/store";
import { cn, discountPercent, money } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => ({ product: getProduct(params.id) }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.product ? `${loaderData.product.name} — Fermoso` : "Piece — Fermoso",
      },
      {
        name: "description",
        content: loaderData?.product?.description ?? "A piece from the Fermoso edit.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  if (!product) {
    return (
      <Frame>
        <div className="px-6 py-20 text-center">
          <h1 className="text-3xl font-extrabold">That piece has left the rail.</h1>
          <Link to="/shop" search={defaultShopSearch} className="pill pill-ink mt-4">
            Back to the shop
          </Link>
        </div>
      </Frame>
    );
  }

  return <ProductDetail id={product.id} />;
}

function ProductDetail({ id }: { id: string }) {
  const product = getProduct(id);
  if (!product) return null;
  const wishlist = useShop((state) => state.wishlist);
  const toggleWish = useShop((state) => state.toggleWish);
  const add = useShop((state) => state.add);
  const flash = useShop((state) => state.flash);
  const open = useShop((state) => state.open);
  const [size, setSize] = useState(product.sizes.includes("M") ? "M" : (product.sizes[0] ?? "One size"));
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [qty, setQty] = useState(1);
  const wished = wishlist.includes(product.id);
  const off = discountPercent(product.price, product.compareAt);
  const related = relatedProducts(product);

  return (
    <Frame>
      <article className="grid gap-8 px-4 py-8 md:grid-cols-2 md:px-10">
        <div className="rounded-[2rem] bg-blush-soft p-6">
          <img src={product.image} alt={product.name} className="mx-auto max-h-[36rem] w-full object-contain" />
        </div>
        <div>
          <p className="text-sm text-muted">
            <Link to="/shop" search={{ ...defaultShopSearch, category: product.category }} className="hover:text-ink">
              {product.category}
            </Link>
          </p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-gold text-gold" aria-hidden />
            <span>{product.rating.toFixed(1)}</span>
            {off ? <span className="rounded-full bg-ink px-2 py-0.5 text-xs text-on-red">{off}% off</span> : null}
          </div>
          <p className="mt-4 text-2xl font-bold">
            {money(product.price)}
            {product.compareAt ? (
              <span className="ml-2 text-base font-medium text-muted line-through">{money(product.compareAt)}</span>
            ) : null}
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">{product.description}</p>
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold">Color · {color}</legend>
            <div className="mt-2 flex gap-2">
              {product.colors.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  aria-label={swatch.name}
                  aria-pressed={color === swatch.name}
                  onClick={() => setColor(swatch.name)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2",
                    color === swatch.name ? "border-ink" : "border-white",
                  )}
                  style={{ background: swatch.hex }}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-5">
            <legend className="text-sm font-semibold">Size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={size === option}
                  onClick={() => setSize(option)}
                  className={size === option ? "pill pill-ink" : "pill pill-line"}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="mt-5 flex items-center gap-3">
            <label className="text-sm font-semibold" htmlFor="qty">
              Qty
            </label>
            <input
              id="qty"
              type="number"
              min={1}
              max={8}
              value={qty}
              onChange={(event) => setQty(Math.max(1, Math.min(8, Number(event.target.value) || 1)))}
              className="field w-20"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              className="pill pill-ink"
              onClick={() => {
                add({ productId: product.id, size, color, qty });
                flash(`${product.name} added to bag`);
                open("cart");
              }}
            >
              Add to bag
            </button>
            <button type="button" className="pill pill-line" aria-pressed={wished} onClick={() => toggleWish(product.id)}>
              <Heart className={cn("h-4 w-4", wished && "fill-heart text-heart")} />
              {wished ? "Saved" : "Wishlist"}
            </button>
          </div>
          <ul className="mt-8 space-y-2 text-sm text-muted">
            {product.details.map((detail) => (
              <li key={detail}>· {detail}</li>
            ))}
          </ul>
        </div>
      </article>
      {related.length > 0 ? (
        <section className="px-4 py-8 md:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight">More in {product.category}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </Frame>
  );
}
