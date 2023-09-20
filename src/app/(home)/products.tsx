/* eslint-disable @next/next/no-img-element */
import { apiStrapi } from "@/api/strapi";
import { Badge } from "@/components/ui/badge";
import Tag from "@/components/ui/tag";
import { fetchStrapi } from "@/lib/strapi";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { z } from "zod";

export default async function Products() {
  const products = await apiStrapi.business.homepage();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                {product.attributes.images.data && (
                  <img
                    src={getImageUrl(
                      product.attributes.images.data[0].attributes.url,
                    )}
                    alt={product.attributes.name}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/profil/${product.attributes.uuid}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.attributes.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {product.attributes.description}
                </p>
                <div className="flex flex-row justify-start space-x-4 pt-4">
                  {product.attributes.sector.data && (
                    <Badge className="capitalize" variant="secondary">
                      {product.attributes.sector.data.attributes.name}
                    </Badge>
                  )}
                  {product.attributes.regency.data && (
                    <Badge className="capitalize" variant="secondary">
                      {product.attributes.regency.data.attributes.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
