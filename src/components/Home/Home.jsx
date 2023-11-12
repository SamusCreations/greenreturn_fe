import { Button, Image, Link } from "@nextui-org/react";
import recycling from "../../assets/recycling.png";
import shadow from "../../assets/shadow.png";

export function Home() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="flex-1 mx-auto my-auto relative">
        <Image
          width={700}
          alt="recycling image"
          src={recycling}
          radius="none"
          className="animate-float max-h-[350px] lg:max-h-[700px]"
        />
        <Image
          width={700}
          alt="shadow image"
          src={shadow}
          radius="none"
          className="absolute bottom-6 lg:bottom-20 left-1/2 transform -translate-x-1/2 max-h-[350px] lg:max-h-[700px]"
        />
      </div>
      <div className="flex-1 animate-appearance-in m-4">
        <h1 className="font-bold text-6xl lg:text-8xl text-start uppercase">
          <span style={{ color: "#1D9634" }}>Recycle </span>
          and earn!
        </h1>
        <p
          className="font-medium text-base lg:text-2xl mt-8"
          style={{ color: "#434443" }}
        >
          At Green Return, your recycling efforts pay off. Earn eco-coins for a
          greener planet and exciting rewards. Join us and make a difference
          today!
        </p>
        <div className="flex items-center justify-center">
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="shadow"
            className="font-medium text-2xl lg:text-3xl uppercase mt-10 mb-10 lg:h-12"
            radius="sm"
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}
