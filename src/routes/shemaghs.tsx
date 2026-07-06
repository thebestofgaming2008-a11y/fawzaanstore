import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/brand/CollectionPage";
import hero from "@/assets/shemagh-red-head.jpg";

export const Route = createFileRoute("/shemaghs")({
  head: () => ({
    meta: [
      { title: "Shemaghs - Fawzaan.store" },
      { name: "description", content: "Hand-loomed shemaghs in heritage patterns. 100% cotton, hand-knotted fringe." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: () => (
    <CollectionPage
      title="Shemaghs"
      breadcrumb="Shemaghs"
      eyebrow="Signature"
      hero={hero}
      where={(p) => p.collection === "shemaghs"}
    />
  ),
});
