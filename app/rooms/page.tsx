'use client'

import { RoomCard } from "@/components/rooms/room-card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function RoomsPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const rooms = [
    {
      title: "Deluxe Room",
      description: "Spacious and comfortable room with modern amenities.",
      price: "$42",
      image: "IMG_2295.JPG",
      features: ["King-size bed", "Free Wi-Fi"],
      amenities: [
        { icon: "Wifi", label: "Wi-Fi" },
        { icon: "Tv", label: "Smart TV" },
        { icon: "Coffee", label: "Coffee Maker" },
      ],
    },
    {
      title: "Executive Suite",
      description: "Luxurious suite with separate living area and panoramic views.",
      price: "$70",
      image: "executive-2222.JPG",
      features: ["King-size bed", "Free Wi-Fi"],
      amenities: [
        { icon: "Wifi", label: "Wi-Fi" },
        { icon: "Tv", label: "Smart TV" },
        { icon: "Coffee", label: "Coffee Maker" },
      ],
    },
    {
      title: "Twin Beds Room",
      description: "The epitome of luxury with twin beds.",
      price: "$50",
      image: "twin-bed.jpg",
      features: ["King-size bed", "Free Wi-Fi"],
      amenities: [
        { icon: "Wifi", label: "Wi-Fi" },
        { icon: "Tv", label: "Smart TV" },
        { icon: "Coffee", label: "Coffee Maker" },
      ],
    },
  ];

  return (
    <div className="bg-gradient-radial from-primary/20 to-background min-h-screen" ref={targetRef}>
      <motion.section 
        className="relative py-16"
        style={{ opacity, scale }}
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl font-bold text-center mb-12 text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Our Luxurious Rooms
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

