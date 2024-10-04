import { signInAction } from "@/app/actions";
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
import {Spinner} from "@nextui-org/spinner";
import {SubmitButton} from "@/components/submit-button";
import Image from "next/image";
export default function Login({ searchParams }) {
  return (
    <div className="w-full flex">
      <div className="w-full md:w-1/3 relative col-span-1 p-10 min-h-screen bg-white shadow-xl flex items-center pt-10  z-10">
        <div
          className="w-full lg:max-w-sm mx-auto space-y-10"
          uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
        >
          <a href="/sign-in">
            <img
              src="/images/logo1.png"
              className="w-48 absolute top-10 left-10 "
              alt=""
            />
          </a>
          <div className="hidden">
            <img
              className="w-12"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
              alt="Socialite html template"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-1.5">
              {" "}
              Sign in to your account{" "}
            </h2>
            <p className="text-sm text-gray-700 font-normal">
              If you haven’t signed up yet.{" "}
              <a href="form-register.html" className="text-blue-700">
                Register here!
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
                Email address
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autofocus=""
                  placeholder="Email"
                  required=""
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>
            <div>
              <label for="email" className="">
                Password
              </label>
              <div className="mt-2.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="***"
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 "
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <input id="rememberme" name="rememberme" type="checkbox" />
                <label for="rememberme" className="font-normal">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-blue-700">
                Forgot password{" "}
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
              <SubmitButton formAction={signInAction}>Sign in</SubmitButton>
            </div>

            <div className="text-center flex items-center gap-6">
              <hr className="flex-1 border-slate-200 " />
              Or continue with
              <hr className="flex-1 border-slate-200 " />
            </div>

            <div
              className="flex gap-2"
              uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 400 ;repeat: true"
            >
              <a
                href="#"
                className="button flex-1 flex items-center gap-2 bg-primary text-white text-sm"
              >
                <RiKakaoTalkFill />
                Kakao
              </a>
              <a
                href="#"
                className="button flex-1 flex items-center gap-2 bg-primary text-white text-sm"
              >
                <FaFacebook />
                facebook{" "}
              </a>

              <a
                href="#"
                className="button flex-1 flex items-center gap-2 bg-sky-600 text-white text-sm"
              >
                <RiAppleFill></RiAppleFill>
                Apple
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
