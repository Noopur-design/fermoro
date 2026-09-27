export type Product = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  category: string;
  rating: number;
  image: string;
  description: string;
  details: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  designer: string;
};

export type Designer = {
  slug: string;
  name: string;
  role: string;
  image: string;
  tint: string;
  city: string;
  bio: string;
  note: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  comments: number;
  image: string;
  author: string;
  body: string[];
};

const apparel = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    id: "burgundy-wrap",
    name: "Burgundy Wrap Coat",
    price: 248,
    category: "Coats",
    rating: 4.8,
    image: "/fashion/coat.jpg",
    designer: "mina-cho",
    description:
      "A wool wrap with a quiet collar and enough weight for the walk between the studio and the train.",
    details: ["Wool blend with a soft hand", "Self-tie belt", "Side pockets", "Dry clean"],
    colors: [
      { name: "Burgundy", hex: "#6e2433" },
      { name: "Ink", hex: "#1c1918" },
    ],
    sizes: apparel,
  },
  {
    id: "ivory-blazer",
    name: "Ivory Soft Blazer",
    price: 186,
    category: "Blazers",
    rating: 4.7,
    image: "/fashion/blazer.jpg",
    designer: "lila-voss",
    description:
      "Unlined through the back so it sits like a shirt, with shoulders that still know how to hold a shape.",
    details: ["Soft viscose twill", "Single button", "Patch pockets", "Unlined back"],
    colors: [
      { name: "Ivory", hex: "#f3efe6" },
      { name: "Sand", hex: "#d9c7a6" },
    ],
    sizes: apparel,
  },
  {
    id: "plum-knit",
    name: "Plum Atelier Knit",
    price: 98,
    category: "Knits",
    rating: 4.6,
    image: "/fashion/knit.jpg",
    designer: "noor-elia",
    description: "A cropped merino knit with a close neck and sleeves that end exactly at the wrist.",
    details: ["Merino wool", "Cropped hem", "Ribbed cuffs", "Hand wash cold"],
    colors: [
      { name: "Plum", hex: "#5c3148" },
      { name: "Cocoa", hex: "#6b4038" },
    ],
    sizes: apparel,
  },
  {
    id: "navy-jumpsuit",
    name: "Navy Column Jumpsuit",
    price: 168,
    category: "Jumpsuits",
    rating: 4.5,
    image: "/fashion/jumpsuit.jpg",
    designer: "noor-elia",
    description: "One piece, a long leg, and a neckline that does the rest. Made for days with one decision.",
    details: ["Fluid crepe", "Wide leg", "Back zip", "Side pockets"],
    colors: [
      { name: "Navy", hex: "#1d2c4a" },
      { name: "Black", hex: "#161616" },
    ],
    sizes: apparel,
  },
  {
    id: "camel-set",
    name: "Camel Tailored Set",
    price: 276,
    category: "Tailoring",
    rating: 4.9,
    image: "/fashion/camel.jpg",
    designer: "mina-cho",
    description: "A short jacket and a straight trouser in the same camel cloth. Wear them together or let them split.",
    details: ["Sold as a set", "Wool blend", "Trouser with pressed crease", "Jacket hits the hip"],
    colors: [
      { name: "Camel", hex: "#c6a36a" },
      { name: "Stone", hex: "#b7b1a8" },
    ],
    sizes: apparel,
  },
  {
    id: "alba-crop",
    name: "Alba Cropped Jacket",
    price: 154,
    category: "Blazers",
    rating: 4.4,
    image: "/fashion/crop.jpg",
    designer: "lila-voss",
    description: "A cropped jacket with a little structure and a hem that clears a high waist on purpose.",
    details: ["Cotton twill", "Cropped length", "Button front", "Machine wash cold"],
    colors: [
      { name: "White", hex: "#f7f7f5" },
      { name: "Blush", hex: "#f1b8c1" },
    ],
    sizes: apparel,
  },
  {
    id: "meadow-trousers",
    name: "Meadow Wide Trousers",
    price: 112,
    compareAt: 132,
    category: "Denim",
    rating: 4.6,
    image: "/fashion/trousers.jpg",
    designer: "soren-hale",
    description: "Wide denim with a scatter of small florals. Easy through the hip, long enough for a shoe.",
    details: ["Cotton denim", "High rise", "Full length", "Embroidered motif"],
    colors: [
      { name: "Pale wash", hex: "#c5d0dc" },
      { name: "Ink wash", hex: "#3d4a5c" },
    ],
    sizes: apparel,
  },
  {
    id: "riviera-trucker",
    name: "Riviera Trucker Jacket",
    price: 168,
    category: "Denim",
    rating: 4.8,
    image: "/fashion/trucker.jpg",
    designer: "soren-hale",
    description: "A classic trucker, cut a touch longer, in a blue that looks better after a season of wear.",
    details: ["Rigid cotton denim", "Chest pockets", "Metal buttons", "Will soften with wear"],
    colors: [
      { name: "Mid blue", hex: "#3d6f9a" },
      { name: "Indigo", hex: "#1e3558" },
    ],
    sizes: apparel,
  },
  {
    id: "aster-denim",
    name: "Aster Embroidered Denim",
    price: 188,
    compareAt: 220,
    category: "Denim",
    rating: 4.7,
    image: "/fashion/embroidered.jpg",
    designer: "soren-hale",
    description: "The trucker, again, this time with white stitching that reads like a sketch across the chest.",
    details: ["Cotton denim", "Hand-guided embroidery", "Button front", "Slightly cropped"],
    colors: [{ name: "Blue", hex: "#355f86" }],
    sizes: apparel,
  },
  {
    id: "pale-trench",
    name: "Pale Day Trench",
    price: 238,
    category: "Coats",
    rating: 4.8,
    image: "/fashion/trench.jpg",
    designer: "mina-cho",
    description: "A light trench for weather that cannot decide. Double-breasted, unfussy, and long enough.",
    details: ["Cotton gabardine", "Double-breasted", "Storm flap", "Removable belt"],
    colors: [
      { name: "Pale stone", hex: "#d9d0c3" },
      { name: "Black", hex: "#1c1918" },
    ],
    sizes: apparel,
  },
  {
    id: "straight-jeans",
    name: "Stonewash Straight Jeans",
    price: 108,
    category: "Denim",
    rating: 4.5,
    image: "/fashion/jeans.jpg",
    designer: "soren-hale",
    description: "A straight leg with a clean hem. The pair we reach for when the rest of the outfit is already loud.",
    details: ["Cotton denim", "Mid rise", "Straight leg", "Five pocket"],
    colors: [
      { name: "Stonewash", hex: "#7f97b0" },
      { name: "Black", hex: "#222" },
    ],
    sizes: apparel,
  },
  {
    id: "blush-puffer",
    name: "Blush Camo Puffer",
    price: 198,
    compareAt: 232,
    category: "Coats",
    rating: 4.4,
    image: "/fashion/puffer.jpg",
    designer: "mina-cho",
    description: "A short puffer in a blush camo that stays soft instead of sporty. Warm, and not a shout.",
    details: ["Recycled fill", "Cropped body", "Snap placket", "Packs small"],
    colors: [{ name: "Blush camo", hex: "#e7b7c4" }],
    sizes: apparel,
  },
  {
    id: "honey-hoodie",
    name: "Honey Sunday Hoodie",
    price: 86,
    category: "Knits",
    rating: 4.6,
    image: "/fashion/hoodie.jpg",
    designer: "noor-elia",
    description: "Heavy cotton, a generous hood, and a yellow that looks like late light on a wall.",
    details: ["Brushed cotton fleece", "Dropped shoulder", "Kangaroo pocket", "Machine wash cold"],
    colors: [
      { name: "Honey", hex: "#f0c84b" },
      { name: "Cream", hex: "#f4efe4" },
    ],
    sizes: apparel,
  },
  {
    id: "olive-shirt",
    name: "Olive Daily Shirt",
    price: 78,
    category: "Tops",
    rating: 4.7,
    image: "/fashion/shirt.jpg",
    designer: "lila-voss",
    description: "The shirt for days that do not need a plan. Short sleeve, real buttons, a collar that behaves.",
    details: ["Cotton poplin", "Short sleeve", "Chest pocket", "Machine wash"],
    colors: [
      { name: "Olive", hex: "#5d6b3a" },
      { name: "White", hex: "#f7f7f5" },
    ],
    sizes: apparel,
  },
  {
    id: "blush-tote",
    name: "Blush Charm Tote",
    price: 64,
    category: "Bags",
    rating: 4.9,
    image: "/fashion/tote.jpg",
    designer: "lila-voss",
    description: "A canvas tote with a small charm that makes the whole day look more deliberate than it was.",
    details: ["Heavy canvas", "Inner pocket", "Removable charm", "One size"],
    colors: [
      { name: "Blush", hex: "#f0b7be" },
      { name: "Sand", hex: "#e6d7c3" },
    ],
    sizes: ["One size"],
  },
];

export const categoryNames = [
  "All",
  "Coats",
  "Blazers",
  "Knits",
  "Jumpsuits",
  "Tailoring",
  "Denim",
  "Tops",
  "Bags",
];

export const heroCategories = [
  { name: "Coats", image: "/fashion/coat.jpg", productId: "burgundy-wrap" },
  { name: "Blazers", image: "/fashion/blazer.jpg", productId: "ivory-blazer" },
  { name: "Knits", image: "/fashion/knit.jpg", productId: "plum-knit" },
  { name: "Jumpsuits", image: "/fashion/jumpsuit.jpg", productId: "navy-jumpsuit" },
  { name: "Tailoring", image: "/fashion/camel.jpg", productId: "camel-set" },
];

export const bestsellerIds = ["aster-denim", "riviera-trucker", "meadow-trousers", "alba-crop"];
export const newestIds = ["pale-trench", "straight-jeans", "blush-puffer", "honey-hoodie"];

export const designers: Designer[] = [
  {
    slug: "lila-voss",
    name: "Lila Voss",
    role: "Soft spring",
    image: "/fashion/spring.jpg",
    tint: "#f8d5e2",
    city: "Lisbon",
    bio: "Lila edits color the way other people edit sentences — one bright note, then quiet around it. Her spring rack is pink tailoring, easy shirts, and bags you actually carry.",
    note: "Known for cloth that looks dressed without asking for an occasion.",
  },
  {
    slug: "noor-elia",
    name: "Noor Elia",
    role: "Easy day",
    image: "/fashion/casual.jpg",
    tint: "#f3ead8",
    city: "Beirut",
    bio: "Noor designs for the hours between leaving the house and deciding where you are going. Knits, jumpsuits, and hoodies with a proper shoulder.",
    note: "If it feels like a uniform you chose, it is probably hers.",
  },
  {
    slug: "soren-hale",
    name: "Soren Hale",
    role: "Quiet autumn",
    image: "/fashion/autumn.jpg",
    tint: "#e4e4e7",
    city: "Copenhagen",
    bio: "Soren works almost entirely in denim. The changes are small: a longer body, a cleaner hem, embroidery that looks drawn rather than stamped.",
    note: "Denim that improves after the tenth wear, not the first photograph.",
  },
  {
    slug: "mina-cho",
    name: "Mina Cho",
    role: "Pale winter",
    image: "/fashion/winter.jpg",
    tint: "#dceaf3",
    city: "Seoul",
    bio: "Mina cuts coats. Trenches, wraps, and the odd puffer, all with the same rule: warmth should not cost you a silhouette.",
    note: "Outerwear you keep for more than one winter.",
  },
];

export const articles: Article[] = [
  {
    slug: "street-layers",
    title: "Street layers that still feel like you",
    excerpt: "A white tee, a jacket that already knows your shoulders, and the case for stopping at three pieces.",
    date: "March 12, 2026",
    comments: 18,
    image: "/fashion/blog-layers.jpg",
    author: "Mina Cho",
    body: [
      "The fastest way to look overdressed is to add a fourth idea. We have been watching what actually leaves the studio on a weekday: a white tee, one jacket, and denim that does not announce itself.",
      "Layering, at Fermoso, is not a stack. It is a sequence. The tee is the quiet part. The jacket is the sentence. Everything else should be able to disappear into a pocket.",
      "If the jacket is doing the work, keep the color close to the body. Ivory, black, stone, a single honey note. The street does not need a matching set. It needs a piece that looks like you chose it twice.",
      "Start with the Alba jacket or the pale trench, then stop. The rest of the day can be weather, coffee, and the walk.",
    ],
  },
  {
    slug: "black-cotton",
    title: "Black cotton, sunglasses, and leaving early",
    excerpt: "How a black outfit stays sharp when you refuse to add hardware, logos, or a second plan.",
    date: "February 2, 2026",
    comments: 11,
    image: "/fashion/blog-black.jpg",
    author: "Soren Hale",
    body: [
      "Black is not a personality. It is a surface. On cotton, it shows every crease, which is why the cut has to be honest — not tight, not swimming, just decided.",
      "We like sunglasses with black cotton because they finish the face without jewelry. One dark line across the eyes, and the outfit can stay almost empty.",
      "Leave early. That is the other half of the look. Clothes that are pressed in a rush never quite recover, and black is the first to tell on you.",
      "The Riviera trucker in indigo is the denim version of the same idea: one strong cloth, no extra story.",
    ],
  },
  {
    slug: "saturday-plan",
    title: "Two white tops and a Saturday plan",
    excerpt: "Matching is not the point. Sharing a cloth, a color, and an unhurried afternoon is.",
    date: "January 18, 2026",
    comments: 9,
    image: "/fashion/blog-saturday.jpg",
    author: "Noor Elia",
    body: [
      "Saturday dressing fails when it tries to be an event. Two white tops, good shoes you already own, and a bag that can take a book — that is a plan.",
      "We cut the Honey hoodie and the olive shirt for exactly this hour. One is soft. One is neat. Neither needs a caption.",
      "If you are dressing with someone else, share a color, not an outfit. White next to white looks intentional. Identical looks like a costume.",
      "The charm tote is the only accessory we would add. It gives the day a small joke without changing the clothes.",
    ],
  },
  {
    slug: "winter-white",
    title: "Thirty days of winter white",
    excerpt: "Ivory coats, pale knits, and why winter does not have to be a dark coat on repeat.",
    date: "December 4, 2025",
    comments: 24,
    image: "/fashion/winter.jpg",
    author: "Mina Cho",
    body: [
      "Winter white gets a reputation for being fragile. In a proper wool, it is the opposite — it holds a silhouette when black would swallow it.",
      "We wore the pale trench and the ivory blazer on rotation for a month in the studio. The rule was simple: one light piece, everything else quiet, shoes that can meet a wet street.",
      "Cream next to camel looks expensive. Cream next to honey looks like a Sunday. Cream next to black looks like you meant it.",
      "If you only buy one coat this season, make it a color you can see from across the room. The burgundy wrap is the other answer, for the days white feels too polite.",
    ],
  },
];

export type ShopSearch = {
  q: string;
  category: string;
  sort: string;
};

export const defaultShopSearch: ShopSearch = {
  q: "",
  category: "All",
  sort: "featured",
};

export function getProduct(id: string) {
  return products.find((product) => product.id === id) ?? null;
}

export function getDesigner(slug: string) {
  return designers.find((designer) => designer.slug === slug) ?? null;
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug) ?? null;
}

export function productsByIds(ids: string[]) {
  return ids.map((id) => getProduct(id)).filter((product): product is Product => Boolean(product));
}

export function filterProducts(search: ShopSearch) {
  const query = search.q.trim().toLowerCase();
  let list = products.filter((product) => {
    const matchesCategory = search.category === "All" || product.category === search.category;
    const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesQuery;
  });

  if (search.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (search.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (search.sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

export function relatedProducts(product: Product) {
  return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
}
