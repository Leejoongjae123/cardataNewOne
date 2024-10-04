'use client';

import React, { useState } from "react";
import MyInfo from "./MyInfo";
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
          <MyPrice session={session} />
        </li>
        <li className={activeTab === 'chat' ? 'uk-active' : ''}>
          {/* Chat 컴포넌트를 여기에 추가하세요 */}
        </li>
      </ul>
    </div>
  );
}