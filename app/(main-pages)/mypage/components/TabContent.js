'use client';

import React, { useState } from "react";
import MyInfo from "./MyInfo";
import MyAuth from "./MyAuth";
import MyPrice from "./MyPrice";

export default function TabContent({ session }) {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div>
      <ul className="uk-switcher" id="group-tabs">
        <li className={activeTab === 'info' ? 'uk-active' : ''}>
          <MyInfo session={session} />
        </li>
        <li className={activeTab === 'estimates' ? 'uk-active' : ''}>
          <MyAuth session={session} />
        </li>
        <li className={activeTab === 'chat' ? 'uk-active' : ''}>
          <MyPrice session={session} />
        </li>
      </ul>
    </div>
  );
}