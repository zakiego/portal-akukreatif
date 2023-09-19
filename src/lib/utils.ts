import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const createMetadataTitle = (title: string) => {
  return `${title} | Akukreatif.com`;
};

export const getImageUrl = (url: string) => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || "https://cms-akukreatif.zakiego.com";
  const withSlash = url.startsWith("/") ? url : `/${url}`;

  return `${baseURL}${withSlash}`;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
