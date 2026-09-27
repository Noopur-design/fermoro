import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame } from "@/components/frame";
import { ProductCard } from "@/components/product-card";
import { defaultShopSearch, getProduct, type Product } from "@/lib/data";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Fermoso" },
      { name: "description", content: "Pieces you saved from the Fermoso edit." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const wishlist = useShop((state) => state.wishlist);
  const pieces = wishlist
    .map((id) => getProduct(id))
    .filter((product): product is Product => product !== null);

  return (
    <Frame>
      <section className="px-4 py-8 md:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Wishlist</h1>
        <p className="mt-2 text-sm text-muted">{pieces.length} saved {pieces.length === 1 ? "piece" : "pieces"} on this device.</p>
        {pieces.length === 0 ? (
          <div className="mt-8 rounded-card border border-dashed border-line px-6 py-12 text-center">
            <p className="font-semibold">Nothing saved yet.</p>
            <Link to="/shop" search={defaultShopSearch} className="pill pill-ink mt-4">
              Browse the edit
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {pieces.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </Frame>
  );
}
