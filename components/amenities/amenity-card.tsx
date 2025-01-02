'use client'

import { Card } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { type LucideIcon } from 'lucide-react';

interface AmenityCardProps {
  icon: string;
  title: string;
  description: string;
}

export function AmenityCard({ icon, title, description }: AmenityCardProps) {
  const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow bg-card text-card-foreground">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
          </motion.div>
          <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
}

