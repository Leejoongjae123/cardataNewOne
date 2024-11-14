"use client";

import React, { useState } from "react";
import MyInfo from "./MyInfo";
import MyAuth from "./MyAuth";
import MyPrice from "./MyPrice";
import StreamChat from "./StreamChat";
export default function TabContent({ profiles, session, language, dictionary }) {
  const [activeTab, setActiveTab] = useState("info");


  const userData = {
    id: profiles.email.split("@")[0], // '@' 기준으로 분할하여 첫 번째 부분만 사용
    name: "client",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  };
  const carData = {}
  return (
    <div>
      <ul className="uk-switcher" id="group-tabs">
        <li className={activeTab === "chat" ? "uk-active" : ""}>
          <MyPrice
            session={session}
            language={language}
            dictionary={dictionary}
          />
        </li>
        <li className={activeTab === "estimates" ? "uk-active" : ""}>
          <MyAuth
            session={session}
            language={language}
            dictionary={dictionary}
          />
        </li>
        <li className={activeTab === "info" ? "uk-active" : ""}>
          <MyInfo
            session={session}
            language={language}
            dictionary={dictionary}
          />
        </li>
        <li className={activeTab === "info" ? "uk-active" : ""}>
          <StreamChat
            userData={userData}
            carData={carData}
            language={language}
            
          />
        </li>
      </ul>
    </div>
  );
}
