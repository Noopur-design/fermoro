import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CartLines, lineTotal } from "@/components/cart-lines";
import { Frame } from "@/components/frame";
import { useShop } from "@/lib/store";
import { money } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Bag — Fermoso" },
      { name: "description", content: "Review your Fermoso bag and reserve the edit." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const cart = useShop((state) => state.cart);
  const clear = useShop((state) => state.clear);
  const savedName = useShop((state) => state.name);
  const navigate = useNavigate();
  const [name, setName] = useState(savedName);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const total = lineTotal(cart);

  function reserve(event: FormEvent) {
    event.preventDefault();
    if (cart.length === 0) {
      setError("Add a piece before reserving.");
      return;
    }
    if (name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || address.trim().length < 4 || city.trim().length < 2) {
      setError("Name, email, street, and city are all required.");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("fermoso-notes") ?? "[]") as string[];
    localStorage.setItem(
      "fermoso-notes",
      JSON.stringify([...saved, `order:${name}|${email}|${address}|${city}|${total}`]),
    );
    clear();
    void navigate({ to: "/thank-you", search: { from: "order" } });
  }

  return (
    <Frame>
      <section className="grid gap-10 px-4 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Your bag</h1>
          <div className="mt-6">
            <CartLines />
          </div>
        </div>
        <aside className="h-fit rounded-[1.8rem] bg-blush-soft p-5">
          <h2 className="text-xl font-bold">Reserve this edit</h2>
          <p className="mt-1 text-sm text-muted">Nothing is charged. We hold the pieces and write to confirm.</p>
          <p className="mt-4 flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span>{money(total)}</span>
          </p>
          <form onSubmit={reserve} className="mt-4 space-y-3">
            <label className="block text-sm font-medium" htmlFor="order-name">
              Name
            </label>
            <input id="order-name" className="field" value={name} onChange={(event) => setName(event.target.value)} />
            <label className="block text-sm font-medium" htmlFor="order-email">
              Email
            </label>
            <input id="order-email" type="email" className="field" value={email} onChange={(event) => setEmail(event.target.value)} />
            <label className="block text-sm font-medium" htmlFor="order-address">
              Street
            </label>
            <input id="order-address" className="field" value={address} onChange={(event) => setAddress(event.target.value)} />
            <label className="block text-sm font-medium" htmlFor="order-city">
              City
            </label>
            <input id="order-city" className="field" value={city} onChange={(event) => setCity(event.target.value)} />
            {error ? <p className="text-sm text-red">{error}</p> : null}
            <button type="submit" className="pill pill-ink w-full" disabled={cart.length === 0}>
              Reserve this edit
            </button>
          </form>
        </aside>
      </section>
    </Frame>
  );
}
