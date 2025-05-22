import Menu from "@/components/Menu";
import Hr from "@/components/ui/Hr";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between py-4 lg:py-6">
        <Logo />
        <Menu />
      </div>
      <Hr />
    </header>
  );
}

export function Logo() {
  return (
    <div className="px-2">
      <Link href="/">
        <h1>
          <Image
            className="w-[160px] h-[24px] lg:w-[256px] lg:h-[32px]"
            width={256}
            height={32}
            src="/assets/tfffwatch.svg"
            alt="TFFF Watch"
          />
        </h1>
        <p className="text-xs tracking-[0.14em] lg:text-base lg:tracking-[0.32em] font-light">
          FOREVER STARTS NOW
        </p>
      </Link>
    </div>
  );
}
