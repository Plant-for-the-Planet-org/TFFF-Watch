import Br from "@/components/ui/Br";
import { IconButton } from "@/components/ui/Button";
import { formatForNewsCard } from "@/utils/datetime";

type Props = {
  title: string;
  summary?: string;
  image: string;
  publisher?: string;
  datetime: string;
  url: string;
};

// export default function PaperCard(props: Props) {
//   return (
//     // <div className="group shrink-0 w-full sm:w-6/12 lg:w-full padding-2 bg-white border border-primary-medium-light rounding-xl">
//     <div className="group flex-1/3 grow-0 shrink p-3 bg-white border border-primary-medium-light rounding-xl">
//       <div className="flex flex-row gap-2 items-center md:block">
//         <div className="flex-2/5">
//           <div className="relative">
//             <div className="absolute z-10 bottom-0 inset-x-0 px-2 pb-2">
//               <div className="flex justify-between items-center">
//                 <div className="hidden md:block bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs">
//                   {props.publisher?.slice(0, 32)} ·{" "}
//                   {formatForNewsCard(new Date(props.datetime))}
//                 </div>
//                 <IconButton href={props.url} cn="hidden md:block" external />
//                 <IconButton href={props.url} cn="md:hidden" small external />
//               </div>
//             </div>
//             <div className="flex justify-center items-center">
//               <img
//                 className="aspect-4/3 p-4 md:py-6 md:px-8 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110 rounding-lg"
//                 src={props.image}
//                 alt="policy paper"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex-3/5">
//           <a href={props.url} target="_blank" rel="noopener noreferrer">
//             <h3 className="mb-2 font-bold typo-p">{props.title}</h3>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function PaperCard(props: Props) {
  return (
    // <div className="group shrink-0 w-full sm:w-6/12 lg:w-full p-3 bg-white border border-primary-medium-light rounded-xl">
    <div className="group flex-1/3 grow-0 shrink p-3 bg-white border border-primary-medium-light rounding-xl">
      <div className="flex flex-row gap-2 items-center md:flex-col h-full">
        <div className="flex-2/5 w-full h-full md:flex-auto border border-base-gray relative mb-2 overflow-hidden rounding-lg">
          <img
            className="w-full aspect-[4/3] p-4 object-contain object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
            src={props.image}
            alt="news"
          />
          <div className="md:hidden absolute bottom-0 right-0 m-1">
            <IconButton href={props.url} small external />
          </div>
          <div className="hidden md:block absolute bottom-0 inset-x-0 px-3 pb-3">
            <div className="flex justify-between items-end">
              <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs max-h-10 flex gap-x-1 flex-wrap">
                <p className="max-h-4 max-w-fit overflow-hidden">
                  {props.publisher}
                </p>
                <span> · </span>
                <p className="whitespace-nowrap">
                  {formatForNewsCard(new Date(props.datetime))}
                </p>
              </div>
              <div className="">
                <IconButton href={props.url} external />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-3/5 md:flex-auto ">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            <h3 className="mb-2 font-bold text-base">{props.title}</h3>
            {/* <p className="text-sm xl:text-base">{props.summary}</p> */}
          </a>
        </div>
      </div>
      <Br cn="hidden md:block" />
    </div>
  );
}
