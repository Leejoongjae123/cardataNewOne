import React from "react";
import { createClient } from "@/utils/supabase/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabContent from "./components/TabContent";
import { dictionary } from "@/app/(main-pages)/components/dictionary";
import LanguageSelect from "@/app/(auth-pages)/components/LanguageSelect";
import { cookies } from "next/headers";
export default async function Page() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const languageCookie = cookies().get("language");
  const language = languageCookie ? languageCookie.value : "kr";
  // Fetch car data from Supabase
  const { data: profiles, error: error1 } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (error1) {
    console.error("Error fetching car data1:", error1);
    // Handle the error appropriately
  }
  return (
    <div className="mt-10">
      <div className="page-heading flex flex-col justify-start items-start">
        {/* <h1 className="page-title test"> My Page </h1> */}
        <div className="flex flex-row justify-start items-start w-full">
          <LanguageSelect />
        </div>
        <nav className="nav__underline w-full">
          <ul
            className="group w-full"
            uk-switcher="connect: #group-tabs; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
          >
            <li className="col-span-1">
              <a href="#"> {dictionary.mypage.estimates[language]}</a>
            </li>
            <li className="col-span-1">
              <a href="#"> {dictionary.mypage.auth[language]}</a>
            </li>
            <li className="col-span-1">
              <a href="#"> {dictionary.mypage.info[language]}</a>
            </li>
            <li className="col-span-1">
              <a href="#"> {dictionary.mypage.chat[language]}</a>
            </li>
          </ul>
        </nav>
      </div>
      <TabContent
        profiles={profiles}
        session={session}
        language={language}
        dictionary={dictionary}
      />
    </div>
  );
}
