"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import emailjs from "emailjs-com"; 

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  checkIn: z.date(),
  checkOut: z.date(),
  bookingOptions: z.array(z.enum(["room", "conference"])).min(1, "Select at least one option"),
  roomType: z.string().optional(),
  conferenceRoomType: z.string().optional(),
  guests: z.string(),
  specialRequests: z.string().optional(),
});

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingOptions: [],
      specialRequests: "",
    },
  });

   // Submit handler for booking
   async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Send booking details via Email.js
      const emailTemplateParams = {
        to_name: "Eziana Palm Hotel", // The recipient's name
        from_name: values.name,      // Sender's name from the booking form
        from_email: values.email,    // Sender's email from the booking form
        phone: values.phone,
        checkIn: values.checkIn.toDateString(),
        checkOut: values.checkOut.toDateString(),
        bookingOptions: values.bookingOptions.join(", "),
        roomType: values.roomType || "N/A",
        conferenceRoomType: values.conferenceRoomType || "N/A",
        guests: values.guests,
        specialRequests: values.specialRequests || "None",
      };
      

      await emailjs.send(
        "service_hqvpfau", // Replace with your Email.js Service ID
        "template_95yrz4f", // Replace with your Email.js Template ID
        emailTemplateParams,
        "A_wu-7eXRVuAuYviq" // Replace with your Email.js User ID
      );

      toast.success("Booking request submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="bg-gradient-radial from-primary/20 to-background min-h-screen"
      ref={targetRef}
    >
      <motion.div
        className="container mx-auto px-4 py-16"
        style={{ opacity, scale }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.h1
            className="text-4xl font-bold text-center mb-8 text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Book Your Stay
          </motion.h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="bg-card text-card-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@example.com"
                        {...field}
                        className="bg-card text-card-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 234 567 890"
                        {...field}
                        className="bg-card text-card-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="checkIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-in Date</FormLabel>
                      <FormControl>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() ||
                            date >
                              new Date(
                                new Date().setMonth(new Date().getMonth() + 6)
                              )
                          }
                          className="bg-card text-card-foreground rounded-md border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkOut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-out Date</FormLabel>
                      <FormControl>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() ||
                            date >
                              new Date(
                                new Date().setMonth(new Date().getMonth() + 6)
                              )
                          }
                          className="bg-card text-card-foreground rounded-md border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bookingOptions"
                render={() => (
                  <FormItem>
                    <FormLabel>Booking Options</FormLabel>
                    <div className="flex space-x-4">
                      <FormField
                        control={form.control}
                        name="bookingOptions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes('room')}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, 'room'])
                                    : field.onChange(field.value?.filter((value) => value !== 'room'))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Room
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bookingOptions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes('conference')}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, 'conference'])
                                    : field.onChange(field.value?.filter((value) => value !== 'conference'))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Conference Room
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("bookingOptions")?.includes("room") && (
                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-card text-card-foreground">
                            <SelectValue placeholder="Select a room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="deluxe">Deluxe Room</SelectItem>
                          <SelectItem value="executive">Executive Suite</SelectItem>
                          <SelectItem value="presidential">
                            Presidential Suite
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {form.watch("bookingOptions")?.includes("conference") && (
                <FormField
                  control={form.control}
                  name="conferenceRoomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conference Room Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-card text-card-foreground">
                            <SelectValue placeholder="Select a conference room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small (up to 10 people)</SelectItem>
                          <SelectItem value="medium">Medium (up to 30 people)</SelectItem>
                          <SelectItem value="large">Large (up to 100 people)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-card text-card-foreground">
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or requirements..."
                        {...field}
                        className="bg-card text-card-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Book Now"}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}

