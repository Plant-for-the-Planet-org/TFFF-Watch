import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  OverlayComponent: ReactNode;
};

export default function SecondaryHero(props: Props) {
  return (
    <div>
      <div className="outer-rounding overflow-hidden relative">
        {props.OverlayComponent}
        <Image
          className="w-full aspect-[3.5] lg:aspect-[4.5] object-bottom object-cover"
          width={1320}
          height={277}
          priority
          // fetchPriority="high"
          src="/assets/secondary-hero.webp"
          alt="The TFFF Idea"
        />
      </div>
    </div>
  );
}

export function OverlayTheTFFFIdea() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h2 className="font-bold text-white typo-h1">The TFFF, Explained</h2>
    </div>
  );
}

export function OverlayFriendsOfTheTFFF() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h2 className="font-bold text-white typo-h1">Friends of the TFFF</h2>
    </div>
  );
}

export function OverlayAboutTFFFWatch() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h2 className="font-bold text-white typo-h1">About TFFF Watch</h2>
    </div>
  );
}

export function OverlayPressTFFFWatch() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h2 className="font-bold text-white typo-h1">Press</h2>
    </div>
  );
}
