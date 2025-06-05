import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import PaperCard from "@/components/sections/features/PaperCard";

export default function RecentPolicyPapersComentary() {
  return (
    <div className="bg-primary-light outer-rounding outer-padding-3">
      <Br />
      <h2 className="text-center font-bold typo-h2">
        📰 Recent Policy Papers & Commentary
      </h2>
      <Br />
      <Br />
      <div>
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5 overflow-x-scroll overscroll-x-auto"> */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5 place-items-center place-content-center-safe"> */}
        <div className="grid grid-cols-1 md:flex gap-3 md:gap-4 xl:gap-5 justify-center">
          {/* <div className="flex gap-3 md:gap-4 xl:gap-5"> */}
          <PaperCard
            title="Comments on Tropical Forest Forever Facility Concept Note V.2"
            summary=""
            image="/assets/papers/griffith.png"
            url="https://www.pexels.com/photo/photo-of-people-gathering-in-room-2833037/"
          />
          <PaperCard
            title="Joint Policy Recommendations of German NGOs towards Concept Note 3.0"
            summary=""
            image="/assets/papers/oroverde.png"
            url="https://www.pexels.com/photo/photo-of-people-gathering-in-room-2833037/"
          />
          <PaperCard
            title="Joint Policy Recommendations of German NGOs towards Concept Note 3.0"
            summary=""
            image="/assets/papers/oroverde.png"
            url="https://www.pexels.com/photo/photo-of-people-gathering-in-room-2833037/"
          />
          {/* <PaperCard
            title="Joint Policy Recommendations of German NGOs towards Concept Note 3.0"
            summary=""
            image="/assets/papers/oroverde.png"
            url="https://www.pexels.com/photo/photo-of-people-gathering-in-room-2833037/"
          /> */}
        </div>
      </div>
      <Br />
      <Br />
      <div className="flex justify-center">
        <Button type="link" external>
          See All
        </Button>
      </div>
      <Br />
    </div>
  );
}
