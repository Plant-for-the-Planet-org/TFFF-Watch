import Image from "next/image";

export function DownloadWorldMap() {
  return (
    <button className="bg-white p-2 rounded-lg cursor-pointer">
      <Image width={24} height={24} src="/assets/download-map.svg" alt="" />
    </button>
  );
}
