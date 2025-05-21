import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  external?: boolean;
  children?: ReactNode;
};

export function Button({ external = false, children }: Props) {
  return (
    <button className="bg-primary text-white min-w-64 px-6 py-3 rounded-xl cursor-pointer">
      <span className="flex justify-between items-center">
        <span></span>
        <span className="font-semibold typo-p">{children}</span>
        <span>
          {external && (
            <Image
              width={16}
              height={16}
              src="/assets/Arrow.svg"
              alt="External Arror"
            />
          )}
        </span>
      </span>
    </button>
  );
}

export function IconButton({ external = false, children = null }: Props) {
  return (
    <button className="bg-primary text-white h-12 w-12 rounded-full cursor-pointer">
      <span className="flex justify-center items-center">
        {children && <span>{children}</span>}
        {external && (
          <Image
            width={16}
            height={16}
            src="/assets/Arrow.svg"
            alt="External Arror"
          />
        )}
      </span>
    </button>
  );
}
