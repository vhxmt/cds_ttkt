import { Inter } from "next/font/google";
import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "@/components/frame/Footer";
import Header from "@/components/frame/Header";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SEE_HUST 2024",
  description: "dai hoc bach khoa ha noi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <Header />
        {children}
        <Footer />
      </AuthProvider>
      </body>
      </html>
  );
}
