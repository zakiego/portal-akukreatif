import { fetchStrapi } from "@/lib/strapi";
import Link from "next/link";
import { z } from "zod";

const DUMMY = {
  id: 3,
  name: "Inflotu Ecoprint",
  href: "#",
  price: "$32",
  description:
    "Look like a visionary CEO and wear the same black t-shirt every day.",
  options: "Black",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
  imageAlt: "Front of plain black t-shirt.",
};

export default async function Products() {
  const products = await fetchStrapi({
    endpoint: "businesses",
    wrappedByKey: "data",
    cache: "no-store",
    schema: z.array(
      z.object({
        id: z.number(),
        attributes: z.object({
          name: z.string(),
          description: z.string().optional(),
          uuid: z.string(),
        }),
      }),
    ),
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <img
                  src={DUMMY.imageSrc}
                  alt={DUMMY.imageAlt}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/profil/${product.attributes.uuid}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.attributes.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">{DUMMY.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-sm italic text-gray-500">
                    {DUMMY.options}
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {DUMMY.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
