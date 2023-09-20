import { apiStrapi } from "@/api/strapi";
import SearchClient from "@/components/ui/search/client";

export default async function Search() {
  const sectors = await apiStrapi.sector.getAll();
  const regencies = await apiStrapi.regency.getAll();

  return <SearchClient regencies={regencies} sectors={sectors} />;
}
