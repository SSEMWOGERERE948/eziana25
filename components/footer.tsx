"use client";

import { Building2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe to the newsletter.");
      }

      toast.success("Successfully subscribed to the newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-6 w-6" />
              <span className="text-xl font-bold">Eziana Palm Hotels</span>
            </div>
            <p className="text-sm">Experience luxury and comfort at its finest.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/rooms">Rooms</Link>
              </li>
              <li>
                <Link href="/amenities">Amenities</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/book">Book Now</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Luxury Ave, City, Country</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@luxuryhotel.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for special offers.
            </p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded bg-primary-foreground text-primary flex-1"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-accent-foreground rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Eziana Palm Hotels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
