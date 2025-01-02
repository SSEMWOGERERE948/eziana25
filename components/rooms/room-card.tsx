'use client'

import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wifi, Tv, Coffee, Bath, Utensils, UtensilsCrossed, SpadeIcon as Spa } from 'lucide-react';

interface RoomCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  amenities: {
    icon: string;
    label: string;
  }[];
}

const iconMap = {
  Wifi,
  Tv,
  Coffee,
  Bath,
  Utensils,
  UtensilsCrossed,
  Spa,
};

export function RoomCard({
  title,
  description,
  price,
  image,
  features,
  amenities,
}: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card text-card-foreground">
        <AspectRatio ratio={16 / 9}>
          <Image src={image} alt={title} fill className="object-cover" />
        </AspectRatio>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2 text-primary">{title}</h2>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-secondary-foreground">
              Room Features:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center mb-6">
            {amenities.map((amenity, i) => {
              const IconComponent = iconMap[amenity.icon as keyof typeof iconMap];
              return (
                <div key={i} className="flex flex-col items-center">
                  {IconComponent ? (
                    <IconComponent className="h-5 w-5 text-primary mb-1" />
                  ) : (
                    <span className="h-5 w-5 text-primary mb-1">?</span>
                  )}
                  <span className="text-xs text-muted-foreground">{amenity.label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-primary">
              {price}
              <span className="text-sm text-muted-foreground">/night</span>
            </p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/book">Book Now</Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}