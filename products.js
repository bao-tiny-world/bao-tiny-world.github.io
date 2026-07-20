// Bao & Tiny World Product Database
const products = [
  {
    id: 1,
    name: "Cozy Miniature Dream House DIY Kit",
    category: "scale-houses",
    price: 0,
    rating: 4.9,
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
    name: "Miniature Airplane Dashboard & Desk Ornament - Style 1",
    category: "toys",
    price: 0,
    rating: 5.0,
    reviews: 36,
    description: "Add a dynamic, mechanical touch to your car dashboard or workspace with this sleek miniature airplane ornament. Featuring a 360-degree swivel base and lightweight design, select models include a solar-powered propeller that spins automatically in sunlight. A perfect gadget for hobbyists, collectors, and aviation enthusiasts.",
    images: ["product_images/p4-1.png", "product_images/p4-2.png", "product_images/p4-3.png", "product_images/p4-4.png", "product_images/p4-5.png", "product_images/p4-6.png"],
    specs: {
      scale: "Miniature Accessory",
      size: "Compact (Fits standard car dashboards)",
      material: "Lightweight High-Grade ABS Plastic",
      difficulty: "Ready to Display (No Assembly Required)",
      weight: "0.07 kg (70g)",
      functions: "360-Degree Swivel Base, Solar Propeller (Solar Models Only)",
      colors: "White, Yellow, Red, Blue (Available in Solar or Static Type B)"
    }
  },
  {
    id: 5,
    name: "Miniature Airplane Dashboard & Desk Ornament - Style 2",
    category: "toys",
    price: 0,
    rating: 5.0,
    reviews: 36,
    description: "Add a dynamic, mechanical touch to your car dashboard or workspace with this sleek miniature airplane ornament. Featuring a 360-degree swivel base and lightweight design, select models include a solar-powered propeller that spins automatically in sunlight. A perfect gadget for hobbyists, collectors, and aviation enthusiasts.",
    images: ["product_images/p5-1.png", "product_images/p5-2.png", "product_images/p5-3.png", "product_images/p5-4.png"],
    specs: {
      scale: "Miniature Accessory",
      size: "Compact (Fits standard car dashboards)",
      material: "Lightweight High-Grade ABS Plastic",
      difficulty: "Ready to Display (No Assembly Required)",
      weight: "0.07 kg (70g)",
      functions: "360-Degree Swivel Base, Solar Propeller (Solar Models Only)",
      colors: "White, Yellow, Red, Blue (Available in Solar or Static Type B)"
    }
  },
  {
    id: 6,
    name: "Miniature Airplane Dashboard & Desk Ornament - Style 3",
    category: "toys",
    price: 0,
    rating: 5.0,
    reviews: 36,
    description: "Add a dynamic, mechanical touch to your car dashboard or workspace with this sleek miniature airplane ornament. Featuring a 360-degree swivel base and lightweight design, select models include a solar-powered propeller that spins automatically in sunlight. A perfect gadget for hobbyists, collectors, and aviation enthusiasts.",
    images: ["product_images/p6-1.png", "product_images/p6-2.png", "product_images/p6-3.png", "product_images/p6-4.png", "product_images/p6-5.png", "product_images/p6-6.png"],
    specs: {
      scale: "Miniature Accessory",
      size: "Compact (Fits standard car dashboards)",
      material: "Lightweight High-Grade ABS Plastic",
      difficulty: "Ready to Display (No Assembly Required)",
      weight: "0.07 kg (70g)",
      functions: "360-Degree Swivel Base, Solar Propeller (Solar Models Only)",
      colors: "White, Yellow, Red, Blue (Available in Solar or Static Type B)"
    }
  },
  {
    id: 7,
    name: "Miniature Airplane Dashboard & Desk Ornament - Style 4",
    category: "toys",
    price: 0,
    rating: 5.0,
    reviews: 36,
    description: "Add a dynamic, mechanical touch to your car dashboard or workspace with this sleek miniature airplane ornament. Featuring a 360-degree swivel base and lightweight design, select models include a solar-powered propeller that spins automatically in sunlight. A perfect gadget for hobbyists, collectors, and aviation enthusiasts.",
    images: ["product_images/p7-1.png", "product_images/p7-2.png", "product_images/p7-3.png", "product_images/p7-4.png"],
    specs: {
      scale: "Miniature Accessory",
      size: "Compact (Fits standard car dashboards)",
      material: "Lightweight High-Grade ABS Plastic",
      difficulty: "Ready to Display (No Assembly Required)",
      weight: "0.07 kg (70g)",
      functions: "360-Degree Swivel Base, Solar Propeller (Solar Models Only)",
      colors: "White, Yellow, Red, Blue (Available in Solar or Static Type B)"
    }
  },
  {
    id: 8,
    name: "Miniature Airplane Dashboard & Desk Ornament - Style 5",
    category: "toys",
    price: 0,
    rating: 5.0,
    reviews: 36,
    description: "Add a dynamic, mechanical touch to your car dashboard or workspace with this sleek miniature airplane ornament. Featuring a 360-degree swivel base and lightweight design, select models include a solar-powered propeller that spins automatically in sunlight. A perfect gadget for hobbyists, collectors, and aviation enthusiasts.",
    images: ["product_images/p8-1.png", "product_images/p8-2.png", "product_images/p8-3.png", "product_images/p8-4.png"],
    specs: {
      scale: "Miniature Accessory",
      size: "Compact (Fits standard car dashboards)",
      material: "Lightweight High-Grade ABS Plastic",
      difficulty: "Ready to Display (No Assembly Required)",
      weight: "0.07 kg (70g)",
      functions: "360-Degree Swivel Base, Solar Propeller (Solar Models Only)",
      colors: "White, Yellow, Red, Blue (Available in Solar or Static Type B)"
    }
  },
  {
    id: 9,
    name: "Solar Miniature Helicopter Car & Desk Aroma Diffuser",
    category: "toys",
    price: 0,
    rating: 4.9,
    reviews: 58,
    description: "Combine mechanical style with soothing ambient fragrance. Powered purely by natural sunlight, this detailed miniature helicopter feature spins its top rotor automatically in light while diffusing 360-degree natural plant-based essential oils. Eco-friendly, safe for the whole family, and completely wire-free.",
    images: ["product_images/p9-1.png", "product_images/p9-2.png", "product_images/p9-3.png"],
    specs: {
      scale: "Miniature Accessory",
      size: "11cm x 6cm x 5cm (L x W x H)",
      material: "High-Grade Durable ABS Plastic",
      difficulty: "Ready to Use (Easy Setup)",
      weight: "0.15 kg",
      power: "Solar-Powered (No Batteries or Charging Required)",
      fragrance: "100% Natural Plant-Based Essential Oil (Family & Child Safe)",
      colors: "Matte Black, Metallic Silver, Racing Red, Ocean Blue"
    }
  }
];

// Export product list for usage in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}
