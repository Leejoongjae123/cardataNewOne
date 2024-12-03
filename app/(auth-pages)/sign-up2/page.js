import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IonIcon from "@reacticons/ionicons";
import { Button, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { RiAppleFill } from "react-icons/ri";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Spinner } from "@nextui-org/spinner";
import { SubmitButton } from "@/components/submit-button";
import Image from "next/image";
import { headers } from "next/headers";
import ToastBox from "./components/ToastBox";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import {cookies} from "next/headers";
import { dictionary } from "../dictionary/dictionary";
export default function Login({ searchParams }) {
  const languageCookie = cookies().get('language');
  const language = languageCookie ? languageCookie.value : 'kr';



  const formAction = async (formData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const name = formData.get("name");
    const phone = formData.get("phone");
    const recommenderEmail = formData.get("recommenderEmail");
    const recommenderPhone = formData.get("recommenderPhone");
    const region = formData.get("region");
    const businessName = formData.get("businessName")?.toString();
    const businessRegistrationNumber = formData.get("businessRegistrationNumber")?.toString();
    const businessCertificate = formData.get("businessCertificate");
    
    // const email='jjcoding3001@naver.com'
    // const password='dlwndwo2!'

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log("data:", data);
    if (error) {
      console.log("error:", error);
      return encodedRedirect("error", "/sign-up", error.message);
    } else {
      let businessCertificateUrl = "";
      if (businessCertificate && businessCertificate.size > 0) {
        const fileName = `${Date.now()}_${businessCertificate.name}`;
        const { data: storageData, error: storageError } = await supabase.storage
          .from("certificate")
          .upload(
            `public/${data.user.id}/${fileName}`,
            businessCertificate
          );

        if (storageError) {
          console.log("storageError:", storageError);
          return encodedRedirect("error", "/sign-up", storageError.message);
        }
        console.log("storageData:", storageData);

        businessCertificateUrl = supabase.storage
          .from("certificate")
          .getPublicUrl(`public/${data.user.id}/${fileName}`)
          .data.publicUrl;
      } else {
        console.log("No business certificate file uploaded");
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .update({
          email: email,
          businessName: businessName,
          businessRegistrationNumber: businessRegistrationNumber,
          businessCertificate: businessCertificateUrl,
          name: name,
          phone: phone,
          recommenderEmail: recommenderEmail,
          recommenderPhone: recommenderPhone,
          region: region,
        })
        .eq("id", data.user.id);

      if (profileError) {
        console.log("profileError:", profileError);
        return encodedRedirect("error", "/sign-up", profileError.message);
      }

      return encodedRedirect(
        "success",
        "/sign-in",
        "Thanks for signing up!"
      );
    }
  };

  return (
    <div className="w-full flex">
      <ToastBox searchParams={searchParams}></ToastBox>
      <div className="w-full md:w-1/3 relative col-span-1 p-10 min-h-screen bg-white shadow-xl flex items-center justify-center pt-10  z-10 flex-col">
        <img src="/images/logo1.png" className="w-48  " alt="" />
        <div
          className="w-full lg:max-w-sm mx-auto space-y-10"
          uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
        >
          <div className="hidden">
            <img
              className="w-12"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
              alt="Socialite html template"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-1.5">
              {dictionary.signUp2.title[language]}
            </h2>
          </div>

          <form
            action={formAction}
            className="space-y-3 text-sm text-black font-medium "
            uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
          >
            <div>
              <input
                type="hidden"
                name="email"
                value={searchParams.email || ""}
              />
              <input
                type="hidden"
                name="password"
                value={searchParams.password || ""}
              />
              <input
                type="hidden"
                name="confirmPassword"
                value={searchParams.confirmPassword || ""}
              />
              <input
                type="hidden"
                name="name"
                value={searchParams.name || ""}
              />
              <input
                type="hidden"
                name="phone"
                value={searchParams.phone || ""}
              />
              <input
                type="hidden"
                name="recommenderEmail"
                value={searchParams.recommenderEmail || ""}
              />
              <input
                type="hidden"
                name="recommenderPhone"
                value={searchParams.recommenderPhone || ""}
              />
              <input
                type="hidden"
                name="region"
                value={searchParams.region || ""}
              />
              <label htmlFor="email" className="">
                {dictionary.signUp2.businessName[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder={dictionary.signUp2.businessName[language]}
                  required=""
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="">
                {dictionary.signUp2.businessRegistrationNumber[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="businessRegistrationNumber"
                  name="businessRegistrationNumber"
                  type="text"
                  placeholder={dictionary.signUp2.businessRegistrationNumber[language]}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm password" className="">
                {dictionary.signUp2.attach[language]}
              </label>
              <div className="mt-2.5">
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                  id="businessCertificate"
                  name="businessCertificate"
                  type="file"
                />
              </div>
            </div>

            <div>
              <SubmitButton>{dictionary.signUp2.signUp[language]}</SubmitButton>
              <div className="w-full h-12 flex justify-center items-center">
                <Link href="/sign-in">{dictionary.signUp2.gotosigninpage[language]}</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full relative bg-primary max-md:hidden">
        <div
          className="relative w-full h-full"
          tabIndex="-1"
          uk-slideshow="animation: slide; autoplay: true"
        >
          <ul className="uk-slideshow-items w-full h-full">
            <li className="w-full">
              <img
                src="/images/thumb/thumb1.jpg"
                alt=""
                className="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
              />
              <div className="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10">
                <div
                  className="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                  uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                >
                  <h4
                    className="!text-white text-2xl font-semibold mt-7"
                    uk-slideshow-parallax="y: 600,0,0"
                  >
                    {dictionary.signIn.mainText1[language]}
                  </h4>
                  <p
                    className="!text-white text-lg mt-7 leading-8"
                    uk-slideshow-parallax="y: 800,0,0;"
                  >
                    {dictionary.signIn.subText1[language]}
                    
                  </p>
                </div>
              </div>
              <div className="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0"></div>
            </li>
            <li className="w-full">
              <img
                src="/images/thumb/thumb2.jpg"
                alt=""
                className="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
              />
              <div className="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10">
                <div
                  className="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                  uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                >
                  <h4
                    className="!text-white text-2xl font-semibold mt-7"
                    uk-slideshow-parallax="y: 800,0,0"
                  >
                    {dictionary.signIn.mainText2[language]}
                  </h4>
                  <p
                    className="!text-white text-lg mt-7 leading-8"
                    uk-slideshow-parallax="y: 800,0,0;"
                  >
                    {dictionary.signIn.subText2[language]}
                  </p>
                </div>
              </div>
              <div className="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0"></div>
            </li>
          </ul>

          <div className="flex justify-center">
            <ul className="inline-flex flex-wrap justify-center  absolute bottom-8 gap-1.5 uk-dotnav uk-slideshow-nav">
              {" "}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
