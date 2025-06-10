import { IconButton } from "@/components/ui/Button";

type Props = {
  title: string;
  summary?: string;
  image: string;
  publisher?: string;
  datetime?: string;
  url: string;
};

export default function PaperCard(props: Props) {
  return (
    // <div className="group shrink-0 w-full sm:w-6/12 lg:w-full padding-2 bg-white border border-primary-medium-light rounding-xl">
    <div className="group flex-1/3 grow-0 shrink p-3 bg-white border border-primary-medium-light rounding-xl">
      <div className="flex flex-row gap-2 items-center md:block">
        <div className="flex-2/5">
          <div className="relative">
            <div className="absolute z-10 bottom-0 inset-x-0 px-2 pb-2">
              <div className="flex justify-between items-center">
                <div></div>
                <IconButton href={props.url} cn="hidden md:block" external />
                <IconButton href={props.url} cn="md:hidden" small external />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img
                className="aspect-4/3 p-4 md:py-6 md:px-8 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110 rounding-lg"
                src={props.image}
                alt="policy paper"
              />
            </div>
          </div>
        </div>
        <div className="flex-3/5">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            <h3 className="mb-2 font-bold typo-p">{props.title}</h3>
          </a>
        </div>
      </div>
    </div>
  );
}
