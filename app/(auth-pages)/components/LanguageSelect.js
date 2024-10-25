"use client";

import { useState, useEffect } from "react";
import { get, set } from "localstorage-slim";

export default function LanguageSelect() {
  const [language, setLanguage] = useState('kr');

  useEffect(() => {
    // Set default language to 'kr' if not already set
    const storedLanguage = get('lan') || 'kr';
    setLanguage(storedLanguage);
    if (!get('lan')) {
      set('lan', 'kr');
    }
  }, []);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    set('lan', newLanguage);
    setLanguage(newLanguage);
    document.cookie = `language=${newLanguage}; path=/;`;
    window.location.reload(); // Refresh the page
  };

  console.log(get('lan'));

  return (
    <div className="flex items-center">
    <p className="mr-2 text-black text-sm">Language</p>
    <select
      className="bg-white text-black"
      name="language"
      id="language"
      value={language}
      onChange={handleLanguageChange}
    >
      <option className="text-black" value="kr">한국어</option>
      <option className="text-black" value="en">English</option>
      <option className="text-black" value="ru">русский язык</option>
      <option className="text-black" value="ar">العربية</option>
    </select>
    </div>
  );
}
