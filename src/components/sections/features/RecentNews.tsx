// "use client";

import Br from "@/components/ui/Br";
import NewsCard from "./NewsCard";
import { Button } from "@/components/ui/Button";
import { ResponsiveContainer } from "@/components/ui/Container";
import { Fragment } from "react";
import { api, urls } from "@/utils/axios-helper";
import { formatDateFromExcelToData } from "@/utils/datetime";
import { News } from "@/utils/types";

export default async function RecentNews() {
  let newsList: News[] = [];

  try {
    newsList = await api<News[]>({
      url: urls.news,
      method: "GET",
      token: "", // Add token if required
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <ResponsiveContainer cn="">
      <div className="bg-secondary-light outer-rounding outer-padding-3">
        <Br />
        <h2 className="text-center font-bold typo-h2">🌿 Recent News</h2>
        <Br />
        <Br />
        <div>
          {/* <div className="flex max-w-full lg:grid lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5 overflow-x-scroll overscroll-x-auto scrollbar-transparent"> */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5 place-items-center place-content-center-safe"> */}
          <div className="grid grid-cols-1 md:flex gap-3 md:gap-4 xl:gap-5 justify-center">
            {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5"> */}
            {newsList.slice(0, 3).map((el) => (
              <Fragment key={el.id}>
                <NewsCard
                  title={el.title!}
                  summary={el.summary!}
                  image={el.featured_image!}
                  publisher={el.publisher!}
                  // publisher={el.author}
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
          <Button type="link" external>
            See All
          </Button>
        </div>
        <Br />
      </div>
    </ResponsiveContainer>
  );
}
