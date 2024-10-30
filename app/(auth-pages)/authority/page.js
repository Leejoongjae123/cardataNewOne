import React from "react";
import { Button, Link } from "@nextui-org/react";

function page() {
  return (
    <section className="bg-white  w-screen h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-5xl font-bold">
            Now in Review
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
            Your account is now under review.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            We apologize for the inconvenience.
          </p>
          <Link href="/sign-in">
            Go to Login Page
          </Link>
        </div>
      </div>
    </section>
  );
}

export default page;
