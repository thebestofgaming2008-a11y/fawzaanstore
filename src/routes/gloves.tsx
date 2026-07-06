import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/brand/CollectionPage";
import hero from "@/assets/hero-gloves.jpg";

export const Route = createFileRoute("/gloves")({
  head: () => ({
    meta: [
      { title: "Gloves - Fawzaan.store" },
      { name: "description", content: "Full-grain leather gloves, silk-lined, hand-stitched." },
      { property: "og:image", content: hero },
    ],
  }),
  component: () => (
    <CollectionPage title="Gloves" breadcrumb="Gloves" eyebrow="Accessories" hero={hero} where={(p) => p.collection === "gloves"} />
  ),
});
