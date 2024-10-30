"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton({ dictionary, language }) {
  const router = useRouter();
  const signInWithGoogle = async () => {
    const supabase = createClient();
  
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.protocol}//${location.host}/auth/callback`,
        queryParams: {
          // Google은 기본 scope만으로 충분하므로 제거
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
      onClick={signInWithGoogle}
      className="w-full"
      startContent={<FcGoogle className="text-xl" />}
      variant="bordered"
    >
      {dictionary.signIn.google[language]}
    </Button>
  );
}
