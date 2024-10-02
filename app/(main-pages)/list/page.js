import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import IonIcon from "@reacticons/ionicons";
import NewOne from "./components/NewOne";
import AllOne from './components/AllOne'
export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <NewOne></NewOne>
      <AllOne></AllOne>
    </>
  );
}
