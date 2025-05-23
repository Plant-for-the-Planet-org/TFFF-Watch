import { ISO2Param } from "@/components/HeaderCountry";

type Props = {
  params: Promise<ISO2Param>;
};

export default async function Page({}: Props) {
  // const { iso } = await params;
  // console.log(new Intl.DisplayNames(["en"], { type: "region" }).of(iso));

  return <div></div>;
}
