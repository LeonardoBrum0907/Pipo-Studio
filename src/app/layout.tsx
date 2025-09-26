import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = Funnel_Display({
   variable: "--font-funnel-display",
   subsets: ["latin"],
});

const geistMono = Funnel_Display({
   variable: "--font-funnel-display",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: {
      template: "%s | Pipo Studio",
      default: "Home | Pipo Studio",
   },
   description: "Pipo Studio",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <Header />
            {children}
         </body>
      </html>
   );
}
