import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/brand/CollectionPage";
import hero from "@/assets/niqab-khadija-2.jpg";

export const Route = createFileRoute("/women")({
  head: () => ({
    meta: [
      { title: "Women — Fawzaan.store" },
      { name: "description", content: "Niqabs, honey and heritage essentials for her." },
      { property: "og:image", content: hero },
    ],
  }),
  component: () => (
    <CollectionPage
      title="Women"
      breadcrumb="Women"
      eyebrow="The Edit"
      hero={hero}
      where={(p) => p.gender === "women" || p.gender === "unisex"}
    />
  ),
});
