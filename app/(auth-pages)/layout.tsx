import "@/app/globals.css";
import Script from "next/script";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="">{children}</div>
      <Script src="/js/uikit.min.js"></Script>
      <Script src="/js/simplebar.js"></Script>
      <Script src="/js/script.js"></Script>
    </>
  );
}
