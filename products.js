// Bao & Tiny World Product Database
const products = [
  {
    id: 1,
    name: "Cozy Miniature Dream House DIY Kit",
    category: "scale-houses",
    price: 0,
    rating: 4.9,
    reviews: 42,
    description: "Bring a beautiful architectural masterpiece to life with this premium DIY miniature house kit. Featuring highly detailed, precision-cut furniture, realistic indoor plants, vibrant decor, and warm ambient LED lighting, this kit includes everything you need to build your own pocket-sized sanctuary. Perfect for hobbyists looking for a rewarding, mindful crafting experience.",
    images: ["product_images/p1-1.png", "product_images/p1-2.png", "product_images/p1-3.png"],
    specs: {
      scale: "1:24",
      size: "XX cm (Please refer to the size details in the image annotations)",
      material: "Wood, Fabric, Paper, Metal Components",
      difficulty: "Intermediate to Advanced (12-15 hours)",
      weight: "0.7 kg",
      lighting: "LED Light (Requires LR44 batteries)",
      instructions: "Full-color English manual included"
    }
  },
  {
    id: 2,
    name: "Kyoto Matcha Cottage Shop Miniature DIY Kit",
    category: "scale-houses",
    price: 0,
    rating: 4.9,
    reviews: 42,
    description: "Step into a cozy, relaxing afternoon with this charming DIY wooden cottage kit. Designed with warm earth tones, soft whites, and vibrant leaf-green accents, this miniature shop features highly detailed displays including realistic tiny ice cream cones, classic parfaits, and delicate dessert trays. A perfect introduction to the world of scale modeling.",
    images: ["product_images/p2-1.png", "product_images/p2-2.png", "product_images/p2-3.png", "product_images/p2-4.png", "product_images/p2-5.png", "product_images/p2-6.png", "product_images/p2-7.png"],
    specs: {
      scale: "1:24",
      size: "9.8cm x 8.7cm x 10.3cm",
      material: "Premium 2.5mm Imported MDF Wood",
      difficulty: "Beginner (0.5-1 hour)",
      pieces: "128 pieces (+ 6 spare parts)",
      sheets: "5 wooden sheets"
    }
  },
  {
    id: 3,
    name: "Kagawa Udon Noodle Shop Miniature DIY Kit",
    category: "scale-houses",
    price: 0,
    rating: 4.9,
    reviews: 42,
    description: "Capture the nostalgic charm of a classic roadside eatery with this delightful DIY wooden miniature kit. Featuring a textured dark-gray tiled roof, weathered faux-wood finishes, and aged stone steps, this kit brings an inviting storefront to life. Complete with a vintage serving counter, miniature ceramic bowls, tiny tabletop accessories, and lifelike potted greenery, it is a perfect weekend project for any craft enthusiast.",
    images: ["product_images/p3-1.png", "product_images/p3-2.png", "product_images/p3-3.png", "product_images/p3-4.png", "product_images/p3-5.png", "product_images/p3-6.png", "product_images/p3-7.png", "product_images/p3-8.png", "product_images/p3-9.png"],
    specs: {
      scale: "1:24",
      size: "9.5cm x 8.7cm x 10.9cm",
      material: "Premium 2.5mm Imported MDF Wood",
      difficulty: "Beginner (0.5-1 hour)",
      pieces: "103 pieces (+ 3 spare parts)",
      sheets: "5 wooden sheets"
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
    images: ["product_images/toy.png", "product_images/accessory.png"],
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
    images: ["product_images/toy.png", "product_images/gadget.png"],
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
    images: ["product_images/toy.png", "product_images/house.png"],
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
    images: ["product_images/accessory.png", "product_images/gadget.png"],
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
    images: ["product_images/accessory.png", "product_images/toy.png"],
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
    images: ["product_images/accessory.png", "product_images/house.png"],
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
