import * as Dialog from "@radix-ui/react-dialog";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState, type FormEvent } from "react";
import { CartLines, lineTotal } from "@/components/cart-lines";
import { defaultShopSearch, filterProducts } from "@/lib/data";
import { cartCount, useShop } from "@/lib/store";
import { money } from "@/lib/utils";

export function Overlays() {
  const overlay = useShop((state) => state.overlay);
  const close = useShop((state) => state.close);

  return (
    <>
      <SearchDialog open={overlay === "search"} onClose={close} />
      <CartDialog open={overlay === "cart"} onClose={close} />
      <AccountDialog open={overlay === "account"} onClose={close} />
      <MenuDialog open={overlay === "menu"} onClose={close} />
      <ConsultDialog open={overlay === "consult"} onClose={close} />
    </>
  );
}

function Shell({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/35" />
        <Dialog.Content
          className={`fixed z-50 bg-white shadow-soft outline-none ${
            wide
              ? "inset-y-0 right-0 w-full max-w-md overflow-y-auto p-6"
              : "top-1/2 left-1/2 max-h-[85vh] w-[min(100%-1.5rem,36rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-sheet p-6"
          }`}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <Dialog.Title className="text-xl font-bold tracking-tight">{title}</Dialog.Title>
            <Dialog.Close className="icon-btn" aria-label="Close">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const results = filterProducts({ ...defaultShopSearch, q }).slice(0, 6);

  function go(event: FormEvent) {
    event.preventDefault();
    onClose();
    void navigate({ to: "/shop", search: { ...defaultShopSearch, q } });
  }

  return (
    <Shell open={open} onClose={onClose} title="Search the edit">
      <form onSubmit={go} className="flex gap-2">
        <label className="sr-only" htmlFor="site-search">
          Search pieces
        </label>
        <input
          id="site-search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Try trench, denim, olive…"
          className="field"
          autoFocus={open}
        />
        <button type="submit" className="pill pill-ink" aria-label="Search">
          <Search className="h-4 w-4" />
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {q && results.length === 0 ? <li className="text-sm text-muted">Nothing matches that yet.</li> : null}
        {results.map((product) => (
          <li key={product.id}>
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              onClick={onClose}
              className="flex items-center gap-3 rounded-2xl p-2 hover:bg-blush-soft"
            >
              <img src={product.image} alt="" className="h-14 w-14 rounded-xl object-contain" />
              <span>
                <span className="block text-sm font-semibold">{product.name}</span>
                <span className="text-xs text-muted">
                  {product.category} · {money(product.price)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function CartDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cart = useShop((state) => state.cart);
  const total = lineTotal(cart);
  return (
    <Shell open={open} onClose={onClose} title="Your bag" wide>
      <CartLines onNavigate={onClose} />
      {cart.length > 0 ? (
        <div className="mt-6 border-t border-line pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">{cartCount(cart)} pieces</span>
            <span className="text-lg font-bold">{money(total)}</span>
          </div>
          <Link to="/cart" className="pill pill-ink mt-4 w-full" onClick={onClose}>
            Review and reserve
          </Link>
        </div>
      ) : null}
    </Shell>
  );
}

function AccountDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const name = useShop((state) => state.name);
  const setName = useShop((state) => state.setName);
  const wishlist = useShop((state) => state.wishlist);
  const cart = useShop((state) => state.cart);
  return (
    <Shell open={open} onClose={onClose} title="Your Fermoso">
      <p className="text-sm leading-relaxed text-muted">
        This stays on your device. No account, no password — just a name for the fitting notes.
      </p>
      <label className="mt-4 block text-sm font-medium" htmlFor="atelier-name">
        What should we call you?
      </label>
      <input
        id="atelier-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        className="field mt-2"
      />
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <Link to="/wishlist" onClick={onClose} className="rounded-card bg-blush-soft p-4">
          <span className="block text-2xl font-bold">{wishlist.length}</span>
          Saved pieces
        </Link>
        <Link to="/cart" onClick={onClose} className="rounded-card bg-sand p-4">
          <span className="block text-2xl font-bold">{cartCount(cart)}</span>
          In the bag
        </Link>
      </div>
    </Shell>
  );
}

function MenuDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const openOverlay = useShop((state) => state.open);
  return (
    <Shell open={open} onClose={onClose} title="Menu" wide>
      <nav className="flex flex-col text-2xl font-semibold tracking-tight" aria-label="Mobile">
        <Link to="/" className="border-b border-line py-3" onClick={onClose}>
          Home
        </Link>
        <Link to="/shop" search={defaultShopSearch} className="border-b border-line py-3" onClick={onClose}>
          Shop
        </Link>
        <Link to="/" hash="categories" className="border-b border-line py-3" onClick={onClose}>
          Categories
        </Link>
        <Link to="/designers" className="border-b border-line py-3" onClick={onClose}>
          Designers
        </Link>
        <Link to="/blog" className="border-b border-line py-3" onClick={onClose}>
          Blog
        </Link>
        <Link to="/about" className="border-b border-line py-3" onClick={onClose}>
          About
        </Link>
      </nav>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/wishlist" className="pill pill-line" onClick={onClose}>
          Wishlist
        </Link>
        <button
          type="button"
          className="pill pill-line"
          onClick={() => {
            onClose();
            openOverlay("account");
          }}
        >
          Account
        </button>
        <button type="button" className="pill pill-blush" onClick={() => openOverlay("consult")}>
          Book a fitting
        </button>
      </div>
    </Shell>
  );
}

function ConsultDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const preset = useShop((state) => state.consultNote);
  const nameSaved = useShop((state) => state.name);
  const [name, setName] = useState(nameSaved);
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("Everyday wardrobe");
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState(preset);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setNotes(preset);
      setName(nameSaved);
      setError("");
    }
  }, [open, preset, nameSaved]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Add your name and a real email so the studio can reply.");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("fermoso-notes") ?? "[]") as string[];
    localStorage.setItem(
      "fermoso-notes",
      JSON.stringify([...saved, `consult:${name}|${email}|${occasion}|${when}|${notes}`]),
    );
    onClose();
    void navigate({ to: "/thank-you", search: { from: "consult" } });
  }

  return (
    <Shell open={open} onClose={onClose} title="Book a fitting">
      <p className="text-sm leading-relaxed text-muted">
        Tell us what you are dressing for. A fitter writes back with cloth suggestions and a time.
      </p>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <label className="block text-sm font-medium" htmlFor="fit-name">
          Name
        </label>
        <input id="fit-name" className="field" value={name} onChange={(event) => setName(event.target.value)} />
        <label className="block text-sm font-medium" htmlFor="fit-email">
          Email
        </label>
        <input
          id="fit-email"
          type="email"
          className="field"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="block text-sm font-medium" htmlFor="fit-occasion">
          What are you dressing for?
        </label>
        <select
          id="fit-occasion"
          className="field"
          value={occasion}
          onChange={(event) => setOccasion(event.target.value)}
        >
          <option>Everyday wardrobe</option>
          <option>Work</option>
          <option>A ceremony</option>
          <option>A season of coats</option>
        </select>
        <label className="block text-sm font-medium" htmlFor="fit-when">
          Preferred day
        </label>
        <input id="fit-when" type="date" className="field" value={when} onChange={(event) => setWhen(event.target.value)} />
        <label className="block text-sm font-medium" htmlFor="fit-notes">
          Notes
        </label>
        <textarea
          id="fit-notes"
          className="field field-area"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        {error ? <p className="text-sm text-red">{error}</p> : null}
        <button type="submit" className="pill pill-ink w-full">
          Request the consultation
        </button>
      </form>
    </Shell>
  );
}
