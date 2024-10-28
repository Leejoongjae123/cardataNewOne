import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import IonIcon from "@reacticons/ionicons";
import NewOne from "./components/NewOne";
import AllOne from './components/AllOne'
import { dictionary } from "@/app/(main-pages)/components/dictionary";
import { cookies } from "next/headers";
export default async function ProtectedPage() {
  const supabase = createClient();
  const languageCookie = cookies().get('language');
  const language = languageCookie ? languageCookie.value : 'kr';
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <NewOne language={language} dictionary={dictionary}></NewOne>
      <AllOne language={language} dictionary={dictionary}></AllOne>
    </>
  );
}
