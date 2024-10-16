import React from "react";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import MobileMenu from "@/components/MobileMenu";

const Header = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-[10vh] fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="w-full md:w-[50vw] flex justify-between items-center p-3 px-5 text-sm font-bold">
        <div className="flex justify-center items-center">
          <div className="block md:hidden">
          <MobileMenu />
          </div>
          <div className="header-logo">
            <div className="block md:hidden">
            <Link href={"/list"}>
              <Image
                src="/images/logo1.png"
                alt="Sincar"
                width={100}
                height={100}
              />
            </Link>
            </div>
            <div className="hidden md:block">
            <Link href={"/list"}>
              <Image
                src="/images/logo1.png"
                alt="Sincar"
                width={200}
                height={200}
              />
            </Link>
            </div>
            
          </div>
        </div>

        <div className="hidden md:flex w-full flex-row justify-center items-center">
          <div className="px-2 md:px-10">
            <Link href={"/list"}>LIST</Link>
          </div>
          <div className="px-2 md:px-10">
            <Link href={"/mypage"}>MY PAGE</Link>
          </div>
        </div>

        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      </div>
    </nav>
  );
};

export default Header;
