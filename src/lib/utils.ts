export const createMetadataTitle = (title: string) => {
  return `${title} | Akukreatif.com`;
};

export const createImageURL = (url: string) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || "https://cms-akukreatif.zakiego.com";
  const withSlash = url.startsWith("/") ? url : `/${url}`;

  return `${baseURL}${withSlash}`;
};
