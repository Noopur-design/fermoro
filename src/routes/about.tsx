import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Frame } from "@/components/frame";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Fermoso" },
      {
        name: "description",
        content: "The Fermoso maison: a cutting table, a small edit, and a studio at Kala Ghoda, Mumbai.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const navigate = useNavigate();
  const open = useShop((state) => state.open);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.trim().length < 8) {
      setError("Add your name, email, and a note of at least a sentence.");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("fermoso-notes") ?? "[]") as string[];
    localStorage.setItem("fermoso-notes", JSON.stringify([...saved, `contact:${name}|${email}|${message}`]));
    void navigate({ to: "/thank-you", search: { from: "contact" } });
  }

  return (
    <Frame>
      <section className="grid items-center gap-8 px-4 py-8 md:grid-cols-2 md:px-10">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">The maison</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">About Fermoso</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            The name is a promise we made to the first coat: it should look like it was finished, not just produced.
            We still work that way. Small runs, known cloth, designers who answer for the hem.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            The studio is open Tuesday to Saturday. Come for a fitting, or write first and we will have the rail ready.
          </p>
          <button type="button" className="pill pill-blush mt-6" onClick={() => open("consult")}>
            Book a consultation
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src="/fashion/about-woman.jpg" alt="Beige coat from the edit" className="h-72 w-full rounded-[1.6rem] object-cover" />
          <img src="/fashion/about-man.jpg" alt="Olive sweatshirt from the edit" className="mt-8 h-72 w-full rounded-[1.6rem] object-cover" />
        </div>
      </section>

      <section id="visit" className="scroll-mt-6 px-4 py-6 md:px-10">
        <h2 className="text-2xl font-extrabold tracking-tight">Visit</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <p className="flex gap-3 rounded-card border border-line p-4 text-sm">
            <span className="gold-dot">
              <MapPin className="h-4 w-4" />
            </span>
            42 Kala Ghoda, Fort, Mumbai 400001
            <br />
            Tuesday to Saturday, 11–7
          </p>
          <p className="flex gap-3 rounded-card border border-line p-4 text-sm">
            <span className="gold-dot">
              <Phone className="h-4 w-4" />
            </span>
            <a href="tel:+919820040148">+91 98200 40148</a>
          </p>
          <p className="flex gap-3 rounded-card border border-line p-4 text-sm">
            <span className="gold-dot">
              <Mail className="h-4 w-4" />
            </span>
            <a href="mailto:hello@fermoso.in">hello@fermoso.in</a>
            <br />
            @fermoso.in
          </p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-6 px-4 py-8 md:px-10">
        <h2 className="text-2xl font-extrabold tracking-tight">Write to the studio</h2>
        <form onSubmit={submit} className="mt-4 grid max-w-xl gap-3">
          <label className="text-sm font-medium" htmlFor="contact-name">
            Name
          </label>
          <input id="contact-name" className="field" value={name} onChange={(event) => setName(event.target.value)} />
          <label className="text-sm font-medium" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            className="field"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="text-sm font-medium" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            className="field field-area"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          {error ? <p className="text-sm text-red">{error}</p> : null}
          <button type="submit" className="pill pill-ink w-fit">
            Send the note
          </button>
        </form>
      </section>
    </Frame>
  );
}
