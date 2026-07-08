import { useEffect, useMemo, useState } from "react";
import { api } from "../../convex/_generated/api";
import { convex } from "@/lib/backend";
import {
  backendProductToProduct,
  localBackendProducts,
  type BackendProduct,
} from "@/lib/catalogBackend";
import { catalog, type Product } from "@/lib/products";

export type { BackendProduct as Product };

let cachedProducts: Product[] | null = null;

async function fetchCatalogProducts(): Promise<Product[]> {
  if (typeof window !== "undefined") {
    const response = await fetch("/api/catalog/products", {
      headers: { accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Catalog request failed with ${response.status}`);
    const rows = (await response.json()) as BackendProduct[];
    return rows.map(backendProductToProduct).filter((product) => product.slug);
  }

  if (convex) {
    const rows = (await convex.query(api.products.listActiveProducts, {})) as BackendProduct[];
    return rows.map(backendProductToProduct).filter((product) => product.slug);
  }

  return localBackendProducts.map(backendProductToProduct);
}

export async function listActiveProducts(): Promise<Product[]> {
  try {
    cachedProducts = await fetchCatalogProducts();
    return cachedProducts;
  } catch (error) {
    console.error("Using local catalog fallback", error);
    return cachedProducts ?? catalog;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    if (typeof window !== "undefined") {
      const response = await fetch(`/api/catalog/product?slug=${encodeURIComponent(slug)}`, {
        headers: { accept: "application/json" },
        cache: "no-store",
      });
      if (!response.ok) return catalog.find((product) => product.slug === slug) ?? null;
      return backendProductToProduct((await response.json()) as BackendProduct);
    }

    if (convex) {
      const row = (await convex.query(api.products.getProductBySlug, { slug })) as BackendProduct | null;
      return row ? backendProductToProduct(row) : null;
    }
  } catch (error) {
    console.error("Using local product fallback", error);
  }

  return catalog.find((product) => product.slug === slug) ?? null;
}

export function useCatalogProducts() {
  const [products, setProducts] = useState<Product[]>(cachedProducts ?? catalog);
  const [loading, setLoading] = useState(!cachedProducts);

  useEffect(() => {
    let alive = true;
    listActiveProducts()
      .then((next) => {
        if (alive) setProducts(next.length ? next : catalog);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return useMemo(() => ({ products, loading }), [products, loading]);
}

export function useCatalogProduct(slug: string, initial?: Product) {
  const [product, setProduct] = useState<Product | null>(initial ?? null);

  useEffect(() => {
    let alive = true;
    getProductBySlug(slug).then((next) => {
      if (alive && next) setProduct(next);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  return product;
}
