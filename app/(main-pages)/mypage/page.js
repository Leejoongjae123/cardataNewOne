import React from "react";
import { createClient } from "@/utils/supabase/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabContent from "./components/TabContent";

export default async function Page() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <div className="mt-10">
      <div className="page-heading">
        <h1 className="page-title test"> My Page </h1>

        <nav className="nav__underline">
          <ul className="group" uk-switcher="connect: #group-tabs; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium">
            <li><a href="#"> Info</a></li>
            <li><a href="#"> Estimates</a></li>
            <li><a href="#">Chat</a></li>
          </ul>
        </nav>
      </div>
      <TabContent session={session} />
    </div>
  );
}