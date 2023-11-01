import { Image } from "@nextui-org/react";
import recycling from "../../assets/recycling_icon.png";

export function Home() {
  return (
    <div className="flex items-center">
      <Image
        width={700}
        alt="Green Return Logo"
        src={recycling}
        radius="none"
        className="flex-1 mx-auto my-auto"
      />

      <div className="flex-1">
        <h1 className="font-bold text-8xl text-start uppercase">
          <span style={{ color: "#1D9634" }}>Recycle </span>
          and earn!
        </h1>
        <p
          className="font-medium max-w-xl text-xl pt-4"
          style={{ color: "#434443" }}
        >
          At Green Return, your recycling efforts pay off. Earn eco-coins for a
          greener planet and exciting rewards. Join us and make a difference
          today!
        </p>
      </div>
    </div>
  );
}
