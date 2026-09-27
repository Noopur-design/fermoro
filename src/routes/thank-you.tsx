import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Smile } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  validateSearch: (search: Record<string, unknown>) => ({
    from: typeof search.from === "string" ? search.from : "visit",
  }),
  head: () => ({
    meta: [
      { title: "Thank you — Fermoso" },
      { name: "description", content: "Thank you for writing to Fermoso Maison." },
    ],
  }),
  component: ThankYouPage,
});

const copy: Record<string, { line: string; note: string }> = {
  newsletter: {
    line: "You are on the list.",
    note: "We will write when the next coat is ready.",
  },
  consult: {
    line: "The fitting request is with the studio.",
    note: "Expect a note within two studio days.",
  },
  contact: {
    line: "Your note reached the cutting table.",
    note: "Someone at the maison will reply.",
  },
  order: {
    line: "The edit is reserved.",
    note: "Nothing was charged. We will confirm by email.",
  },
  visit: {
    line: "Glad you found your way here.",
    note: "Your visit means a lot to the atelier.",
  },
};

function ThankYouPage() {
  const { from } = Route.useSearch();
  const message = copy[from] ?? copy.visit;
  if (!message) return null;

  return (
    <div className="thanks">
      <aside className="absolute top-6 bottom-6 left-0 hidden w-28 flex-col justify-between rounded-r-[2rem] bg-white p-4 text-ink md:flex">
        <Link to="/" className="text-lg font-bold tracking-tight">
          Fermoso
        </Link>
        <p className="font-display text-sm italic">Back to the maison</p>
      </aside>
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="pointer-events-none absolute h-80 w-80 rounded-full border border-white/30" aria-hidden />
        <Sparkle className="absolute top-24 right-16 h-6 w-6" />
        <Sparkle className="absolute bottom-28 left-20 h-4 w-4" />
        <h1 className="relative font-sans text-7xl leading-none font-light tracking-tight sm:text-8xl">
          Thank
          <br />
          You!
        </h1>
        <p className="relative mt-4 max-w-sm text-sm text-white/90">{message.line}</p>
        <div className="glass float-a absolute top-[22%] right-[8%] hidden items-center gap-2 rounded-full px-3 py-2 text-sm sm:flex">
          <Heart className="h-4 w-4 fill-white" />
          Glad you stayed
        </div>
        <div className="glass float-b absolute right-[18%] bottom-[24%] hidden items-center gap-2 rounded-full px-3 py-2 sm:flex">
          <Smile className="h-5 w-5" />
        </div>
        <div className="glass absolute bottom-[18%] left-[18%] hidden max-w-xs items-center gap-3 rounded-full px-3 py-2 text-left text-sm md:flex">
          <img src="/fashion/about-woman.jpg" alt="" className="h-9 w-9 rounded-full object-cover" />
          <span>{message.note}</span>
        </div>
        <Link to="/" className="pill mt-10 bg-white text-ink">
          Return to Fermoso
        </Link>
      </div>
    </div>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M12 0 13.8 8.2 22 12l-8.2 1.8L12 24l-1.8-10.2L2 12l8.2-1.8L12 0z" />
    </svg>
  );
}
