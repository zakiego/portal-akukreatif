import Hero from "@/app/(home)/hero";
import Products from "@/app/(home)/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wadah Pelaku Industri Kreatif Kalimantan Selatan",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
    </>
  );
}
