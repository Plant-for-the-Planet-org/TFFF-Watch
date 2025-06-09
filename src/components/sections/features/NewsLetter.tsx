// import Br from "@/components/ui/Br";
// import Image from "next/image";

export default function NewsLetter() {
  return (
    <div className="border border-base-gray outer-rounding outer-padding-3">
      <iframe
        src="https://plansfortheplanet.substack.com/embed"
        width="100%"
        height="320"
        // className="outer-rounding outer-padding-3"
        // style={{"border:1px solid #EEE; background:white;"}}
        // style={{ background: "transparent" }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
      {/* <Br />
      <Br />
      <div className="flex flex-col items-center">
        <Image
          width={64}
          height={64}
          src="/assets/tf.svg"
          alt="TFFF Watch Logo"
        />
        <h2 className="font-bold typo-h2">TFFF Watch</h2>
        <p className="text-center typo-p">
          Track TFFF news, events and analysis from your inbox
        </p>
        <Br />
        <Br />
        <div className="flex justify-center">
          <form
            action=""
            className="bg-white min-w-xs md:min-w-md flex border border-primary rounded-lg"
          >
            <input
              className="grow shrink px-4 py-4"
              placeholder="Type your email"
            />
            <button className="px-6 py-4 bg-primary text-white font-semibold rounded-r-lg">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <Br />
      <div className="text-end">Substack LOGO</div>
      <Br /> */}
    </div>
  );
}
