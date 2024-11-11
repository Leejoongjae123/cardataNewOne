import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import IonIcon from "@reacticons/ionicons";
import NewOne from "./components/NewOne";
import AllOne from "./components/AllOne";
import { dictionary } from "@/app/(main-pages)/components/dictionary";
import { cookies } from "next/headers";
export default async function ProtectedPage() {
  const supabase = createClient();
  const languageCookie = cookies().get("language");
  const language = languageCookie ? languageCookie.value : "kr";

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
      <div className="flex flex-col h-full w-full justify-center items-center my-12">
        <h1 className="text-2xl font-bold">
          {dictionary.list.partner[language]}
        </h1>
        <div className="grid grid-cols-6 gap-4 mt-4 place-items-center">
          {Array.from({ length: 17 }, (_, i) => (
            <img
              key={i}
              src={`/images/partner/${i + 1}.png`}
              alt={`Partner ${i + 1}`}
              className="h-12"
            />
          ))}
        </div>
      </div>
    </>
  );
}
