"use client";

import { createClient } from "@/utils/supabase/client"; // 앞서 만든 클라이언트 생성 함수 import
import { Button } from "@nextui-org/react"; // UI를 위한 버튼 컴포넌트 import
import { signInWithKakao } from "@/app/actions";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function KakaoButton({ dictionary, language }) {
  const signInWithKakao = async () => {
    const supabase = createClient();
  
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          scope: "account_email",
        },
      },
    });
  
    if (error) {
      console.error("Login error:", error);
      return;
    }
  
    // 로그인 성공 후 사용자 정보 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (user?.email) {
      // profiles 테이블 업데이트
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ email: user.email, name: user.name })
        .eq("id", user.id);
  
      if (updateError) {
        console.error("Profile update error:", updateError);
      }
    }
    
    // 로그인 성공 후 /list 페이지로 리다이렉션
    window.location.href = '/list';
  };

  // return <Button onClick={signInWithKakao}>카카오 로그인</Button>;
  return (
    <Button
      onClick={signInWithKakao}
      className="w-full"
      startContent={<RiKakaoTalkFill className="text-2xl text-yellow-400" />}
      variant="bordered"
      // isLoading={pending}
    >
      {dictionary.signIn.kakao[language]}
    </Button>
  );
}
