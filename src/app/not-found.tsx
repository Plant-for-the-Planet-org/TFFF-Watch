import { Logo } from "@/components/Header";
import Br from "@/components/ui/Br";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="fixed inset-0 outer-padding-3 bg-white z-50">
      <div className="rounding-lg bg-primary-light h-full">
        <div className="h-full flex flex-col items-center justify-center">
          <Br />
          <Logo />
          <Br />
          <Br />
          <Br />
          <Br />
          <Image
            className="p-4"
            width={352}
            height={256}
            src={"/assets/error-404.png"}
            alt=""
          />
          <Br />
          <Br />
          <div className="text-center max-w-xl p-3">
            <h1 className="typo-h2 font-bold">Page Not Found</h1>
            <Br />
            <p className="typo-p">
              The page you are looking for does not exist or moved permanently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
