import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { getProduct } from "@/lib/data";
import { useShop, type CartLine } from "@/lib/store";
import { money } from "@/lib/utils";

export function lineTotal(cart: CartLine[]) {
  return cart.reduce((total, line) => {
    const product = getProduct(line.productId);
    return total + (product ? product.price * line.qty : 0);
  }, 0);
}

export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const cart = useShop((state) => state.cart);
  const setQty = useShop((state) => state.setQty);
  const remove = useShop((state) => state.remove);

  if (cart.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-line px-4 py-10 text-center">
        <p className="font-semibold">Your bag is empty.</p>
        <p className="mt-1 text-sm text-muted">Coats, denim, and the daily shirt are waiting in the edit.</p>
        <Link to="/shop" search={{ q: "", category: "All", sort: "featured" }} className="pill pill-ink mt-4" onClick={onNavigate}>
          Shop the edit
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {cart.map((line) => {
        const product = getProduct(line.productId);
        if (!product) return null;
        return (
          <li key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-3">
            <Link to="/product/$id" params={{ id: product.id }} onClick={onNavigate} className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-blush-soft">
              <img src={product.image} alt="" className="h-full w-full object-contain" />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <Link to="/product/$id" params={{ id: product.id }} onClick={onNavigate} className="text-sm font-semibold">
                  {product.name}
                </Link>
                <button
                  type="button"
                  aria-label={`Remove ${product.name}`}
                  onClick={() => remove(line.productId, line.size, line.color)}
                  className="text-muted hover:text-red"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted">
                {line.color} · {line.size}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="circle-btn h-8 w-8"
                    aria-label="Decrease quantity"
                    onClick={() => setQty(line.productId, line.size, line.color, line.qty - 1)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm">{line.qty}</span>
                  <button
                    type="button"
                    className="circle-btn h-8 w-8"
                    aria-label="Increase quantity"
                    onClick={() => setQty(line.productId, line.size, line.color, line.qty + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-sm font-semibold">{money(product.price * line.qty)}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
