'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { Bed, Coffee, Wifi, Utensils, Users, Calendar } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div className="bg-gradient-radial from-primary/20 to-background min-h-screen" ref={targetRef}>
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen"
        style={{ opacity, scale }}
      >
        <Image
          src="reception.jpg"
          alt="Eziana Palm Hotels"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">Welcome to Eziana Palm Hotels</h1>
            <p className="text-xl">Experience comfort and elegance</p>
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/book">Book Your Stay</Link>
            </Button>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-secondary-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Bed, title: "Luxurious Rooms", desc: "Comfortable and elegant rooms" },
              { icon: Wifi, title: "Free Wi-Fi", desc: "High-speed internet access" },
              { icon: Coffee, title: "Room Service", desc: "24/7 room service available" },
              { icon: Utensils, title: "Restaurant", desc: "Fine dining experience" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center bg-card hover:bg-card/90 transition-colors duration-300">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Rooms
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Deluxe Room",
                image: "gallery-3.jpg",
                price: "$42",
              },
              {
                title: "Executive Suite",
                image: "executive-2.jpg",
                price: "$70",
              },
              {
                title: "Twin Beds Room",
                image: "twin-bed.jpg",
                price: "$56",
              },
            ].map((room, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-card-foreground">{room.title}</h3>
                    <p className="text-muted-foreground mb-4">Starting from {room.price}/night</p>
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/book">Book Now</Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-secondary-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Restaurant
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Gourmet Breakfast",
                image: "gallery-4.jpg",
                description: "Start your day with our delicious breakfast buffet",
              },
              {
                title: "Lunch Specials",
                image: "lunch.jpg",
                description: "Enjoy our chef's daily lunch specials",
              },
              {
                title: "Fine Dining",
                image: "single-1.jpg",
                description: "Experience exquisite cuisine in our evening restaurant",
              },
            ].map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={dish.image}
                      alt={dish.title}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-card-foreground">{dish.title}</h3>
                    <p className="text-muted-foreground">{dish.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Room Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Conference Facilities
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src="conference.jpg"
                    alt="Conference Room"
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-foreground">State-of-the-Art Conference Room</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Capacity for up to 100 attendees
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Wifi className="w-5 h-5 mr-2 text-primary" />
                  High-speed Wi-Fi and modern AV equipment
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Coffee className="w-5 h-5 mr-2 text-primary" />
                  Catering services available
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Flexible booking options
                </li>
              </ul>
              <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/book">Book Conference Room</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

