"use client";

import { useWorldMap } from "@/utils/store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  initialValue?: string;
};

export default function YearSelect({ initialValue }: Props) {
  const { setYear } = useWorldMap();

  const [selectedId, setSelectedId] = useState(0);
  const [options] = useState<
    { id: number; value: string; label: string; additionalLabels?: string[] }[]
  >([
    { id: 0, value: "2024", label: "2024" },
    { id: 1, value: "2023", label: "2023" },
    { id: 2, value: "2022", label: "2022" },
    { id: 3, value: "2021", label: "2021" },
    { id: 4, value: "2020", label: "2020" },
    { id: 5, value: "2019", label: "2019" },
    { id: 6, value: "2018", label: "2018" },
    {
      id: 7,
      value: "2018-2024",
      label: "2018-2024",
      additionalLabels: ["average"],
    },
  ]);

  useEffect(() => {
    if (!initialValue) return;
    const selected = options.find((el) => el.value === initialValue)!;
    setSelectedId(selected.id);
    setYear(selected.value);
  }, [initialValue, options, setYear]);

  return (
    <Menu>
      <MenuButton
        as="button"
        // disabled
        className="mx-2 rounded-full font-bold bg-white px-5 py-1 border border-base-gray outline-none inline-flex gap-2 items-center justify-center"
      >
        {({ open }) => (
          <>
            <span>{options.find((el) => el.id === selectedId)?.label}</span>
            <Image
              className={twMerge(open ? "text-[#307FED]" : "text-base-text")}
              width={8}
              height={8}
              src="/assets/ui/select-arrow.svg"
              alt=""
            />
          </>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="my-2 bg-white px-2 border border-base-gray divide-base-gray divide-y outline-none rounding-lg shadow-custom"
      >
        {options.map((el) => (
          <MenuItem key={el.id} as="div">
            <button
              className="block w-full py-2 px-2 hover:font-bold cursor-default text-center"
              onClick={() => {
                setSelectedId(el.id);
              }}
            >
              <span
                className={twMerge(
                  "block typo-p",
                  el.id === selectedId ? "font-bold" : ""
                )}
              >
                {el.label}
              </span>
              <span className="text-xs">{el.additionalLabels?.join(", ")}</span>
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
