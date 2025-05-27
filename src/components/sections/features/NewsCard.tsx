import Br from "@/components/ui/Br";
import { IconButton } from "@/components/ui/Button";
import { formatForNewsCard } from "@/utils/datetime";

type Props = {
  title: string;
  summary: string;
  image: string;
  publisher: string;
  datetime: string;
  url: string;
};

export default function NewsCard(props: Props) {
  return (
    <div className="group shrink-0 w-full sm:w-6/12 lg:w-full p-3 bg-white border border-primary-medium rounded-xl">
      <div className="relative mb-2 overflow-hidden rounded-lg">
        <img
          className="aspect-[2.42] md:aspect-[4/3] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          src={props.image}
          alt="news"
        />
        <div className="absolute bottom-0 inset-x-0 px-3 pb-3">
          <div className="flex justify-between items-end">
            <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs">
              {props.publisher} · {formatForNewsCard(new Date(props.datetime))}
            </div>
            <IconButton href={props.url} cn="hidden md:block" external />
            <IconButton href={props.url} cn="md:hidden" small external />
          </div>
        </div>
      </div>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        <h3 className="mb-2 font-bold text-base">{props.title}</h3>
        <p className="text-sm xl:text-base">{props.summary}</p>
      </a>
      <Br cn="hidden md:block" />
    </div>
  );
}
