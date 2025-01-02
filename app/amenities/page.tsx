'use client'

import { AmenityCard } from "@/components/amenities/amenity-card";
import { amenities } from "@/lib/constants/amenities";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AmenitiesPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div className="bg-gradient-radial from-primary/20 to-background min-h-screen" ref={targetRef}>
      <motion.div 
        className="container mx-auto px-4 py-16"
        style={{ opacity, scale }}
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hotel Amenities
        </motion.h1>
        <motion.p 
          className="text-center text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Discover our world-class facilities and services
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <AmenityCard key={index} {...amenity} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

