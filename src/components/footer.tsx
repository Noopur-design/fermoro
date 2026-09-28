import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { defaultShopSearch } from "@/lib/data";

export function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function subscribe(event: FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email so we know where to write.");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("fermoso-notes") ?? "[]") as string[];
    localStorage.setItem("fermoso-notes", JSON.stringify([...saved, `newsletter:${email}`]));
    setEmail("");
    setError("");
    void navigate({ to: "/thank-you", search: { from: "newsletter" } });
  }

  return (
    <footer className="px-4 pt-16 pb-10 md:px-8">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Fermoso
          </Link>
          <h2 className="mt-4 text-lg font-bold tracking-tight">Don't let the good pieces pass you by.</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            A short note when a coat lands, a denim run sells through, or the fitting calendar opens.
          </p>
          <form onSubmit={subscribe} className="mt-4 flex gap-2">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="field"
              aria-invalid={error ? true : undefined}
            />
            <button type="submit" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose" aria-label="Subscribe">
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </form>
          {error ? <p className="mt-2 text-sm text-red">{error}</p> : null}
        </div>
        <FooterCol
          title="Shop"
          links={[
            ["Coats", "Coats"],
            ["Denim", "Denim"],
            ["Knits", "Knits"],
            ["Bags", "Bags"],
          ]}
        />
        <div>
          <h2 className="text-sm font-semibold">Maison</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link to="/about" className="hover:text-ink">
                About the studio
              </Link>
            </li>
            <li>
              <Link to="/designers" className="hover:text-ink">
                Designers
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-ink">
                Journal
              </Link>
            </li>
            <li>
              <Link to="/about" hash="contact" className="hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Visit</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>42 Kala Ghoda, Fort, Mumbai 400001</li>
            <li>Tuesday to Saturday, 11–7</li>
            <li>
              <a href="tel:+919820040148" className="hover:text-ink">
                +91 98200 40148
              </a>
            </li>
            <li>
              <a href="mailto:hello@fermoso.in" className="hover:text-ink">
                hello@fermoso.in
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-muted">© 2026 Fermoso Maison. All rights reserved.</p>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {links.map(([label, category]) => (
          <li key={category}>
            <Link to="/shop" search={{ ...defaultShopSearch, category }} className="hover:text-ink">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
