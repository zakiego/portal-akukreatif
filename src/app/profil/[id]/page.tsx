import { apiStrapi } from "@/api/strapi";
import ProductClient from "@/app/profil/[id]/client";
import { createMetadataTitle } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = params;

  const business = await apiStrapi.business.getBusinessByUUID(id);

  return {
    title: createMetadataTitle(business.attributes.name),
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const business = await apiStrapi.business.getBusinessByUUID(id);

  return <ProductClient data={business} />;
}
