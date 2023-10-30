import React from "react";
import { Divider, Image } from "@nextui-org/react";
import logo from "../../assets/greenreturn_logo.png";

export function Footer() {
  return (
    <div className="flex flex-col max-w-6xl mx-auto items-center">
      <Divider className="my-8 " />
      <Image
        width={200}
        alt="Green Return Logo"
        src={logo}
        radius="none"
        className="mx-auto my-4"
      />
      <div className="justify-center items-center text-center">
        <p className="text-small text-default-400 my-4">
          © 2023 Green Return. All rights reserved.
        </p>
      </div>
    </div>
  );
}
