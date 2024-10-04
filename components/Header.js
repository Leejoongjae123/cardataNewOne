import React from "react";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import Link from "next/link";
import DeployButton from "@/components/deploy-button";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Image from "next/image";
const Header = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-[10vh] fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="w-full md:w-2/3  flex justify-around items-center p-3 px-5 text-sm font-bold">
        <div className="header-logo">
          <Link href={"/list"}>
            <Image
              src="/images/logo1.png"
              alt="Sincar"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-center px-5"><Link href={"/list"}>LIST</Link></div>
          <div className="text-center px-5"><Link href={"/mypage"}>MY PAGE</Link></div>
          
          
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      </div>
    </nav>
  );
};

export default Header;
