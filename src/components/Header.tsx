import HeaderMenu from "@/components/HeaderMenu";
import Hr from "@/components/ui/Hr";
import Image from "next/image";
import Link from "next/link";
import HeaderCountry from "./HeaderCountry";
import Br from "./ui/Br";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/75 backdrop-blur-lg">
      <Br cn="h-3 md:h-2 xl:h-3" />
      <div className="website-container padding-x-3">
        <div className="flex justify-between items-center ">
          <Logo />
          {/* <div className="hidden md:block">
            <HeaderCountry />
          </div> */}
          <div className="-mr-2 md:-mr-4">
            <HeaderMenu />
          </div>
        </div>
        <div className="flex justify-center">
          <HeaderCountry />
        </div>
      </div>
      <Br cn="h-3 md:h-2 xl:h-3" />
      <Hr />
    </header>
  );
}

export function Logo() {
  return (
    <div>
      <Link href="/">
        <h1>
          <Image
            className="w-[160px] h-[24px] lg:w-[192px] lg:h-[24px]"
            width={256}
            height={32}
            src="/assets/tfffwatch.svg"
            alt="TFFF Watch"
          />
        </h1>
        <p className="text-xs tracking-[0.14em] lg:text-sm lg:tracking-[0.20em] font-light">
          FOREVER STARTS NOW
        </p>
      </Link>
    </div>
  );
}
