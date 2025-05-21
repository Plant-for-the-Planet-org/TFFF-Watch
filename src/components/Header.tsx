import Hr from "@/components/ui/Hr";
import Image from "next/image";

export default function Header() {
  return (
    <div>
      <div className="flex justify-between py-8">
        <Logo />
        <Menu />
      </div>
      <Hr />
    </div>
  );
}

export function Logo() {
  return (
    <div>
      <h1>
        <Image
          width={256}
          height={32}
          src="/assets/tfffwatch.svg"
          alt="TFFF Watch"
        />
      </h1>
      <p className="tracking-[0.32em] font-light typo-p">FOREVER STARTS NOW</p>
    </div>
  );
}

function Menu() {
  return (
    <div>
      <button className="p-4">
        <Image width={32} height={32} src="/assets/menu.svg" alt="TFFF Watch" />
      </button>
    </div>
  );
}
