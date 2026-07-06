import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/brand/CollectionPage";
import hero from "@/assets/hero-honey.jpg";

export const Route = createFileRoute("/honey")({
  head: () => ({
    meta: [
      { title: "Raw Honey - Fawzaan.store" },
      { name: "description", content: "Single-origin Sidr, Acacia and Wildflower honey. Cold-extracted, unfiltered." },
      { property: "og:image", content: hero },
    ],
  }),
  component: () => (
    <CollectionPage title="Raw Honey" breadcrumb="Honey" eyebrow="The Harvest" hero={hero} where={(p) => p.collection === "honey"} />
  ),
});
