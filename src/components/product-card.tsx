import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { defaultShopSearch, type Product } from "@/lib/data";
import { useShop } from "@/lib/store";
import { cn, discountPercent, money } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const wishlist = useShop((state) => state.wishlist);
  const toggleWish = useShop((state) => state.toggleWish);
  const add = useShop((state) => state.add);
  const flash = useShop((state) => state.flash);
  const open = useShop((state) => state.open);
  const wished = wishlist.includes(product.id);
  const off = discountPercent(product.price, product.compareAt);
  const color = product.colors[0]?.name ?? "Default";
  const size = product.sizes.includes("M") ? "M" : (product.sizes[0] ?? "One size");

  return (
    <article className={cn("group relative flex w-full min-w-0 flex-col rounded-card border border-line bg-white p-3 transition duration-300 hover:-translate-y-1", className)}>
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block overflow-hidden rounded-[1.25rem] bg-blush-soft"
      >
        {off ? (
          <span className="absolute top-3 left-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink text-[10px] font-semibold text-on-red">
            {off}%
          </span>
        ) : null}
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-contain p-2 transition duration-500 group-hover:scale-105"
        />
      </Link>
      <button
        type="button"
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
        aria-pressed={wished}
        onClick={() => toggleWish(product.id)}
        className="icon-btn absolute top-4 right-4 bg-white"
      >
        <Heart className={cn("h-4 w-4", wished && "fill-heart text-heart")} />
      </button>
      <div className="flex items-center gap-1 px-1 pt-3 text-xs text-muted">
        <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
        <span>{product.rating.toFixed(1)}</span>
        <span className="text-line">·</span>
        <span>{product.category}</span>
      </div>
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="px-1 pt-1 text-sm font-semibold tracking-tight"
      >
        {product.name}
      </Link>
      <div className="mt-auto flex items-center justify-between px-1 pt-3 pb-1">
        <p className="text-sm">
          <span className="font-semibold">{money(product.price)}</span>
          {product.compareAt ? (
            <span className="ml-2 text-xs text-muted line-through">{money(product.compareAt)}</span>
          ) : null}
        </p>
        <button
          type="button"
          aria-label={`Add ${product.name} to bag`}
          className="circle-btn"
          onClick={() => {
            add({ productId: product.id, size, color });
            flash(`${product.name} added to bag`);
            open("cart");
          }}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export function CategoryTile({
  name,
  image,
  productId,
}: {
  name: string;
  image: string;
  productId: string;
}) {
  const wishlist = useShop((state) => state.wishlist);
  const toggleWish = useShop((state) => state.toggleWish);
  const wished = wishlist.includes(productId);

  return (
    <div className="relative w-[7.6rem] shrink-0">
      <Link
        to="/shop"
        search={{ ...defaultShopSearch, category: name }}
        className="flex flex-col items-center rounded-card bg-white px-2 pt-3 pb-4 transition duration-300 hover:-translate-y-1"
      >
        <img src={image} alt="" className="h-24 w-full object-contain" />
        <span className="mt-2 text-center text-xs font-medium">{name}</span>
      </Link>
      <button
        type="button"
        aria-label={wished ? `Remove ${name} from wishlist` : `Save ${name}`}
        aria-pressed={wished}
        onClick={() => toggleWish(productId)}
        className={cn(
          "absolute -right-1 -bottom-1 grid h-8 w-8 place-items-center rounded-full text-on-red",
          wished ? "bg-red" : "bg-blush",
        )}
      >
        <Heart className="h-3.5 w-3.5 fill-on-red" />
      </button>
    </div>
  );
}
