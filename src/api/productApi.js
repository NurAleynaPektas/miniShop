import axios from "axios";

const DJ_BASE = "https://dummyjson.com";
const FS_BASE = "https://fakestoreapi.com";


const toSlug = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const prettyLabel = (slug) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());


const CATEGORY_ALIAS = {
  smartphones: "electronics",
  laptops: "electronics",
  "home-decoration": "home",
  "men-s-shoes": "men's clothing",
  "women-s-shoes": "women's clothing",
};


const fsNormalize = (p) => {
  const first = p.image || (Array.isArray(p.images) ? p.images[0] : "");
  return {
    id: `fs_${p.id}`,
    title: p.title,
    description: p.description ?? "",
    price: Number(p.price) ?? 0,
    image: first || "",
    images: first ? [first] : [],
    rating: typeof p.rating === "object" ? p.rating?.rate ?? 0 : p.rating ?? 0,
    ratingCount: typeof p.rating === "object" ? p.rating?.count ?? 0 : 0,
    brand: p.brand ?? "",
    category: CATEGORY_ALIAS[p.category] ?? p.category ?? "other",
    stock: p.stock ?? 0,
    discountPercentage: 0,
    source: "fakestore",
  };
};

const djNormalize = (p) => {
  const first = p.thumbnail || (Array.isArray(p.images) ? p.images[0] : "");
  return {
    id: `dj_${p.id}`,
    title: p.title,
    description: p.description ?? "",
    price: Number(p.price) ?? 0,
    image: first || "",
    images:
      Array.isArray(p.images) && p.images.length
        ? p.images
        : first
        ? [first]
        : [],
    rating: p.rating ?? 0,
    ratingCount: 0,
    brand: p.brand ?? "",
    category: CATEGORY_ALIAS[p.category] ?? p.category ?? "other",
    stock: p.stock ?? 0,
    discountPercentage: p.discountPercentage ?? 0,
    source: "dummyjson",
  };
};

let _cache = { products: null, time: 0 };
const CACHE_MS = 60_000;

async function fetchMergedProducts() {
  const now = Date.now();
  if (_cache.products && now - _cache.time < CACHE_MS) return _cache.products;

  const [djRes, fsRes] = await Promise.all([
    axios.get(`${DJ_BASE}/products`, { params: { limit: 100 } }),
    axios.get(`${FS_BASE}/products`),
  ]);

  const dj = (djRes.data?.products ?? []).map(djNormalize);
  const fs = (fsRes.data ?? []).map(fsNormalize);

  const merged = [...dj, ...fs].sort((a, b) => a.title.localeCompare(b.title));

  _cache = { products: merged, time: now };
  return merged;
}

function buildCategoriesFromProducts(products, minCount = 1) {
  const counts = products.reduce((acc, p) => {
    const key = (p.category || "other").toString().trim();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .filter(([, c]) => c >= minCount)
    .map(([label, count]) => {
      const slug = toSlug(label);
      const name = prettyLabel(slug);
      return { slug, label, name, count };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}


export const fetchProducts = async () => {
  const merged = await fetchMergedProducts();
  return merged;
};

export const fetchCategories = async () => {
  const merged = await fetchMergedProducts();
  return buildCategoriesFromProducts(merged, 1);
};

export const fetchProductsByCategory = async (categoryOrSlug) => {
  const merged = await fetchMergedProducts();
  const wantedSlug = toSlug(categoryOrSlug);
  return merged.filter((p) => toSlug(p.category) === wantedSlug);
};
