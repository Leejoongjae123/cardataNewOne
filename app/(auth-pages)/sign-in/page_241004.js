import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IonIcon from "@reacticons/ionicons";
import { Button, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { RiAppleFill } from "react-icons/ri";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import Image from "next/image";
export default function Login({ searchParams }) {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-1/2 p-10 h-2/3 bg-white shadow-xl flex items-center pt-10 dark:bg-slate-900 z-10 justify-center">
        <div
          className="flex flex-col gap-2 justify-center items-center"
          uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
        >
          <div className="flex justify-center items-center w-1/2 h-1/4">
            <img
              src="/images/logo1.png"
              className="w-full h-full object-cover"
              alt="Logo"
            />
          </div>

          <div className="flex flex-col w-full justify-center items-center">
            <h2 className="text-2xl font-semibold mb-1.5">
              {" "}
              Sign in to your account{" "}
            </h2>
            <p className="text-sm text-gray-700 font-normal">
              If you haven’t signed up yet.{" "}
              <a href="/sign-up" className="text-blue-700">
                Register here!
              </a>
            </p>
          </div>

          <form
            method="#"
            action="#"
            className="w-1/2 flex flex-col space-y-7 text-sm text-black font-medium dark:text-white"
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
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
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
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center gap-2.5">
                <input id="rememberme" name="rememberme" type="checkbox" />
                <label for="rememberme" className="font-normal">
                  Remember me
                </label>
              </div> */}
              <a href="#" className="text-blue-700">
                Forgot password{" "}
              </a>
            </div>

            <div>
              <SubmitButton
                className="w-full text-white"
                pendingText="Signing In..."
                formAction={signInAction}
              >
                Sign in
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>

            <div className="text-center flex items-center gap-6">
              <hr className="flex-1 border-slate-200 dark:border-slate-800" />
              Or continue with
              <hr className="flex-1 border-slate-200 dark:border-slate-800" />
            </div>

            <div
              className="flex gap-2 w-full"
              uk-scrollspy="cls: uk-animation-scale-up; delay: 400 ;repeat: true"
            >
              <div className="flex flex-col gap-5 w-full">
                <Button
                  startContent={
                    <Icon icon="flat-color-icons:google" width={24} />
                  }
                  variant="flat"
                >
                  Continue with Google
                </Button>
                <Button
                  startContent={
                    <RiKakaoTalkFill className="text-[#FFCD00] text-4xl" />
                  }
                  variant="flat"
                >
                  Continue with KAKAO
                </Button>
                <Button
                  startContent={
                    <FaFacebook className="text-2xl text-[#1877F2]" />
                  }
                  variant="flat"
                >
                  Continue with Facebook
                </Button>
                <Button
                  startContent={<RiAppleFill className="text-3xl text-black" />}
                  variant="flat"
                >
                  Continue with Apple
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
