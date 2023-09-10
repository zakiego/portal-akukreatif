import HeaderHome from "@/app/(home)/header";
import Products from "@/app/(home)/products";
import Footer from "@/components/ui/footer";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Wadah Pelaku Industri Kreatif Kalimantan Selatan",
};

export default function Home() {
  return (
    <>
      <HeaderHome />
      <Products />
      <Footer />
    </>
  );
}
