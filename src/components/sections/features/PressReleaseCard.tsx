import Br from "@/components/ui/Br";
import { IconButton } from "@/components/ui/Button";
import { formatPublisherForCardBadge } from "@/utils/content-helper";
import { formatDateForCardBadge } from "@/utils/datetime-helper";

type Props = {
  title: string;
  summary: string;
  image: string;
  publisher?: string;
  datetime: string;
  url: string;
};

export default function PressReleaseCard(props: Props) {
  return (
    // <div className="group shrink-0 w-full sm:w-6/12 lg:w-full p-3 bg-white border border-primary-medium-light rounded-xl">
    <div className="group flex-1/3 grow-0 shrink p-3 bg-white border border-primary-medium-light rounding-xl">
      <div className="relative mb-2 overflow-hidden rounded-lg">
        {/* <img
          className="aspect-[2.42] md:aspect-[4/3] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          src={props.image}
          alt="news"
        /> */}
        <img
          className="aspect-4/3 p-4 md:p-9 object-contain transition-transform duration-300 ease-in-out scale-90 group-hover:scale-100 rounding-lg"
          src={props.image}
          alt="press release"
        />
        <div className="absolute bottom-0 inset-x-0 px-3 pb-3">
          <div className="flex justify-between items-end">
            <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs max-h-10 flex gap-x-1 flex-wrap">
              <p className="max-h-4 max-w-fit overflow-hidden">
                <span>
                  <span className="hidden md:inline-block xl:hidden">
                    {formatPublisherForCardBadge(props.publisher!, 16)}
                  </span>
                  <span className="md:hidden xl:inline-block">
                    {formatPublisherForCardBadge(props.publisher!)}
                  </span>
                </span>
              </p>
              <span> · </span>
              <p className="whitespace-nowrap">
                {formatDateForCardBadge(new Date(props.datetime))}
              </p>
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
