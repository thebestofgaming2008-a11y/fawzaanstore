import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/brand/CollectionPage";
import hero from "@/assets/shemagh-red-head.jpg";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men - Fawzaan.store" },
      { name: "description", content: "Shemaghs, kufis, gloves and heritage essentials for him." },
      { property: "og:image", content: hero },
    ],
  }),
  component: () => (
    <CollectionPage
      title="Men"
      breadcrumb="Men"
      eyebrow="The Edit"
      hero={hero}
      where={(p) => p.gender === "men" || p.gender === "unisex"}
    />
  ),
});
