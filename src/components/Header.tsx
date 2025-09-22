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
          <div className="hidden md:flex justify-center">
            <HeaderCountry />
            <div className="w-[160px] lg:w-[192px]"></div>
          </div>
          <div className="-mr-2 md:-mr-4">
            <HeaderMenu />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:hidden">
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
            className=" h-[24px] w-[160px] lg:h-[48px] lg:w-[256px]"
            width={256}
            height={32}
            src="/assets/tfffwatch-header-logo.svg"
            alt="TFFF Watch"
          />
        </h1>
      </Link>
    </div>
  );
}
