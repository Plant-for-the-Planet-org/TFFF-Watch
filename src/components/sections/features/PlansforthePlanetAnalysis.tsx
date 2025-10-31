import Br from "@/components/ui/Br";
import { ResponsiveContainer } from "@/components/ui/Container";
import { urls } from "@/utils/axios-helper";
import { News } from "@/utils/types";
import { compareDesc } from "date-fns";
import { Fragment } from "react";
import { XMLParser } from "fast-xml-parser";
import NewsCard from "./NewsCard";
import NewsLetter from "./NewsLetter";

type SubstackRSSItem = {
  title: string;
  link: string;
  pubDate: string;
  "content:encoded": string;
  description: string;
  guid: string;
  "dc:creator": string;
};

type SubstackRSSFeed = {
  rss: {
    channel: {
      item: SubstackRSSItem[];
    };
  };
};

function mapSubstackToNews(item: SubstackRSSItem): News {
  // Extract image from content:encoded HTML
  const imageMatch = item["content:encoded"]?.match(/<img[^>]+src="([^">]+)"/);
  const featuredImage = imageMatch ? imageMatch[1] : undefined;

  return {
    id: item.guid,
    date: new Date(item.pubDate).toISOString(),
    publisher: "Plans for the Planet",
    title: item.title,
    summary: item.description,
    featured_image: featuredImage,
    locale: "en",
    author: item["dc:creator"],
    url: item.link,
  };
}

export default async function PlansforthePlanetAnalysis() {
  let articles: News[] = [];

  try {
    const response = await fetch(urls.substackArticles, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    const xmlData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });
    const parsedData = parser.parse(xmlData) as SubstackRSSFeed;

    const items = parsedData.rss.channel.item || [];
    articles = items.map(mapSubstackToNews);

    // Sort by date (most recent first) and take top 3
    articles.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    articles = articles.slice(0, 3);
  } catch (error) {
    console.error("Error fetching Substack articles:", error);
  }

  return (
    <ResponsiveContainer cn="">
      <div className="bg-secondary-light outer-rounding outer-padding-3">
        <Br />
        <h2 className="text-center font-bold typo-h2">
          🌳 Plans for the Planet Analysis
        </h2>
        <Br />
        <Br />
        <div>
          {/* <div className="flex max-w-full lg:grid lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5 overflow-x-scroll overscroll-x-auto scrollbar-transparent"> */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5 place-items-center place-content-center-safe"> */}
          <div className="grid grid-cols-1 md:flex gap-3 md:gap-4 xl:gap-5 justify-center">
            {articles.map((article) => (
              <Fragment key={article.id}>
                <NewsCard
                  title={article.title!}
                  summary={article.summary!}
                  image={article.featured_image!}
                  publisher={article.publisher!}
                  datetime={article.date}
                  url={article.url}
                />
              </Fragment>
            ))}
          </div>
        </div>
        <Br />
        {/* <Br />
        <div className="flex justify-center">
          <Button type="link" external>
            See All
          </Button>
        </div>
        <Br /> */}
        <NewsLetter />
        <Br />
      </div>
    </ResponsiveContainer>
  );
}
