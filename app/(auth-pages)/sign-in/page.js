import { signInAction } from "@/app/actions.js";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IonIcon from "@reacticons/ionicons";
import { Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { RiAppleFill } from "react-icons/ri";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Spinner } from "@nextui-org/spinner";
import { SubmitButton } from "@/components/submit-button";
import Image from "next/image";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import ToastBox from "./components/ToastBox";
import { dictionary } from "../dictionary/dictionary";
import { cookies } from "next/headers"; // Import the cookies module

export default function Login({ searchParams }) {
  const languageCookie = cookies().get('language');
  const language = languageCookie ? languageCookie.value : 'kr';
  console.log("language:",language);
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
              {dictionary.signIn.title[language]}
            </h2>
            <p className="text-medium text-gray-700 font-normal">
              {dictionary.signIn.subtitle[language]}
              <a href="/sign-up" className="text-blue-700 font-bold ml-2">
                {dictionary.signIn.register[language]}
              </a>
            </p>
          </div>

          <form
            method="#"
            action="#"
            className="space-y-7 text-sm text-black font-medium "
            uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
          >
            <div>
              <label for="email" className="">
                {dictionary.signIn.email[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autofocus=""
                  placeholder={dictionary.signIn.email[language]}
                  required=""
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label for="email" className="">
                {dictionary.signIn.password[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={dictionary.signIn.password[language]}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              {/* <div className="flex items-center gap-2.5">
                <input id="rememberme" name="rememberme" type="checkbox" />
                <label for="rememberme" className="font-normal">
                  Remember me
                </label>
              </div> */}
              <a href="#" className="text-blue-700 font-bold">
                {dictionary.signIn.forgotPassword[language]}
              </a>
            </div>

            <div>
              {/* <button
                type="submit"
                className="button bg-primary text-white w-full"
                formAction={signInAction}
              >
                <Spinner size="sm" />
                Sign in
              </button> */}
              <SubmitButton
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary/90 transition-colors"
                formAction={signInAction}
              >
                {dictionary.signIn.signin[language]}
              </SubmitButton>
            </div>

            <div className="text-center flex items-center gap-6">
              <hr className="flex-1 border-slate-200 " />
              {dictionary.signIn.orcontinuewith[language]}
              <hr className="flex-1 border-slate-200 " />
            </div>

            <div
              className="flex gap-2 flex-wrap"
              uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 400 ;repeat: true"
            >
              <div
                href="#"
                className="button items-center gap-2 bg-primary text-white text-sm flex-1"
              >
                <RiKakaoTalkFill />
                {dictionary.signIn.kakao[language]}
              </div>
              <a
                href="#"
                className="button  items-center gap-2 bg-primary text-white text-sm flex-1"
              >
                <FaFacebook />
                {dictionary.signIn.facebook[language]}
              </a>

              <a
                href="#"
                className="button  items-center gap-2 bg-sky-600 text-white text-sm flex-1"
              >
                <RiAppleFill></RiAppleFill>
                {dictionary.signIn.apple[language]}
              </a>
            </div>
          </form>
        </div>
      </div>
      <div class="w-full relative bg-primary max-md:hidden">
        <div
          class="relative w-full h-full"
          tabindex="-1"
          uk-slideshow="animation: slide; autoplay: true"
        >
          <ul class="uk-slideshow-items w-full h-full">
            <li class="w-full">
              <img
                src="/images/thumb/thumb1.jpg"
                alt=""
                class="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
              />
              <div class="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10">
                <div
                  class="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                  uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                >
                  <h4
                    class="!text-white text-2xl font-semibold mt-7"
                    uk-slideshow-parallax="y: 600,0,0"
                  >
                    Find Your Perfect Used Car Today!
                  </h4>
                  <p
                    class="!text-white text-lg mt-7 leading-8"
                    uk-slideshow-parallax="y: 800,0,0;"
                  >
                    We handpick only the safest and most reliable used cars.
                    Search and compare effortlessly to find your ideal vehicle!
                  </p>
                </div>
              </div>
              <div class="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0"></div>
            </li>
            <li class="w-full">
              <img
                src="/images/thumb/thumb2.jpg"
                alt=""
                class="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
              />
              <div class="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10">
                <div
                  class="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                  uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                >
                  <h4
                    class="!text-white text-2xl font-semibold mt-7"
                    uk-slideshow-parallax="y: 800,0,0"
                  >
                    Reliable Used Cars at the Best Prices!{" "}
                  </h4>
                  <p
                    class="!text-white text-lg mt-7 leading-8"
                    uk-slideshow-parallax="y: 800,0,0;"
                  >
                    {" "}
                    This phrase is more casual and playful. It suggests that you
                    are keeping your friends updated on what’s happening in your
                    life.
                  </p>
                </div>
              </div>
              <div class="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0"></div>
            </li>
          </ul>

          <div class="flex justify-center">
            <ul class="inline-flex flex-wrap justify-center  absolute bottom-8 gap-1.5 uk-dotnav uk-slideshow-nav">
              {" "}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
