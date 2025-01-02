import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, checkIn, checkOut, roomType, guests, specialRequests } = body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email where you want to receive bookings
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
        <p><strong>Room Type:</strong> ${roomType}</p>
        <p><strong>Number of Guests:</strong> ${guests}</p>
        ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Booking request sent successfully" });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking request" },
      { status: 500 }
    );
  }
}