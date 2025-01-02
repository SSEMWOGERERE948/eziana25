export const rooms = [
  {
    title: "Deluxe Room",
    description: "Perfect for solo travelers or couples seeking comfort and style.",
    price: "$200",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
    features: ["King Size Bed", "City View", "32\" Smart TV", "En-suite Bathroom"],
    amenities: [
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Coffee", label: "Coffee Maker" },
      { icon: "Tv", label: "Smart TV" },
      { icon: "Bath", label: "Bathtub" },
    ],
  },
  {
    title: "Executive Suite",
    description: "Spacious suite with separate living area and premium amenities.",
    price: "$350",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843",
    features: ["King Size Bed", "Ocean View", "55\" Smart TV", "Jacuzzi"],
    amenities: [
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Coffee", label: "Coffee Maker" },
      { icon: "Tv", label: "Smart TV" },
      { icon: "Bath", label: "Jacuzzi" },
    ],
  },
  {
    title: "Presidential Suite",
    description: "The ultimate luxury experience with panoramic views and butler service.",
    price: "$500",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    features: ["2 King Size Beds", "Panoramic View", "65\" Smart TV", "Private Pool"],
    amenities: [
      { icon: "Wifi", label: "Free Wi-Fi" },
      { icon: "Coffee", label: "Coffee Maker" },
      { icon: "Tv", label: "Smart TV" },
      { icon: "Bath", label: "Private Pool" },
    ],
  },
] as const;