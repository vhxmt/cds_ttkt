import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "@/components/frame/Footer";
import Header from "@/components/frame/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEE_HUST 2024",
  description: "dai hoc bach khoa ha noi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Header></Header>
        {children}
        <Footer></Footer>
        </body>
    </html>
  );
}
