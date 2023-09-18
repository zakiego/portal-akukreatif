import { fetchStrapi } from "@/lib/strapi";
import { ZodType, z } from "zod";

function inferSchemaType<T extends ZodType<any>>(schema: T): T["_output"] {
  return schema;
}

const business = {
  getBusinessByUUID: async (id: string) => {
    return await fetchStrapi({
      endpoint: "businesses",
      wrappedByKey: "data",
      // cache: "no-store",
      populate: ["regency", "sector", "owner", "images", "social"],
      debugBeforeParse: true,
      // debugAfterParse: true,
      // pagination: {
      //   page: 1,
      //   pageSize: 100,
      // },
      query: {
        "filters[uuid][$eq]": id,
      },
      schema: z
        .array(
          z.object({
            id: z.number(),
            attributes: z.object({
              name: z.string(),
              uuid: z.string(),
              description: z.string().optional(),
              address: z.string().optional(),
              regency: z.object({
                data: z
                  .object({
                    id: z.number(),
                    attributes: z.object({
                      name: z.string(),
                    }),
                  })
                  .nullable(),
              }),
              sector: z.object({
                data: z
                  .object({
                    id: z.number(),
                    attributes: z.object({
                      name: z.string(),
                    }),
                  })
                  .nullable(),
              }),
              owner: z.any(),
              images: z.object({
                data: z
                  .array(
                    z.object({
                      id: z.number(),
                      attributes: z.object({
                        name: z.string(),
                        url: z.string(),
                      }),
                    }),
                  )
                  .nullable(),
              }),
              social: z
                .object({
                  whatsapp: z.string().nullable(),
                  facebook: z.string().nullable(),
                  twitter: z.string().nullable(),
                  instagram: z.string().nullable(),
                  linkedin: z.string().nullable(),
                  telegram: z.string().nullable(),
                  web: z.string().nullable(),
                })
                .nullable(),
            }),
          }),
        )
        .length(1)
        .transform((data) => data[0]),
    });
  },
};

export const apiStrapi = {
  business: business,
};

// Define a utility type that recursively extracts return types and adds Awaited
type DeepReturnType<T> = T extends (...args: any[]) => infer R
  ? Awaited<R>
  : { [K in keyof T]: DeepReturnType<T[K]> };

// Infer the ApiStrapi type based on apiStrapi object
export type ApiStrapiTypes = DeepReturnType<typeof apiStrapi>;
