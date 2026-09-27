import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Scissors,
  Shirt,
  Sparkles,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useRef, type ReactNode, type RefObject } from "react";
import { CategoryTile, ProductCard } from "@/components/product-card";
import {
  articles,
  bestsellerIds,
  defaultShopSearch,
  designers,
  heroCategories,
  newestIds,
  productsByIds,
} from "@/lib/data";
import { useShop } from "@/lib/store";

function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M12 0 13.8 8.2 22 12l-8.2 1.8L12 24l-1.8-10.2L2 12l8.2-1.8L12 0z" />
    </svg>
  );
}

function scrollRow(ref: RefObject<HTMLDivElement | null>, direction: number) {
  const node = ref.current;
  if (!node) return;
  node.scrollBy({ left: direction * Math.min(320, node.clientWidth * 0.85), behavior: "smooth" });
}

export function HomePage() {
  const open = useShop((state) => state.open);
  const bestRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);
  const journalRef = useRef<HTMLDivElement>(null);
  const bestsellers = productsByIds(bestsellerIds);
  const newest = productsByIds(newestIds);

  return (
    <div>
      <section className="relative overflow-hidden pb-6">
        <div className="hero-copy">
          <p className="watermark" aria-hidden>
            FERMOSO
          </p>
          <Spark className="spark top-6 left-[12%] h-4 w-4" />
          <Spark className="spark top-16 right-[14%] h-6 w-6" />
          <h1 className="enter relative text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Fermoso Maison
          </h1>
          <p className="enter enter-2 relative mx-auto mt-3 max-w-md text-base text-muted">
            Designs worth being seen. Coats, denim, and tailoring edited for the way you actually dress.
          </p>
          <Link to="/shop" search={defaultShopSearch} className="pill pill-blush enter enter-3 relative mt-5">
            Shop the edit
          </Link>
        </div>
        <div className="hero-stage">
          <div className="halo" aria-hidden />
          <div className="tray-bg" aria-hidden />
          <img src="/fashion/hero.png" alt="Model in a black leather jacket and silver choker" className="model" />
          <div className="tray">
            <div>
              <p className="text-xs font-medium text-ink/70">The edit</p>
              <h2 className="text-2xl font-extrabold tracking-tight">Categories</h2>
              <p className="mt-1 hidden text-xs leading-relaxed text-ink/70 sm:block">
                Pieces chosen for how you actually dress.
              </p>
            </div>
            <div id="categories" className="cat-scroller">
              {heroCategories.map((category) => (
                <CategoryTile key={category.name} {...category} />
              ))}
            </div>
            <Link to="/shop" search={defaultShopSearch} className="pill pill-line self-end bg-white">
              View all
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center md:px-8">
        <div className="mx-auto grid max-w-4xl items-center gap-6 md:grid-cols-[8rem_1fr_8rem]">
          <button type="button" className="mx-auto text-center" onClick={() => open("consult", "I'd like help choosing cloth and color.")}>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#efe4ff] text-ink">
              <Shirt className="h-5 w-5" />
            </span>
            <span className="mt-2 block text-xs font-medium">Color & cloth</span>
          </button>
          <div className="grid grid-cols-3 gap-3">
            <img src="/fashion/scissors.jpg" alt="Red tailor scissors on linen" className="aspect-square rounded-[1.4rem] object-cover" />
            <img src="/fashion/fabric.jpg" alt="Folded dark silk" className="aspect-square rounded-[1.4rem] object-cover" />
            <img src="/fashion/tape.jpg" alt="Measuring tape on a cutting table" className="aspect-square rounded-[1.4rem] object-cover" />
          </div>
          <button type="button" className="mx-auto text-center" onClick={() => open("consult", "I'd like to talk through cut and finishing.")}>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#efe4ff] text-ink">
              <Scissors className="h-5 w-5" />
            </span>
            <span className="mt-2 block text-xs font-medium">Cut & finish</span>
          </button>
        </div>
        <button
          type="button"
          className="pill pill-ink mt-8"
          onClick={() => open("consult", "I'd like to start a custom design.")}
        >
          Start a design
        </button>
      </section>

      <section id="about" className="grid items-center gap-10 px-4 py-8 md:grid-cols-2 md:px-10">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">The maison</p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">About us</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            Fermoso began as a small cutting table and a stubborn idea: clothes should feel considered without
            feeling precious. We still edit every coat, knit, and pair of jeans for cloth, ease, and the detail you
            notice only the second time you wear it.
          </p>
          <Link to="/about" hash="contact" className="pill pill-ink mt-6">
            Contact us
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative mx-auto h-[26rem] w-full max-w-md">
          <img
            src="/fashion/about-man.jpg"
            alt="Model in an olive sweatshirt and tan shorts"
            className="photo-tilt absolute top-0 left-4 h-72 w-52 -rotate-6 object-cover"
          />
          <img
            src="/fashion/about-woman.jpg"
            alt="Model in a beige coat"
            className="photo-tilt absolute right-2 bottom-0 h-64 w-48 rotate-3 object-cover"
          />
          <Spark className="spark top-8 right-6 h-5 w-5 text-blush" />
        </div>
      </section>

      <ProductRow
        id="bestsellers"
        eyebrow="Leaving first"
        title="Bestsellers"
        text="What the atelier cannot keep on the rail."
        rowRef={bestRef}
        onPrev={() => scrollRow(bestRef, -1)}
        onNext={() => scrollRow(bestRef, 1)}
        viewAll={defaultShopSearch}
      >
        {bestsellers.map((product) => (
          <ProductCard key={product.id} product={product} className="w-[16.5rem] shrink-0" />
        ))}
      </ProductRow>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">Seasonal edits</h2>
          <p className="mt-2 text-sm text-muted">Four moods for the turn of the year.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {designers.map((designer, index) => (
            <Link
              key={designer.slug}
              to="/designers/$slug"
              params={{ slug: designer.slug }}
              className={`group relative block overflow-hidden rounded-[1.8rem] ${index % 2 === 0 ? "lg:-translate-y-3" : "lg:translate-y-3"}`}
              style={{ background: designer.tint }}
            >
              <img
                src={designer.image}
                alt={designer.name}
                className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-2xl bg-white px-3 py-2 text-sm font-medium">
                {designer.role}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-on-red">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="design" className="grid items-center gap-8 px-4 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Clothing, cut for you</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted">
            A cloth, a fitting, and a silhouette that already knows your days. Bring a reference, or come with nothing
            but a measurement.
          </p>
          <button
            type="button"
            className="pill pill-blush mt-5"
            onClick={() => open("consult", "I'd like a private fitting.")}
          >
            Book a consultation
          </button>
          <div className="mt-8 flex gap-4">
            <Chip color="bg-sky" label="Choose a cloth" to="/shop" />
            <ChipButton color="bg-gold" label="Book a fitting" onClick={() => open("consult", "Book a fitting.")} />
            <Chip color="bg-teal" label="The atelier" to="/about" />
          </div>
        </div>
        <div className="relative">
          <img
            src="/fashion/consult.jpg"
            alt="Consultant in a white shirt"
            className="relative ml-auto w-full max-w-lg rounded-[2rem] object-cover"
          />
          <p className="pointer-events-none absolute top-8 left-8 font-display text-4xl text-white/85 italic sm:text-5xl">
            Clothing
            <br />
            design
          </p>
        </div>
      </section>

      <section className="grid gap-4 px-4 py-12 md:grid-cols-2 md:px-8">
        <article className="flex items-center justify-between gap-4 overflow-hidden rounded-[2rem] bg-bag p-6 md:p-8">
          <img src="/fashion/tote.jpg" alt="Blush tote bag" className="h-40 w-36 object-contain sm:h-48 sm:w-44" />
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Good style starts with a bag.</h2>
            <Link to="/shop" search={{ ...defaultShopSearch, category: "Bags" }} className="pill mt-4 bg-cocoa text-on-red">
              Shop bags
            </Link>
          </div>
        </article>
        <article className="flex items-center justify-between gap-4 overflow-hidden rounded-[2rem] bg-sage p-6 md:p-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">For every day, the right choice.</h2>
            <Link to="/shop" search={{ ...defaultShopSearch, category: "Tops" }} className="pill mt-4 bg-olive text-on-red">
              Shop shirts
            </Link>
          </div>
          <img src="/fashion/shirt.jpg" alt="Olive daily shirt" className="h-40 w-36 object-contain sm:h-48 sm:w-44" />
        </article>
      </section>

      <ProductRow
        id="newest"
        eyebrow="Just pressed"
        title="The newest"
        text="Finished this week. Still warm from the iron."
        rowRef={newRef}
        onPrev={() => scrollRow(newRef, -1)}
        onNext={() => scrollRow(newRef, 1)}
        viewAll={{ ...defaultShopSearch, sort: "featured" }}
      >
        {newest.map((product) => (
          <ProductCard key={product.id} product={product} className="w-[16.5rem] shrink-0" />
        ))}
      </ProductRow>

      <section id="contact" className="px-4 py-12 md:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight">Talk to us</h2>
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 rounded-sheet border border-line p-4 md:grid-cols-3">
          <Info icon={<MapPin className="h-4 w-4" />} title="Studio" text="42 Kala Ghoda, Fort, Mumbai 400001" />
          <Info icon={<Phone className="h-4 w-4" />} title="Telephone" text="+91 98200 40148" />
          <Info icon={<Mail className="h-4 w-4" />} title="Email" text="hello@fermoso.in" />
        </div>
      </section>

      <section id="journal" className="px-4 py-8 md:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="gold-dot">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Fermoso journal</h2>
              <p className="text-sm text-muted">Notes on cloth, city dressing, and what we are making next.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="circle-btn" aria-label="Previous stories" onClick={() => scrollRow(journalRef, -1)}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" className="circle-btn" aria-label="Next stories" onClick={() => scrollRow(journalRef, 1)}>
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link to="/blog" className="pill pill-line">
              View all
            </Link>
          </div>
        </div>
        <div ref={journalRef} className="flex gap-4 overflow-x-auto pb-2">
          {articles.map((article) => (
            <article key={article.slug} className="w-[18rem] shrink-0 sm:w-[20rem]">
              <Link to="/blog/$slug" params={{ slug: article.slug }} className="block overflow-hidden rounded-[1.6rem]">
                <img src={article.image} alt="" className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" />
              </Link>
              <h3 className="mt-3 text-lg font-bold tracking-tight">{article.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{article.excerpt}</p>
              <div className="mt-3 flex gap-4 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {article.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" /> {article.comments}
                </span>
              </div>
              <Link to="/blog/$slug" params={{ slug: article.slug }} className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-on-red">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                Continue reading
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductRow({
  id,
  eyebrow,
  title,
  text,
  rowRef,
  onPrev,
  onNext,
  viewAll,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  rowRef: RefObject<HTMLDivElement | null>;
  onPrev: () => void;
  onNext: () => void;
  viewAll: typeof defaultShopSearch;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-4 py-8 md:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="gold-dot">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs text-muted">{eyebrow}</p>
            <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
            <p className="text-sm text-muted">{text}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="circle-btn" aria-label={`Previous ${title}`} onClick={onPrev}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" className="circle-btn" aria-label={`Next ${title}`} onClick={onNext}>
            <ChevronRight className="h-4 w-4" />
          </button>
          <Link to="/shop" search={viewAll} className="pill pill-line">
            View all
          </Link>
        </div>
      </div>
      <div ref={rowRef} className="flex gap-4 overflow-x-auto pb-2">
        {children}
      </div>
    </section>
  );
}

function Info({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-3 text-sm">
      <span className="gold-dot">{icon}</span>
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="text-muted">{text}</span>
      </span>
    </div>
  );
}

function Chip({ color, label, to }: { color: string; label: string; to: "/shop" | "/about" }) {
  if (to === "/shop") {
    return (
      <Link to="/shop" search={defaultShopSearch} className="w-24 text-center text-xs">
        <span className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${color}`} />
        <span className="mt-2 block">{label}</span>
      </Link>
    );
  }
  return (
    <Link to="/about" className="w-24 text-center text-xs">
      <span className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${color}`} />
      <span className="mt-2 block">{label}</span>
    </Link>
  );
}

function ChipButton({ color, label, onClick }: { color: string; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="w-24 text-center text-xs">
      <span className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${color}`} />
      <span className="mt-2 block">{label}</span>
    </button>
  );
}
