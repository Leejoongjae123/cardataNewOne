"use client";

import { Button } from "@nextui-org/react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { signInWithKakao } from "@/app/actions";

export default function KakaoButton({ signInWithKakao, dictionary, language }) {
  return (
    <Button
      type="submit"
      formAction={signInWithKakao}
      className="w-full"
      startContent={<RiKakaoTalkFill className="text-2xl text-yellow-400" />}
      variant="bordered"
      // isLoading={pending}
    >
      {dictionary.signIn.kakao[language]}
    </Button>
  );
}
