"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";

export default function FacebookButton({ dictionary, language }) {
  const router = useRouter();
  const signInWithFacebook = async () => {
    const supabase = createClient();
  
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${location.protocol}//${location.host}/auth/callback`,
        queryParams: {
          scope: "email,public_profile",
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
    router.push("/list");
  };

  return (
    <Button
      onClick={signInWithFacebook}
      className="w-full"
      startContent={<FaFacebook className="text-xl text-blue-600" />}
      variant="bordered"
    >
      {dictionary.signIn.facebook[language]}
    </Button>
  );
}
