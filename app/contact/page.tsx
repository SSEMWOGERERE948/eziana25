"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState, useRef } from "react";
import { toast } from "sonner";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Message sent successfully!");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

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
          Contact Us
        </motion.h1>
        <motion.p 
          className="text-center text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          We're here to help and answer any question you might have
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 bg-card text-card-foreground">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary-foreground">Address</h3>
                    <p className="text-muted-foreground">123 Luxury Avenue<br />New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary-foreground">Phone</h3>
                    <p className="text-muted-foreground">+1 (234) 567-8900</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary-foreground">Email</h3>
                    <p className="text-muted-foreground">info@luxuryhotel.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary-foreground">Hours</h3>
                    <p className="text-muted-foreground">24/7 Front Desk</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="p-6 bg-card text-card-foreground">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary-foreground">Name</label>
                    <Input required placeholder="Your name" className="bg-input text-input-foreground" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary-foreground">Email</label>
                    <Input required type="email" placeholder="your@email.com" className="bg-input text-input-foreground" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary-foreground">Subject</label>
                  <Input required placeholder="How can we help?" className="bg-input text-input-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary-foreground">Message</label>
                  <Textarea required placeholder="Your message..." className="h-32 bg-input text-input-foreground" />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

