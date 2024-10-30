import React from "react";
import {Link} from "@nextui-org/react";
function page() {
  return (
    <section className="bg-white  w-full h-full">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-4xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
            Page Not Found
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            The requested product is no longer available, or you may have
            followed an incorrect link.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default page;
