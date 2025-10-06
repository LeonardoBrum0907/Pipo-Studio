import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import 'swiper/css';
import 'swiper/css/navigation';
import "./globals.css";
import { Header } from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";

export const funnelDisplay = Funnel_Display({
   variable: "--font-funnel-display",
   subsets: ["latin"],
});

export const funnelSans = Funnel_Sans({
   variable: "--font-funnel-sans",
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
      <html lang="en" className={`${funnelDisplay.variable} ${funnelSans.variable} antialiased`}>
         <body className="font-display">
            <NextIntlClientProvider>
               <Header />
               <main>
                  {children}
               </main>
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
