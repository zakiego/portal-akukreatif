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
      cache: "no-store",
      debugAfterParse: true,
      // pagination: {
      //   page: 1,
      //   pageSize: 100,
      // },
      query: {
        "filters[uuid][$eq]": id,
      },
      schema: z.array(
        z.object({
          id: z.number(),
          attributes: z.object({
            name: z.string(),
            uuid: z.string(),
          }),
        }),
      ),
    });
  },
};

export const apiStrapi = {
  business: business,
};

// export type ApiStrapi = Awaited<
//   ReturnType<(typeof apiStrapi)["business"]["getBusinessByUUID"]>
// >;

type DeepReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : { [K in keyof T]: DeepReturnType<T[K]> };

export type ApiStrapi = DeepReturnType<typeof apiStrapi>;
