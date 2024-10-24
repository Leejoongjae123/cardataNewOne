import "@/app/globals.css";
import Script from "next/script";
import LanguageSelect from "./components/LanguageSelect";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="">
        <div className="flex items-center absolute top-0 right-0 p-4 z-50">
          <p className="mr-2 font-bold text-black">Language</p>
          <LanguageSelect />
        </div>

        {children}
      </div>
      <Script src="/js/uikit.min.js"></Script>
      <Script src="/js/simplebar.js"></Script>
      <Script src="/js/script.js"></Script>
    </>
  );
}
