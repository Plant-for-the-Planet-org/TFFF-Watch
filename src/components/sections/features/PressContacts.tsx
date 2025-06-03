import Br from "@/components/ui/Br";
import Image from "next/image";
import Link from "next/link";

const persons = [
  {
    name: "Tina Anjou",
    role: "Teamlead Communications",
    src: "tina-anjou.png",
  },
  {
    name: "Victoria Krumbeck",
    role: "PR Manager",
    src: "victoria-krumbeck.png",
  },
];

export default function PressContacts() {
  return (
    <div className="bg-primary-light rounding-xl padding-3">
      <Br />
      <h2 className="text-center font-bold typo-h2">Contact</h2>
      <Br />
      <Br />
      <div className="flex gap-4 justify-center flex-wrap">
        {persons.map((el, key) => (
          <div
            key={key}
            className="group bg-white max-w-[244px] xl:grow aspect-[3/4] flex flex-col gap-y-4 justify-center items-center rounding-lg"
          >
            <div className="aspect-square rounded-full h-36 w-36 overflow-hidden">
              <Image
                className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                width={16 * 9}
                height={16 * 9}
                src={`/assets/persons/${el.src}`}
                alt={el.src}
              />
            </div>
            <div className="text-center typo-p">
              <p>
                <b>{el.name}</b>
              </p>
              <p className="text-sm">{el.role}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <Link href="#" className="rounded-full bg-[#219653] p-1.5">
                <Image
                  width={16 * 1}
                  height={16 * 1}
                  src="/assets/press-contact-linkedin.svg"
                  alt="linkedin"
                />
              </Link>
              <Link href="#" className="rounded-full bg-[#219653] p-1.5">
                <Image
                  width={16 * 1}
                  height={16 * 1}
                  src="/assets/press-contact-email.svg"
                  alt="email"
                />
              </Link>
              <Link href="#" className="rounded-full bg-[#219653] p-1.5">
                <Image
                  width={16 * 1}
                  height={16 * 1}
                  src="/assets/press-contact-phone.svg"
                  alt="phone"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Br />
    </div>
  );
}
