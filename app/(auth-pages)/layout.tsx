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
        <div className="flex items-center absolute top-0 left-0 md:right-0 p-4 z-50">
          <LanguageSelect />
        </div>
        <div className="">
          {children}
        </div>
      </div>
      <Script src="/js/uikit.min.js"></Script>
      <Script src="/js/simplebar.js"></Script>
      <Script src="/js/script.js"></Script>
    </>
  );
}
