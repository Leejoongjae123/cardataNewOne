import { signUpFirstAction } from "@/app/actions.js";
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
import ToastBox from "./components/ToastBox";
import { Button } from "@/components/ui/button";
import {dictionary} from "../dictionary/dictionary";
import { cookies } from "next/headers";
export default function SignUp({ searchParams }) {
  const languageCookie = cookies().get('language');
  const language = languageCookie ? languageCookie.value : 'kr';  
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
              {dictionary.signUp.title[language]}
            </h2>
          </div>

          <form
            method="#"
            action="#"
            className="space-y-3 text-sm text-black font-medium "
            uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
          >
            <div>
              <label htmlFor="email" className="">
                {dictionary.signUp.email[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={dictionary.signUp.email[language]}
                  required=""
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="">
                {dictionary.signUp.password[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={dictionary.signUp.password[language]}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
              {/* <p>*{dictionary.signUp.condition1[language]}</p> */}
              {/* <p>
                *{dictionary.signUp.condition2[language]}
              </p> */}
            </div>
            <div>
              <label htmlFor="confirm password" className="">
                {dictionary.signUp.confirmPassword[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="confirm password"
                  name="confirm password"
                  type="password"
                  placeholder={dictionary.signUp.confirmPassword[language]}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm password" className="">
                {dictionary.signUp.name[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={dictionary.signUp.name[language]}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="">
                {dictionary.signUp.mobile[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder={dictionary.signUp.mobile[language]}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm password" className="">
                {dictionary.signUp.region[language]}
              </label>
              <div className="mt-2.5">
                <select
                  id="region"
                  name="region"
                  defaultValue=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="" disabled>
                    {dictionary.signUp.chooseacountry[language]}
                  </option>
                  <option value="KOREA">{dictionary.signUp.korea[language]}</option>
                  <option value="UNITED STATES">{dictionary.signUp.unitedstates[language]}</option>
                  <option value="RUSSIA">{dictionary.signUp.russia[language]}</option>
                  <option value="UNITED ARAB EMIRATES">{dictionary.signUp.unitedarabemirates[language]}</option>
                  <option value="CHINA">{dictionary.signUp.china[language]}</option>
                  
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="confirm password" className="">
                {dictionary.signUp.recommenderEmail[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="recommenderEmail"
                  name="recommenderEmail"
                  type="email"
                  placeholder={dictionary.signUp.recommenderEmail[language]}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label htmlFor="Recommender Phone" className="">
                {dictionary.signUp.recommenderPhone[language]}
              </label>
              <div className="mt-2.5">
                <input
                  id="recommenderPhone"
                  name="recommenderPhone"
                  type="text"
                  placeholder={dictionary.signUp.recommenderPhone[language]}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-2">
              <Button
                className="h-full w-full text-white bg-primary hover:bg-primary/90 transition-colors"
                formAction={signUpFirstAction}
              >
                {dictionary.signUp.next[language]}
              </Button>
              <div className="w-full h-full flex justify-center items-center">
              <Link href="/sign-in">{dictionary.signUp.gotosigninpage[language]}</Link>
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
