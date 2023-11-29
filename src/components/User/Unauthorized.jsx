import { Button, Link } from "@nextui-org/react";

export default function Unauthorized() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">401</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl capitalize">
            Unauthorized access
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, you don&apos;t have permison to access to this page.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              as={Link}
              color="primary"
              href="/"
              className="font-medium text-lg lg:text-xl lg:h-12"
              radius="sm"
            >
              Go back home
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
