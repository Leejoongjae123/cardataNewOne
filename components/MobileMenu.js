'use client'

import React, { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowMenu(true);
    } else {
      const timer = setTimeout(() => setShowMenu(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleMenu} className="text-2xl">
        ☰
      </button>
      {showMenu && (
        <div className={`absolute top-[10vh] mt-2 left-0 w-full bg-white shadow-md rounded-lg mx-10 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="p-4">
            <Link href={"/list"} className="block py-2">LIST</Link>
            <Link href={"/mypage"} className="block py-2">MY PAGE</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
