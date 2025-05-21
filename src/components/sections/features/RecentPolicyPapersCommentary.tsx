import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import PaperCard from "@/components/sections/features/PaperCard";

export default function RecentPolicyPapersComentary() {
  return (
    <div className="bg-primary-light rounding-xl padding-3">
      <h2 className="text-center font-bold typo-h2">
        📰 Recent Policy Papers & Commentary
      </h2>
      <Br />
      <Br />
      <div>
        <div className="flex max-w-full lg:grid lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5 overflow-x-scroll overscroll-x-auto">
          <PaperCard
            title="An ‘Elegant’ Idea Could Pay Billions to Protect Trees"
            summary="Brazil is proposing a fund that would pay countries to protect tropical forests that are crucial to curbing climate change. It would generate returns, too."
            image="https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            publisher="New York Times"
            datetime={"2024-10-20"}
            url="https://www.pexels.com/photo/photo-of-people-gathering-in-room-2833037/"
          />
        </div>
      </div>
      <Br />
      <Br />
      <div className="flex justify-center">
        <Button external>See All</Button>
      </div>
      <Br />
    </div>
  );
}
