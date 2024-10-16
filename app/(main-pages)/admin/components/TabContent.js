"use client";

import React, { useState } from "react";
import Answer from "./Answer";
import Role from "./Role";
import Products from "./Products";
export default function TabContent({ session }) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div>
      <ul className="uk-switcher" id="group-tabs">
        <li className={activeTab === "chat" ? "uk-active" : ""}>
          <Role session={session} />
        </li>
        <li className={activeTab === "estimates" ? "uk-active" : ""}>
          <Answer session={session} />
        </li>

        <li className={activeTab === "info" ? "uk-active" : ""}>
          <Products session={session} />
        </li>
      </ul>
    </div>
  );
}
