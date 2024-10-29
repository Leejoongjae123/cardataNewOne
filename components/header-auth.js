import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import {SubmitButton} from "@/components/submit-button";
import { dictionary } from "@/app/(auth-pages)/dictionary/dictionary";
import { cookies } from "next/headers";
export default async function AuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  const language = cookies().get("language")?.value || "kr";

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4">
      <p className="hidden md:block">{user.email}!</p>
      <form formAction={signOutAction}>


        {/* <Button formAction={signOutAction} type="submit" variant={"outline"}>
          Sign out
        </Button> */}
        <SubmitButton formAction={signOutAction}>{dictionary.signOut.signOut[language]}</SubmitButton>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link className="text-black" href="/sign-in">
          Sign in
        </Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link className="text-black" href="/sign-up">
          Sign up
        </Link>
      </Button>
    </div>
  );
}
