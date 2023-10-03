/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

interface ProductCardProps {
  uuid: string;
  name: string;
  description?: string;
  image?: string | null;
  sector?: string;
  regency?: string;
}
import sanitizeHtml from "sanitize-html";

export default function ProductCard(props: ProductCardProps) {
  const cleanDescriptionHtml = sanitizeHtml(props.description as string, {
    allowedTags: [],
    allowedAttributes: {},
  });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
        {props.image && (
          <img
            src={getImageUrl(props.image)}
            alt={props.name}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/profil/${props.uuid}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {props.name}
          </Link>
        </h3>
        <p
          className="text-sm text-gray-500 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: cleanDescriptionHtml,
          }}
        />
        <div className="flex flex-row justify-start space-x-4 pt-4">
          {props.sector && (
            <Badge className="capitalize" variant="secondary">
              {props.sector}
            </Badge>
          )}
          {props.regency && (
            <Badge className="capitalize" variant="secondary">
              {props.regency}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
