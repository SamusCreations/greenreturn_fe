import React from "react";
import { Divider, Image } from "@nextui-org/react";
import logo from "../../assets/greenreturn_logo.png";

export function Footer() {
  return (
    <footer className="flex flex-col max-w-8xl mx-auto items-center sticky bottom-0 w-full flex-wrap justify-center
     gap-y-6 gap-x-12 border-t border-blue-gray-50 text-center md:justify-between">
   
      <Divider className="my- " />
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
   
    </footer>
  );
}
