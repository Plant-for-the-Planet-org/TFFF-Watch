import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-base-gray rounding-xl padding-3">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-y-4 flex-wrap typo-p">
        <div className="flex justify-center gap-2 items-center">
          <span>Built by</span>
          <span>
            <Image
              width={36}
              height={36}
              src="/assets/pftp.png"
              alt="Plant for the Planet Foundation"
            />
          </span>
          <span>In partnership with</span>
          <span>
            <Image
              width={36}
              height={36}
              src="/assets/oroverde.png"
              alt="Plant for the Planet Foundation"
            />
          </span>
          <span>
            <Image
              width={36}
              height={36}
              src="/assets/rffnorway.png"
              alt="Plant for the Planet Foundation"
            />
          </span>
        </div>
        <div></div>
        <div className="flex gap-1 justify-center flex-wrap md:flex-nowrap">
          <a href="">Imprint</a> · <a href="">Terms & Conditions</a> ·
          <p>Plant-for-the-Planet Foundation © 2025</p>
        </div>
      </div>
    </footer>
  );
}
