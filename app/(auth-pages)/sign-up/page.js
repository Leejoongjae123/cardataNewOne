import { signUpFirstAction } from "@/app/actions";
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

export default function SignUp({ searchParams }) {
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
              Sign Up for the Sincar
            </h2>
          </div>

          <form
            method="#"
            action="#"
            className="space-y-3 text-sm text-black font-medium "
            uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
          >
            <div>
              <label for="email" className="">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autofocus=""
                  placeholder="Please enter your email address"
                  required=""
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label for="password" className="">
                Password
              </label>
              <div className="mt-2.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Please enter your Password"
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
              <p>* Please enter at least 8 characters</p>
              <p>
                * Combination of two or more of English upper and lower cast
                letters / number / special characters
              </p>
            </div>
            <div>
              <label for="confirm password" className="">
                Confirm Password
              </label>
              <div className="mt-2.5">
                <input
                  id="confirm password"
                  name="confirm password"
                  type="password"
                  placeholder="your password again"
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label for="confirm password" className="">
                Name
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Please enter your name"
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label for="mobile number" className="">
                Mobile Number
              </label>
              <div className="mt-2.5">
                <input
                  id="mobile number"
                  name="mobile number"
                  type="text"
                  placeholder="Please enter your mobile number"
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label for="confirm password" className="">
                Region
              </label>
              <div className="mt-2.5">
                <select
                  id="region"
                  name="region"
                  defaultValue=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled>
                    Choose a country
                  </option>
                  <option value="KOREA">KOREA</option>
                  <option value="UNITED STATES">UNITED STATES</option>
                  <option value="RUSSIA">RUSSIA</option>
                  <option value="UNITED ARAB EMIRATES">
                    UNITED ARAB EMIRATES
                  </option>
                  <option value="CHINA">CHINA</option>
                </select>
              </div>
            </div>
            <div>
              <label for="confirm password" className="">
                Recommender Email
              </label>
              <div className="mt-2.5">
                <input
                  id="recommenderEmail"
                  name="recommenderEmail"
                  type="email"
                  placeholder="Please enter your recommender email"
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label for="Recommender Phone" className="">
                Recommender Phone
              </label>
              <div className="mt-2.5">
                <input
                  id="recommenderPhone"
                  name="recommenderPhone"
                  type="text"
                  placeholder="Please enter your recommender phone"
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              {/* <Link href="/sign-up2">Next</Link> */}
              <Button
                className="h-12 w-full text-white bg-primary hover:bg-primary/90 transition-colors"
                formAction={signUpFirstAction}
              >
                Next
              </Button>
              <div className="w-full h-12 flex justify-center items-center">
              <Link href="/sign-in">Go to Sign In Page</Link>
              </div>
              
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
