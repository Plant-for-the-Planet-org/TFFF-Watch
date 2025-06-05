import Br from "@/components/ui/Br";
import Image from "next/image";
import Link from "next/link";

const persons = [
  {
    name: "Tina Anjou",
    role: "Teamlead Communications",
    src: "tina-anjou.png",
    linkedin: "https://www.linkedin.com/in/tina-anjou-5952786/",
    email: "mailto:tina.anjou@plant-for-the-planet.org",
    phone: "",
  },
  {
    name: "Victoria Krumbeck",
    role: "PR Manager",
    src: "victoria-krumbeck.png",
    linkedin: "",
    email: "mailto:victoria.krumbeck@plant-for-the-planet.org",
    phone: "",
  },
];

export default function PressContacts() {
  return (
    <div className="bg-primary-light outer-rounding outer-padding-3">
      <Br />
      <h2 className="text-center font-bold typo-h2">Contact</h2>
      <Br />
      <Br />
      <div className="flex gap-4 justify-center flex-wrap">
        {persons.map((el, key) => (
          <div
            key={key}
            className="group bg-white w-[244px] aspect-[3/4] flex flex-col gap-y-4 justify-center items-center rounding-lg"
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
              <Link
                className="rounded-full bg-[#219653] p-1.5"
                href={el.linkedin ?? "#"}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  width={16 * 1}
                  height={16 * 1}
                  src="/assets/press-contact-linkedin.svg"
                  alt="linkedin"
                />
              </Link>
              <Link
                className="rounded-full bg-[#219653] p-1.5 py-2"
                href={el.email ?? "#"}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  width={16 * 1}
                  height={16 * 1}
                  src="/assets/press-contact-email.svg"
                  alt="email"
                />
              </Link>
              <Link
                className="rounded-full bg-[#219653] p-1.5"
                href={el.phone ?? "#"}
                target="_blank"
                rel="noreferrer"
              >
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
