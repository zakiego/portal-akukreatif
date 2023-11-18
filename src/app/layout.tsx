import Navbar from "@/components/ui/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/ui/footer";
import Maintenance from "@/app/maintenance";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow mt-32 mx-auto max-w-7xl px-6 pb-8 lg:px-8">
            {/* {children} */}
            <Maintenance />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
