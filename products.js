// Bao & Tiny World Product Database
const products = [
  {
    id: 1,
    name: "Kyoto Machiya Townhouse",
    category: "scale-houses",
    price: 0,
    rating: 4.9,
    reviews: 42,
    description: "A detailed replica of a traditional Kyoto wooden townhouse. Features slide-open shoji doors, miniature tatami rooms, a tiny stone garden, and warm LED ceiling lights. Perfect for advanced hobbyists seeking classical Japanese charm.",
    image: "product_images/house.png",
    specs: {
      scale: "1:24",
      size: "20cm x 15cm x 18cm",
      material: "Basswood, Fabric, Paper",
      difficulty: "Advanced (12-15 hours)"
    }
  },
  {
    id: 2,
    name: "Modern Tokyo Glass Loft",
    category: "scale-houses",
    price: 64.99,
    rating: 4.8,
    reviews: 29,
    description: "A contemporary Japanese loft featuring double-height glass windows, a modern spiral staircase, miniature anime figurines, a tiny work desk, and a balcony decorated with potted bonsai trees. Includes dust-proof cover.",
    image: "product_images/house.png",
    specs: {
      scale: "1:24",
      size: "18cm x 14cm x 16cm",
      material: "Plywood, Acrylic, Plastics",
      difficulty: "Intermediate (8-10 hours)"
    }
  },
  {
    id: 3,
    name: "Shinto Shrine Sanctuary",
    category: "scale-houses",
    price: 94.99,
    rating: 5.0,
    reviews: 18,
    description: "Recreate the tranquility of a hillside Shinto shrine. This premium kit includes a traditional vermilion Torii gate, stone lanterns, a washing basin (Chozuya), a main hall with intricate roofing, and tiny cherry blossom branches.",
    image: "product_images/house.png",
    specs: {
      scale: "1:30",
      size: "24cm x 18cm x 20cm",
      material: "Cedar wood, Silk flowers, Brass",
      difficulty: "Expert (18-22 hours)"
    }
  },
  {
    id: 4,
    name: "Hand-painted Kokeshi Doll Set",
    category: "toys",
    price: 34.99,
    rating: 4.7,
    reviews: 56,
    description: "A set of three hand-carved, hand-painted traditional Tohoku Kokeshi wooden dolls representing Happiness, Fortune, and Peace. Each doll features unique kimono designs and is made from seasoned cherry wood.",
    image: "product_images/toy.png",
    specs: {
      scale: "N/A",
      size: "Height: 8cm - 12cm",
      material: "Cherry Wood, Non-toxic Lacquer",
      difficulty: "No Assembly Required"
    }
  },
  {
    id: 5,
    name: "Daruma Fortune Wooden Puzzle",
    category: "toys",
    price: 24.99,
    rating: 4.6,
    reviews: 31,
    description: "An interlocking 3D wooden puzzle forming a traditional Daruma doll. A rewarding brain-teaser. Once completed, you can paint one eye, make a wish, and place it on your desk as a symbol of perseverance.",
    image: "product_images/toy.png",
    specs: {
      scale: "N/A",
      size: "9cm x 9cm x 10cm",
      material: "Birch Wood (Laser Cut)",
      difficulty: "Easy-Medium (2-3 hours)"
    }
  },
  {
    id: 6,
    name: "Mechanical 5-Tier Pagoda",
    category: "toys",
    price: 49.99,
    rating: 4.9,
    reviews: 24,
    description: "An incredible gear-driven 3D wooden mechanical puzzle of the iconic Yasaka Pagoda. A wind-up spring mechanism allows the bells to chime and gears to rotate. Fascinating engineering meets classical art.",
    image: "product_images/toy.png",
    specs: {
      scale: "1:50",
      size: "15cm x 15cm x 35cm",
      material: "Linden Plywood, Metal Springs",
      difficulty: "Advanced (6-8 hours)"
    }
  },
  {
    id: 7,
    name: "Warm LED Micro-Lighting Kit",
    category: "accessories",
    price: 12.99,
    rating: 4.5,
    reviews: 67,
    description: "Bring your miniature creations to life. Contains 6 ultra-fine copper wire warm-white LED diodes, a pre-wired battery box with an on/off switch, and sticky adhesive dots. Fits perfectly in any miniature house scale.",
    image: "product_images/accessory.png",
    specs: {
      scale: "Universal",
      size: "Wire Length: 30cm per LED",
      material: "Copper, LED, Battery box (AAA)",
      difficulty: "Easy (15 mins)"
    }
  },
  {
    id: 8,
    name: "Miniature Sakura Bonsai Tree",
    category: "accessories",
    price: 18.99,
    rating: 4.8,
    reviews: 49,
    description: "Add a delicate touch of spring. This pre-assembled miniature cherry blossom tree uses synthetic silk petals, real wood twigs, and sits in a glazed blue ceramic pot with fine green moss soil detailing.",
    image: "product_images/accessory.png",
    specs: {
      scale: "1:24 / 1:12",
      size: "Height: 12cm",
      material: "Ceramic, Resin, Silk, Wood",
      difficulty: "No Assembly Required"
    }
  },
  {
    id: 9,
    name: "Tatami & Tea Table Set",
    category: "accessories",
    price: 27.99,
    rating: 4.9,
    reviews: 35,
    description: "A scale replica set of 4 woven tatami mats, a low wooden tea table, two Zabuton (sitting cushions), and a complete micro ceramic tea set with a teapot and two teacups. Essential detailing for Japanese rooms.",
    image: "product_images/accessory.png",
    specs: {
      scale: "1:12",
      size: "Mats: 15cm x 7.5cm each",
      material: "Natural straw straw-look weave, Wood, Ceramic",
      difficulty: "No Assembly Required"
    }
  }
];

// Export product list for usage in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}
