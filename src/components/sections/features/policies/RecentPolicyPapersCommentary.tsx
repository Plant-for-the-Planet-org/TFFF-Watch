import PolicyCard from "@/components/sections/features/policies/PolicyCard";
import Br from "@/components/ui/Br";
import { Button } from "@/components/ui/Button";
import { ResponsiveContainer } from "@/components/ui/Container";
import { api, urls } from "@/utils/axios-helper";
import { formatDateFromExcelToData } from "@/utils/datetime-helper";
import { Policy } from "@/utils/types";
import { compareDesc, parse as dateParse } from "date-fns";
import { Fragment } from "react";

export default async function RecentPolicyPapersComentary() {
  let policyList: Policy[] = [];

  try {
    policyList = await api<Policy[]>({
      url: urls.policyBriefs,
      method: "GET",
      token: "", // Add token if required
    });

    policyList.sort((a, b) =>
      compareDesc(
        dateParse(a.date, "dd.MM.yyyy", new Date()),
        dateParse(b.date, "dd.MM.yyyy", new Date())
      )
    );
  } catch (error) {
    console.error("Error fetching policy papers:", error);
  }

  return (
    <ResponsiveContainer>
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
          {policyList.slice(0, 3).map((el) => (
            <Fragment key={el.id}>
              <PolicyCard
                title={el.title!}
                summary={el.summary!}
                image={el.featured_image!}
                publisher={el.publisher!}
                datetime={formatDateFromExcelToData(el.date)}
                url={el.url}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <Br />
      <Br />
      <div className="flex justify-center">
        <Button type="link" external href="/policies">
          See All
        </Button>
      </div>
      <Br />
    </ResponsiveContainer>
  );
}
