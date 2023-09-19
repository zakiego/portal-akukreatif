/* eslint-disable @next/next/no-img-element */
"use client";

import { PaperClipIcon } from "@heroicons/react/20/solid";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ApiStrapiTypes } from "@/api/strapi";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import Tag from "@/components/ui/tag";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  data: ApiStrapiTypes["business"]["getBusinessByUUID"];
}

export default function ProductClient({ data }: Props) {
  return (
    <div className="bg-white mt-14">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {data.attributes.images.data?.map((image) => (
                  <Tab
                    key={image.id}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{image.attributes.name}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={getImageUrl(image.attributes.url)}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {data.attributes.images.data?.map((image) => (
                <Tab.Panel key={image.id}>
                  <img
                    src={getImageUrl(image.attributes.url)}
                    alt={image.attributes.name}
                    className="h-auto w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {data.attributes.name}
            </h1>

            {/* <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.price}
              </p>
            </div> */}

            {/* Reviews */}
            {/* <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? "text-indigo-500"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div> */}

            {/* DETAILS */}

            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {[
                  {
                    title: "Alamat",
                    content: data.attributes.address,
                  },

                  data.attributes.regency.data && {
                    title: "Kota/Kabupaten",
                    content: (
                      <Link
                        href={`/galeri?kota=${data.attributes.regency.data?.id}`}
                      >
                        <Tag>
                          {data.attributes.regency.data?.attributes.name}
                        </Tag>
                      </Link>
                    ),
                  },

                  data.attributes.sector.data && {
                    title: "Sektor",
                    content: (
                      <Link
                        href={`/galeri?kota=${data.attributes.sector.data?.id}`}
                      >
                        <Tag>
                          {data.attributes.sector.data?.attributes.name}
                        </Tag>
                      </Link>
                    ),
                  },
                ].map((item) => {
                  if (!item) return <></>;

                  return (
                    <div
                      key={item.title}
                      className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        {item.title}
                      </dt>
                      <dd className="w-fit mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {item.content}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <h3 className="sr-only">Deskripsi</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: data.attributes.description || "",
                }}
              />
            </div>

            <form className="mt-6">
              {/* Colors */}
              {/* <div>
                <h3 className="text-sm text-gray-600">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <span className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedColor,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none",
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.bgColor,
                            "h-8 w-8 rounded-full border border-black border-opacity-10",
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </span>
                </RadioGroup>
              </div> */}

              {/* <div className="mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
