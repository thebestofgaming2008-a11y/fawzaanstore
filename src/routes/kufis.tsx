import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/brand/CollectionPage";
import hero from "@/assets/hero-kufi.jpg";

export const Route = createFileRoute("/kufis")({
  head: () => ({
    meta: [
      { title: "Kufis — Fawzaan.store" },
      { name: "description", content: "Breathable openwork kufis, hand-finished." },
      { property: "og:image", content: hero },
    ],
  }),
  component: () => (
    <CollectionPage title="Kufis" breadcrumb="Kufis" eyebrow="Everyday" hero={hero} where={(p) => p.collection === "kufis"} />
  ),
});
