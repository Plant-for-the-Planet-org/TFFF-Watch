import PolicyCard from "@/components/sections/features/policies/PolicyCard";
import Br from "@/components/ui/Br";
import { ResponsiveContainer } from "@/components/ui/Container";
import { api, urls } from "@/utils/axios-helper";
import { formatDateFromExcelToData } from "@/utils/datetime-helper";
import { Policy } from "@/utils/types";
import { compareDesc, parse as dateParse } from "date-fns";
import { Fragment } from "react";

export default async function AllPolicies() {
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
      <Br />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 xl:gap-5">
          {policyList.slice(0, 12).map((el) => (
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
    </ResponsiveContainer>
  );
}
