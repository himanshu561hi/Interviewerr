import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/app/provider"; // Provider को import करें

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Interviewer ",
  description: " AI Interviewer is an AI-powered interview practice tool that helps you prepare for job interviews by simulating real interview scenarios.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}