export const products = [
  {
    id: 1,
    name: "Panda Glow Night Lamp",
    category: "Cute Lamps",
    price: 699,
    old: 999,
    tag: "BESTSELLER",
    emoji: "🐼",
    img: "panda-lamp.png",
    desc: "A warm, gentle glow and an irresistibly cute panda design. Perfect for bedrooms, study desks, and late-night reading.",
  },
  {
    id: 2,
    name: "Bunny Glow Lamp",
    category: "Cute Lamps",
    price: 549,
    old: 799,
    tag: "LOVED",
    emoji: "🐰",
    img: "bunny-lamp.jpeg",
    desc: "A soft warm night light for bedrooms, desks and thoughtful gifting. Battery operated and safe for kids.",
  },
  {
    id: 3,
    name: "Cozy Panda Lamp",
    category: "Cute Lamps",
    price: 899,
    old: 1199,
    tag: "NEW",
    emoji: "🐼",
    img: "rabbit-lamp.png",
    desc: "A cuddly character lamp that makes every corner feel cosier. Features multi-level touch dimming.",
  },
  {
    id: 4,
    name: "Little Moments Gift Box",
    category: "Art & Craft",
    price: 1099,
    old: 1499,
    tag: "GIFT PICK",
    emoji: "🎁",
    img: "hero-toys-banner.png",
    desc: "A colourful gift-ready surprise for birthdays and special days. Includes curated treats and keepsake accessories.",
  },
  {
    id: 5,
    name: "Teddy Bear Bestie",
    category: "Soft Toys",
    price: 499,
    old: 699,
    tag: "POPULAR",
    emoji: "🧸",
    desc: "A soft, huggable friend for all ages. Made from hypoallergenic plush fabric with durable stitching.",
  },
  {
    id: 6,
    name: "Personalised Love Gift",
    category: "Gift Sets",
    price: 799,
    old: 999,
    tag: "MADE FOR YOU",
    emoji: "💝",
    desc: "A thoughtful little keepsake for someone special. Handcrafted touches designed to create lasting memories.",
  },
  {
    id: 7,
    name: "Pawfect Pet Gift Set",
    category: "Puzzles",
    price: 599,
    old: 799,
    tag: "SALE",
    emoji: "🐾",
    desc: "A playful bundle for the four-legged family member. Interactive toys and gentle grooming essentials.",
  },
  {
    id: 8,
    name: "Tiny Joy Baby Set",
    category: "Outdoor",
    price: 899,
    old: 1199,
    tag: "GIFT PICK",
    emoji: "🍼",
    desc: "Sweet essentials for the newest little person. Soft cotton accessories and developmental rattle toys.",
  },
];

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  const numericId = Number(id);
  return products.find((p) => p.id === numericId);
}

export function getProductsByCategory(categoryName) {
  if (!categoryName || categoryName === "All") return products;
  return products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase(),
  );
}
