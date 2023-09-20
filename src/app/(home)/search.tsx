"use client";

import { Input } from "@/components/ui/input";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ApiStrapiTypes } from "@/api/strapi";
import { useForm, useController, type Control } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Props {
  sectors: ApiStrapiTypes["sector"]["getAll"];
  regencies: ApiStrapiTypes["regency"]["getAll"];
}

export default function Search({ sectors, regencies }: Props) {
  const router = useRouter();
  const { handleSubmit, register, control, formState } = useForm();

  const sectorOptions = [
    {
      label: "Semua Sektor",
      value: "0",
    },
    ...sectors.map((i) => ({
      label: i.attributes.name,
      value: i.id.toString(),
    })),
  ];

  const regencyOptions = [
    {
      label: "Semua Wilayah",
      value: "0",
    },
    ...regencies.map((i) => ({
      label: i.attributes.name,
      value: i.id.toString(),
    })),
  ];

  const onSubmit = handleSubmit((data) => {
    const url = new URL(window.location.href);
    url.searchParams.set("name", data.name);
    data.sector &&
      data.sector != "0" &&
      url.searchParams.set("sector", data.sector);
    data.regency &&
      data.regency != "0" &&
      url.searchParams.set("regency", data.regency);

    router.push(`/galeri?${url.searchParams.toString()}`);
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row  w-full items-center md:space-x-2 space-x-0 md:space-y-0 space-y-5"
      >
        <Input
          className="w-[300px] md:w-96"
          placeholder="Cari berdasarkan nama"
          autoComplete="off"
          {...register("name", {
            required: true,
          })}
        />
        <Combobox
          id="sector"
          name="sector"
          control={control}
          options={sectorOptions}
          placeholder={{
            empty: "Tidak ditemukan",
            input: "Semua Sektor",
            search: "Pilih Sektor...",
          }}
        />
        <Combobox
          id="regency"
          name="regency"
          control={control}
          options={regencyOptions}
          placeholder={{
            empty: "Tidak ditemukan",
            input: "Semua Wilayah",
            search: "Pilih Wilayah...",
          }}
        />

        <Button
          type="submit"
          className=" w-[180px] md:w-72"
          disabled={!formState.isValid}
          variant="default"
        >
          Cari
        </Button>
      </form>
    </>
  );
}

interface ComboboxProps {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  placeholder: {
    input: string;
    search: string;
    empty: string;
  };
  control: Control;
}

export function Combobox({
  name,
  options,
  placeholder,
  control,
}: ComboboxProps) {
  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] md:w-[800px] justify-between"
        >
          {value
            ? options.find((framework) => framework.value === value)?.label
            : placeholder.input}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder.search} className="h-9" />
          <CommandEmpty>{placeholder.empty}</CommandEmpty>
          <CommandGroup>
            {options.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onChange(currentValue);
                }}
                value={framework.value}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
