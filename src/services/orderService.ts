import type { CartItem } from "@/lib/cart";
import { listActiveProducts } from "@/services/productService";

type CheckoutCustomer = {
  email: string;
  phone: string;
  name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
};

type BackendCheckoutItem = {
  cartKey: string;
  productId: string;
  qty: number;
  name: string;
  price: number;
  priceInr: number;
  image?: string | null;
  slug?: string | null;
  selectedColor?: string | null;
  selectedSize?: string | null;
};

type BackendCheckoutPayload = {
  cart: BackendCheckoutItem[];
  customer: CheckoutCustomer;
  subtotal: number;
  shipping: number;
  total: number;
};

type WhatsAppOrderResult = {
  order: Record<string, unknown> | null;
  whatsappUrl: string;
};

function optionValue(variant: string | undefined, index: number) {
  return variant
    ?.split(/\s*\/\s*/)
    .map((part) => part.trim())
    .filter(Boolean)[index];
}

function productSlugFromCartItem(item: CartItem) {
  return item.slug || item.id.split("__")[0] || item.id;
}

async function buildBackendCheckoutPayload(args: {
  cart: CartItem[];
  customer: CheckoutCustomer;
  subtotal: number;
  shipping: number;
  total: number;
}): Promise<BackendCheckoutPayload> {
  const products = await listActiveProducts();
  const productBySlug = new Map(products.map((product) => [product.slug, product]));
  const cart = args.cart.map((item) => {
    const slug = productSlugFromCartItem(item);
    const product = productBySlug.get(slug);
    const productId = item.productId || product?.id;
    if (!productId || productId === slug) {
      throw new Error("Catalog is not connected to Convex products yet.");
    }
    const selectedColor = optionValue(item.variant, 0) ?? product?.colors?.[0]?.name ?? null;
    const selectedSize = optionValue(item.variant, 1) ?? product?.sizes?.[0] ?? null;
    return {
      cartKey: item.id,
      productId,
      qty: item.qty,
      name: item.name,
      price: item.price,
      priceInr: item.price,
      image: item.img,
      slug,
      selectedColor,
      selectedSize,
    };
  });

  return {
    cart,
    customer: args.customer,
    subtotal: args.subtotal,
    shipping: args.shipping,
    total: args.total,
  };
}

function productPageUrl(item: CartItem) {
  const slug = productSlugFromCartItem(item);
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : String(import.meta.env.VITE_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
  return origin ? `${origin}/product/${encodeURIComponent(slug)}` : `/product/${slug}`;
}

function buildWhatsAppMessage(cart: CartItem[], customer: CheckoutCustomer, total: number) {
  const lines = [
    `Assalamu alaikum. I would like to order to ${customer.country}.`,
    "",
    `Name: ${customer.name}`,
    `Email: ${customer.email}`,
    `WhatsApp number: ${customer.phone}`,
    "",
    `Country: ${customer.country}`,
    `Address: ${customer.address_line_1}${customer.address_line_2 ? `, ${customer.address_line_2}` : ""}`,
    `City: ${customer.city}`,
    `State / province / region: ${customer.state ?? ""}`,
    `Postal code: ${customer.postal_code}`,
    "",
    ...cart.flatMap((item, index) => [
      `${index + 1}. ${item.name}`,
      `   Quantity: ${item.qty}`,
      `   Variant/options: ${item.variant || "None"}`,
      `   Product page: ${productPageUrl(item)}`,
      "",
    ]),
    `Product subtotal: INR ${total.toLocaleString("en-IN")}`,
    "Please confirm availability, international shipping, and payment details.",
  ];
  return lines.join("\n");
}

function configuredWhatsAppUrl(message: string) {
  const phone = String(import.meta.env.VITE_WHATSAPP_ORDER_PHONE ?? "").replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
}

export async function createBackendWhatsAppOrder(args: {
  cart: CartItem[];
  customer: CheckoutCustomer;
  total: number;
}): Promise<WhatsAppOrderResult> {
  const savedMessage = buildWhatsAppMessage(args.cart, args.customer, args.total);
  return {
    order: null,
    whatsappUrl: configuredWhatsAppUrl(savedMessage),
  };
}

export async function createRazorpayOrder(args: {
  cart: CartItem[];
  customer: CheckoutCustomer;
  subtotal: number;
  shipping: number;
  total: number;
}) {
  const payload = await buildBackendCheckoutPayload(args);
  const response = await fetch("/api/create-order", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.error ?? "Could not create Razorpay order.");
  return { ...body, payload } as {
    order_id: string;
    orderId: string;
    amount: number;
    currency: string;
    key_id: string;
    payload: BackendCheckoutPayload;
  };
}

export async function verifyRazorpayPayment(args: {
  payload: BackendCheckoutPayload;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}) {
  const response = await fetch("/api/verify-payment", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(args),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.error ?? "Could not verify Razorpay payment.");
  return body.order;
}
