import { apiStrapi } from "@/api/strapi";
import ProductCard from "@/components/product/card";
import Search from "@/components/ui/search";
import TextGradient from "@/components/ui/textGradient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Galeri",
};

export default async function Page({ searchParams }: any) {
  const parse = z
    .object({
      name: z.string().optional(),
      regency: z.string().optional(),
      sector: z.string().optional(),
    })
    .parse(searchParams);

  const { regency, sector, name } = parse;

  const products = await apiStrapi.business.search({
    name,
    sector,
    regency,
  });

  return (
    <div>
      <div className="relative">
        <div className="max-w-3xl mx-auto mb-32 mt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-teal-700 to-teal-300 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center">
              <Balancer>
                Daftar <TextGradient>Ekonomi Kreatif</TextGradient>
              </Balancer>
            </h1>
          </div>
          <Search />
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.attributes.name}
              description={product.attributes.description}
              sector={product.attributes.sector.data?.attributes.name}
              regency={product.attributes.regency.data?.attributes.name}
              uuid={product.attributes.uuid}
              image={
                product.attributes.images.data &&
                product.attributes.images.data[0].attributes.url
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
