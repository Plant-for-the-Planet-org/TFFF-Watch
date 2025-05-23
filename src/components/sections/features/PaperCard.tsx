import { IconButton } from "@/components/ui/Button";

type Props = {
  title: string;
  summary: string;
  image: string;
  publisher: string;
  datetime: string;
  url: string;
};

export default function PaperCard(props: Props) {
  return (
    <div className="shrink-0 w-10/12 sm:w-6/12 lg:w-full padding-2 bg-white border border-primary-medium rounding-xl">
      <div className="relative mb-2">
        <div className="absolute bottom-0 inset-x-0 px-4 pb-4">
          <div className="flex justify-between items-center">
            <div></div>
            <IconButton external />
          </div>
        </div>
        <img
          className="aspect-4/3 object-cover rounding-lg"
          src={props.image}
          alt="news"
        />
      </div>
      <h3 className="mb-2 font-bold typo-p">{props.title}</h3>
    </div>
  );
}
