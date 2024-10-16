import React from "react";
import { Button, Link } from "@nextui-org/react";

function page() {
  return (
    <section class="bg-white dark:bg-gray-900 w-screen h-screen flex justify-center items-center">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h1 class="mb-4 text-5xl font-bold">
            검토중
          </h1>
          <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            관리자가 당신의 계정의 권한을 확인중입니다.
          </p>
          <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            불편을 드려 죄송합니다.
          </p>
          <Link href="/sign-in">
              로그인 화면으로
          </Link>
        </div>
      </div>
    </section>
  );
}

export default page;
