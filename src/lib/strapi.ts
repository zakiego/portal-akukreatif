interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  cache?: RequestCache;
}

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
export default async function fetchStrapi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
  cache,
}: Props): Promise<T> {
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
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${strapiToken}`);

  const res = await fetch(url.toString(), {
    headers,
    cache,
  });
  let data = await res.json();

  console.log(data);

  if (wrappedByKey) {
    const keys = wrappedByKey.split(".");
    for (const key of keys) {
      data = data[key];
    }
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}
