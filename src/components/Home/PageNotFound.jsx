import { Image } from "@nextui-org/react";
import error from "../../assets/Error.png";

export function PageNotFound() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex-1">
          <Image
            component="img"
            alt="404 Error"
            src={error}
            isBlurred
            width={800}
          />
        </div>
        <div className="flex-1 text-center">
          <p className="text-4xl font-bold capitalize py-2">Page not found!</p>
          <p className="text-xl font-medium py-2">
            The page you are looking for might have been deleted, changed its
            name, or is temporarily unavailable.
          </p>
        </div>
      </div>
    </div>
  );
}
