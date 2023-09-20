import { fetchStrapi } from "@/lib/strapi";
import { ZodType, z } from "zod";

const business = {
  getBusinessByUUID: async (id: string) => {
    return await fetchStrapi({
      endpoint: "businesses",
      wrappedByKey: "data",
      // cache: "no-store",
      populate: ["regency", "sector", "owner", "images", "social"],
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
  homepage: async () => {
    return await fetchStrapi({
      endpoint: "businesses",
      wrappedByKey: "data",
      pagination: {
        start: 0,
        limit: 6,
      },
      // cache: "no-store",
      populate: ["regency", "sector", "images"],
      schema: z.array(
        z.object({
          id: z.number(),
          attributes: z.object({
            name: z.string(),
            description: z.string().optional(),
            uuid: z.string(),
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
          }),
        }),
      ),
    });
  },
  search: async ({
    name,
    regency,
    sector,
  }: {
    name?: string;
    regency?: string;
    sector?: string;
  }) => {
    return await fetchStrapi({
      endpoint: "businesses",
      wrappedByKey: "data",
      cache: "no-store",
      populate: ["regency", "sector", "owner", "images"],
      query: {
        ...(name && { "filters[name][$containsi]": name }),
        ...(regency && { "filters[regency][id][$eq]": regency }),
        ...(sector && { "filters[sector][id][$eq]": sector }),
      },
      debugBeforeParse: true,
      schema: z.array(
        z.object({
          id: z.number(),
          attributes: z.object({
            name: z.string(),
            description: z.string().optional(),
            uuid: z.string(),
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
          }),
        }),
      ),
    });
  },
};

const sector = {
  getAll: async () => {
    return await fetchStrapi({
      endpoint: "sectors",
      wrappedByKey: "data",
      schema: z.array(
        z.object({
          id: z.number(),
          attributes: z.object({
            name: z.string(),
          }),
        }),
      ),
    });
  },
};

const regency = {
  getAll: async () => {
    return await fetchStrapi({
      endpoint: "regencies",
      wrappedByKey: "data",
      schema: z.array(
        z.object({
          id: z.number(),
          attributes: z.object({
            name: z.string(),
          }),
        }),
      ),
    });
  },
};

export const apiStrapi = {
  business: business,
  sector: sector,
  regency: regency,
};

// Define a utility type that recursively extracts return types and adds Awaited
type DeepReturnType<T> = T extends (...args: any[]) => infer R
  ? Awaited<R>
  : { [K in keyof T]: DeepReturnType<T[K]> };

// Infer the ApiStrapi type based on apiStrapi object
export type ApiStrapiTypes = DeepReturnType<typeof apiStrapi>;
