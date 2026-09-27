import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { defaultShopSearch } from "@/lib/data";
import { cartCount, useShop } from "@/lib/store";

const links = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
  { label: "Designers", to: "/designers" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "About", to: "/about" as const },
];

export function Header() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const open = useShop((state) => state.open);
  const cart = useShop((state) => state.cart);
  const wishlist = useShop((state) => state.wishlist);
  const count = cartCount(cart);

  return (
    <header className="flex items-center justify-between gap-3 px-4 py-4 md:px-8 md:py-5">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Link to="/" className="text-xl font-bold tracking-tight">
        Fermoso
      </Link>
      <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Primary">
        {links.slice(0, 2).map((link) => (
          <NavLink key={link.label} label={link.label} to={link.to} path={path} />
        ))}
        <Link
          to="/"
          hash="categories"
          className="transition hover:text-red"
          aria-current={path === "/" ? undefined : undefined}
        >
          Categories
        </Link>
        {links.slice(2).map((link) => (
          <NavLink key={link.label} label={link.label} to={link.to} path={path} />
        ))}
      </nav>
      <div className="flex items-center gap-1">
        <button type="button" className="icon-btn" aria-label="Search" onClick={() => open("search")}>
          <Search className="h-5 w-5" />
        </button>
        <Link to="/wishlist" className="icon-btn relative hidden sm:grid" aria-label="Wishlist">
          <Heart className="h-5 w-5" />
          {wishlist.length > 0 ? <Badge value={wishlist.length} /> : null}
        </Link>
        <button
          type="button"
          className="icon-btn hidden sm:grid"
          aria-label="Account"
          onClick={() => open("account")}
        >
          <UserRound className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="icon-btn relative"
          aria-label={`Bag, ${count} items`}
          onClick={() => open("cart")}
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 ? <Badge value={count} /> : null}
        </button>
        <button type="button" className="pill pill-blush ml-1 hidden md:inline-flex" onClick={() => open("consult")}>
          Atelier
        </button>
        <button type="button" className="icon-btn lg:hidden" aria-label="Open menu" onClick={() => open("menu")}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function Badge({ value }: { value: number }) {
  return (
    <span className="absolute top-0.5 right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 text-[10px] font-semibold text-on-red">
      {value}
    </span>
  );
}

function NavLink({
  label,
  to,
  path,
}: {
  label: string;
  to: "/" | "/shop" | "/designers" | "/blog" | "/about";
  path: string;
}) {
  const shop = to === "/shop";
  const current = path === to || (to !== "/" && path.startsWith(to));
  if (shop) {
    return (
      <Link
        to="/shop"
        search={defaultShopSearch}
        aria-current={current ? "page" : undefined}
        className={current ? "font-semibold" : "transition hover:text-red"}
      >
        {label}
      </Link>
    );
  }
  return (
    <Link
      to={to}
      aria-current={current ? "page" : undefined}
      className={current ? "font-semibold" : "transition hover:text-red"}
    >
      {label}
    </Link>
  );
}
