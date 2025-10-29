import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import 'swiper/css';
import 'swiper/css/navigation';
import "./globals.css";
import { Header } from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";
import { ScrollSmootherWrapper } from "@/components/ScrollSmootherWrapper";

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
               <ScrollSmootherWrapper>
                  <Header />
                  <main>
                     {children}
                  </main>
               </ScrollSmootherWrapper>
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
