import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/brand/CollectionPage";
import hero from "@/assets/hero-niqab.jpg";

export const Route = createFileRoute("/niqabs")({
  head: () => ({
    meta: [
      { title: "Niqabs - Fawzaan.store" },
      { name: "description", content: "Two-layer chiffon niqabs, adjustable fit, quietly premium." },
      { property: "og:image", content: hero },
    ],
  }),
  component: () => (
    <CollectionPage
      title="Niqabs"
      breadcrumb="Niqabs"
      eyebrow="For Her"
      hero={hero}
      where={(p) => p.collection === "niqabs"}
    />
  ),
});
