"use client";

import React, { useState } from "react";
import Answer from "./Answer";
import Role from "./Role";
import Products from "./Products";
export default function TabContent({ session }) {
  const [activeTab, setActiveTab] = useState("role");

  return (
    <div>
      <ul className="uk-switcher" id="group-tabs">
        <li className={activeTab === "role" ? "uk-active" : ""}>
          <Role session={session} />
        </li>
        <li className={activeTab === "answer" ? "uk-active" : ""}>
          <Answer session={session} />
        </li>

        <li className={activeTab === "products" ? "uk-active" : ""}>
          <Products session={session} />
        </li>
      </ul>
    </div>
  );
}
