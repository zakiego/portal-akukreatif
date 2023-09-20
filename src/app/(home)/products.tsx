/* eslint-disable @next/next/no-img-element */
import { apiStrapi } from "@/api/strapi";
import ProductCard from "@/components/product/card";

export default async function Products() {
  const products = await apiStrapi.business.homepage();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

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
