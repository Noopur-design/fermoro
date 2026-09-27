import { createFileRoute } from "@tanstack/react-router";
import { Frame } from "@/components/frame";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fermoso — Maison of modern dress" },
      {
        name: "description",
        content:
          "Shop Fermoso: coats, denim, knits, and tailoring, plus designers, journal notes, and private fittings.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Frame>
      <HomePage />
    </Frame>
  );
}
