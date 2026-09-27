import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Overlay = "search" | "cart" | "account" | "menu" | "consult" | null;

export type CartLine = {
  productId: string;
  qty: number;
  size: string;
  color: string;
};

type State = {
  cart: CartLine[];
  wishlist: string[];
  name: string;
  overlay: Overlay;
  consultNote: string;
  notice: string | null;
  open: (overlay: Overlay, note?: string) => void;
  close: () => void;
  setName: (name: string) => void;
  toggleWish: (id: string) => void;
  add: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  setQty: (productId: string, size: string, color: string, qty: number) => void;
  remove: (productId: string, size: string, color: string) => void;
  clear: () => void;
  flash: (message: string) => void;
};

export const useShop = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      name: "",
      overlay: null,
      consultNote: "",
      notice: null,
      open: (overlay, note) =>
        set({
          overlay,
          consultNote: note ?? (overlay === "consult" ? get().consultNote : get().consultNote),
        }),
      close: () => set({ overlay: null }),
      setName: (name) => set({ name }),
      toggleWish: (id) => {
        const has = get().wishlist.includes(id);
        set({
          wishlist: has ? get().wishlist.filter((item) => item !== id) : [...get().wishlist, id],
        });
        get().flash(has ? "Removed from wishlist" : "Saved to wishlist");
      },
      add: ({ productId, size, color, qty = 1 }) => {
        const cart = get().cart.slice();
        const index = cart.findIndex(
          (line) => line.productId === productId && line.size === size && line.color === color,
        );
        if (index >= 0) {
          const current = cart[index];
          if (!current) return;
          cart[index] = { ...current, qty: Math.min(8, current.qty + qty) };
        } else {
          cart.push({ productId, size, color, qty: Math.min(8, qty) });
        }
        set({ cart });
      },
      setQty: (productId, size, color, qty) => {
        if (qty <= 0) {
          get().remove(productId, size, color);
          return;
        }
        set({
          cart: get().cart.map((line) =>
            line.productId === productId && line.size === size && line.color === color
              ? { ...line, qty: Math.min(8, qty) }
              : line,
          ),
        });
      },
      remove: (productId, size, color) =>
        set({
          cart: get().cart.filter(
            (line) => !(line.productId === productId && line.size === size && line.color === color),
          ),
        }),
      clear: () => set({ cart: [] }),
      flash: (message) => {
        set({ notice: message });
        window.setTimeout(() => {
          if (get().notice === message) set({ notice: null });
        }, 2200);
      },
    }),
    {
      name: "fermoso-atelier",
      skipHydration: true,
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        name: state.name,
      }),
    },
  ),
);

export function cartCount(cart: CartLine[]) {
  return cart.reduce((total, line) => total + line.qty, 0);
}
