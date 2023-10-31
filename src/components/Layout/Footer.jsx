import React from "react";
import {  Image } from "@nextui-org/react";
import logo from "../../assets/greenreturn_logo.png";

export function Footer() {
  return (
    <footer className="flex flex-col  mx-auto mt-32 w-full max-w-container px-4 sm:px-6 lg:px-8 justify-center md:justify-between">
    <div className="flex flex-col border-t borderslate-900/5 items-center">
      
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
    </footer>
  );
}
