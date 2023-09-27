// https://notes.dt.in.th/NextRuntimeEnv
const strapiUrl = global.process ? global.process.env.STRAPI_URL : "";
const strapiToken = global.process ? global.process.env.STRAPI_TOKEN : "";

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */

export type Schema<TData> = {
  parse: (data: unknown) => TData;
};

type Pagination =
  | {
      page: number;
      pageSize: number;
      withCount?: boolean;
    }
  | {
      limit: number;
      start: number;
      withCount?: boolean;
    };

type Props<TData> = {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  cache?: RequestCache;
  schema?: Schema<TData>;
  debugBeforeParse?: boolean;
  debugAfterParse?: boolean;
  pagination?: Pagination;
  populate?: string[];
};

export type ZodFetcher = <TData>(props: Props<TData>) => Promise<TData>;

export const fetchStrapi: ZodFetcher = async ({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
  cache,
  debugBeforeParse,
  debugAfterParse,
  schema,
  pagination,
  populate,
}) => {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const urlString = `${strapiUrl}/api/${endpoint}`;
  const url = new URL(urlString);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  if (pagination) {
    if ("page" in pagination) {
      url.searchParams.append("pagination[page]", pagination.page.toString());
      url.searchParams.append(
        "pagination[pageSize]",
        pagination.pageSize.toString(),
      );
    } else {
      url.searchParams.append("pagination[limit]", pagination.limit.toString());
      url.searchParams.append("pagination[start]", pagination.start.toString());
    }

    if (pagination.withCount) {
      url.searchParams.append("pagination[withCount]", "true");
    }
  }

  if (populate) {
    populate.forEach((p) => {
      url.searchParams.append("populate", p);
    });
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${strapiToken}`);

  const res = await fetch(url.toString(), {
    headers,
    cache,
  });
  const originalResp = await res.json();
  let data = originalResp;

  if (wrappedByKey) {
    const keys = wrappedByKey.split(".");
    for (const key of keys) {
      data = data[key];
    }
  }

  if (wrappedByList) {
    data = data[0];
  }

  if (debugBeforeParse) {
    console.dir(data, { depth: null });
  }

  if (schema) {
    try {
      data = schema.parse(data);
    } catch (error) {
      console.log("Error at endpoint: ", url.toString());
      console.log("Response: ", originalResp);
      throw error;
    }
  }

  if (debugAfterParse) {
    console.dir(data, { depth: null });
  }

  return data;
};
