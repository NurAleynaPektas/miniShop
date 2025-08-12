
export function getProductImage(p) {
  if (p?.image) return p.image;
  if (p?.thumbnail) return p.thumbnail;
  if (Array.isArray(p?.images) && p.images.length) return p.images[0];
  return "/img/placeholder.png";
}