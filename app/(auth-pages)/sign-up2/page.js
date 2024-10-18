import { signUpFirstAction } from "@/app/actions";
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
export default function Login({ searchParams }) {
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
                Business name
              </label>
              <div className="mt-2.5">
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  autofocus=""
                  placeholder="Please enter your business name"
                  required=""
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label for="password" className="">
                Business registration number
              </label>
              <div className="mt-2.5">
                <input
                  id="businessRegistrationNumber"
                  name="businessRegistrationNumber"
                  type="text"
                  placeholder="Please enter your business registration number"
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label for="confirm password" className="">
                Attach business registration certificate
              </label>
              <div className="mt-2.5">
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="businessCertificate"
                  name="businessCertificate"
                  type="file"
                />
              </div>
            </div>

            <div>
              <SubmitButton formAction={signUpFirstAction}>
                Sign Up
              </SubmitButton>
              <div className="w-full h-12 flex justify-center items-center">
                <Link href="/sign-in">Go to Sign In Page</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full relative bg-primary max-md:hidden">
        <div
          className="relative w-full h-full"
          tabindex="-1"
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
                    Find Your Perfect Used Car Today!
                  </h4>
                  <p
                    className="!text-white text-lg mt-7 leading-8"
                    uk-slideshow-parallax="y: 800,0,0;"
                  >
                    We handpick only the safest and most reliable used cars.
                    Search and compare effortlessly to find your ideal vehicle!
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
                    Reliable Used Cars at the Best Prices!{" "}
                  </h4>
                  <p
                    className="!text-white text-lg mt-7 leading-8"
                    uk-slideshow-parallax="y: 800,0,0;"
                  >
                    {" "}
                    This phrase is more casual and playful. It suggests that you
                    are keeping your friends updated on what’s happening in your
                    life.
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
