import "@/app/globals.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex justify-center items-center">{children}</div>
  );
}
