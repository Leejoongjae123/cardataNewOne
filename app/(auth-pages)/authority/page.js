import React from "react";
import { Button, Link } from "@nextui-org/react";
import { dictionary } from "@/app/(main-pages)/components/dictionary";
import { cookies } from "next/headers";
function page() {
  const languageCookie = cookies().get('language');
  const language = languageCookie ? languageCookie.value : 'kr';  
  return (
    <section className="bg-white  w-screen h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-5xl font-bold">
            {dictionary.nopage.title[language]}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
            {dictionary.nopage.subtitle[language]}
          </p>
          
          <Link href="/sign-in">
            {dictionary.nopage.gotosignin[language]}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default page;
