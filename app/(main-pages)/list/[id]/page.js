import React from "react";
import IonIcon from "@reacticons/ionicons";
import { createClient } from "@/utils/supabase/server";
import { LuMail } from "react-icons/lu";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Chip } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import Exchanger from "./components/Exchanger";

async function page({ params }) {
  const { id } = params;

  const supabase = createClient();

  // Fetch session information
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Fetch car data from Supabase
  // Fetch car data from Supabase
  const { data: profiles, error: error1 } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (error1) {
    console.error("Error fetching car data1:", error1);
    // Handle the error appropriately
  }
  console.log("profiles:", profiles);

  // Fetch car data from Supabase
  const { data: carData, error: error2 } = await supabase
    .from("cardata")
    .select("*")
    .eq("id", id)
    .single();

  if (error2) {
    console.error("Error fetching car data2:", error2);
    // Handle the error appropriately
  }
  const carSpec = [
    parseInt(carData.mileage).toString() + "km",
    parseInt(carData.year),
    carData.fuelType,
    carData.carCategory,
    carData.dsp,
    carData.trns,
    carData.clr,
    carData.inqCrrgsnb,
  ].join(" • ");
  console.log(carSpec);

  return (
    <div>
      <div className="mx-auto flex flex-col">
        <div className="w-full h-5"></div>
        <div className="flex flex-col 2xl:gap-6 gap-6 md:p-4 rounded-lg box">
          <div className="w-full">
            <div className="flex flex-col gap-y-3 mx-5 my-5 px-5">
              <div className="flex space-x-5 justify-start items-center ">
                <div className="">
                  <Chip
                    className="mx-5"
                    variant="bordered"
                    color={carData.sellType === "렌트" ? "danger" : "primary"}
                  >
                    {carData.sellType}
                  </Chip>
                </div>

                <div className="block text-lg font-semibold">
                  {carData.title}
                </div>
                {/* <div className="">123</div>
                <div className="">454</div> */}
              </div>
              <div>
                <p className="text-medium">{carSpec}</p>
              </div>
            </div>
            <div className="w-full h-full flex flex-col lg:flex-row space-x-5 justify-center items-center">
              <div
                className="relative w-full lg:w-2/3"
                uk-slideshow="animation: push; ratio: 7:5"
              >
                <ul
                  className="uk-slideshow-items overflow-hidden rounded-xl"
                  uk-lightbox="animation: fade"
                >
                  {carData.uploadedImageUrls.map((elem, index) => {
                    return (
                      <li className="w-full">
                        <a
                          className="inline"
                          href={elem.url}
                          data-caption="Caption 1"
                        >
                          <img
                            src={elem.url}
                            alt=""
                            className="w-full h-full absolute object-cover insta-0"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="max-md:hidden">
                  <a
                    className="nav-prev m-6"
                    href="#"
                    uk-slideshow-item="previous"
                  >
                    {" "}
                    <IonIcon
                      name="chevron-back"
                      className="text-2xl"
                    ></IonIcon>{" "}
                  </a>
                  <a className="nav-next m-6" href="#" uk-slideshow-item="next">
                    {" "}
                    <IonIcon
                      name="chevron-forward"
                      className="text-2xl"
                    ></IonIcon>
                  </a>
                </div>

                <ul className="flex flex-wrap w-full justify-center items-center">
                  {carData.uploadedImageUrls.map((elem, index) => {
                    return (
                      <li
                        className="w-1/20"
                        uk-slideshow-item={index.toString()}
                      >
                        <a href="#">
                          <img
                            src={elem.url}
                            alt=""
                            className="w-full h-6 lg:h-8 rounded object-cover"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="md:space-y-5 space-y-3 ">
                  <h1 className="text-medium font-bold mb-2 ">주요정보</h1>
                  <div>
                    <div className="flex w-full justify-around items-center">
                      {carData.sellType === "리스" ? (
                        <>
                          <div className="text-sm border-r pr-2 text-center">
                            <p>월리스료</p>
                            <p>{parseInt(carData.monthlyPrice)}만원/월</p>
                          </div>
                          <div className="text-sm border-r pr-2 text-center">
                            <p>인수금</p>
                            <p>{parseInt(carData.leaseReceivePrice)}만원</p>
                          </div>
                          <div className="text-sm text-center">
                            <p>차량가격</p>
                            <p>{parseInt(carData.carPrice)}만원</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm">
                            <p>월렌트료</p>
                            <p>{parseInt(carData.monthlyPrice)}만원/월</p>
                          </div>
                          <div className="text-sm">
                            <p>인수금</p>
                            <p>{parseInt(carData.leaseReceivePrice)}만원</p>
                          </div>
                          <div className="text-sm">
                            <p>차량가격</p>
                            <p>{parseInt(carData.carPrice)}만원</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1 py-2 justify-between items-center">
                    <button
                      className="button bg-primary px-3 text-white w-full"
                      uk-tooltip="title: Ask; offset: 8"
                    >
                      계산 요청하기
                    </button>
                  </div>
                  {profiles.role === "master" ? (
                    <div>
                      <h1 className="text-medium font-bold mb-2 ">판매자</h1>
                      <div className="flex justify-center items-center gap-3 py-2 text-sm font-medium mt-2">
                        <div className="flex flex-col justify-center items-start gap-y-1 w-full">
                          <h4 className="text-black ">
                            {" "}
                            {carData.sellerName}{" "}
                          </h4>{" "}
                          <div className="text-xs text-gray-500 ">
                            {carData.sellerPhone}
                          </div>
                          <div className="text-xs text-gray-500 ">
                            {carData.sellerAddress}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-black font-light text-center">
                        판매자 연락처는 관리자만
                      </p>
                      <p className="text-sm text-black font-light text-center">
                        확인할 수 있습니다.
                      </p>
                    </div>
                  )}

                  <Exchanger></Exchanger>

                  {/* <Card className="w-full">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-md">환율 계산</p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <Link
                        isExternal
                        showAnchorIcon
                        href="https://github.com/nextui-org/nextui"
                      >
                        Visit source code on GitHub.
                      </Link>
                    </CardFooter>
                  </Card> */}
                  <button
                    className="button bg-secondery px-3 w-full"
                    uk-tooltip="title: Chat; offset: 8"
                  >
                    <IoChatbubbleEllipsesOutline className="w-5 h-5 text-gray-500"></IoChatbubbleEllipsesOutline>
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full my-5" id="js-oversized">
          <div></div>
          <div className="w-full">
            <div
              className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
              uk-sticky="media: 1024; end: #js-oversized; offset: 80"
            >
              <div className="box p-5 px-6 ,">
                <h3 className="font-semibold text-lg text-black dark:text-white">
                  Option
                </h3>

                <ul
                  class="relative space-y-3 uk-accordion my-3"
                  uk-accordion="active: 1; multiple: true"
                >
                  <li class="uk-open">
                    <a
                      class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      Ext/Int
                      <svg
                        class="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionExtInt.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      Safety
                      <svg
                        class="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionSafety.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      Convenience
                      <svg
                        class="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionConvenience.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      Seat
                      <svg
                        class="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionSeat.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      class="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      Etc
                      <svg
                        class="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </a>
                    <div class="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionEtc.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="box p-5 px-6 pr-0">
                <h3 className="font-semibold text-lg text-black dark:text-white">
                  Insurance
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                  <div className="flex gap-3">
                    <div className="p-2 inline-flex rounded-full bg-rose-50 self-center">
                      <ion-icon
                        name="heart"
                        className="text-2xl text-rose-600"
                      ></ion-icon>
                    </div>
                    <div>
                      <h3 className="sm:text-xl sm:font-semibold mt-1 text-black dark:text-white text-base font-normal">
                        162
                      </h3>
                      <p>Intersted</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-2 inline-flex rounded-full bg-rose-50 self-center">
                      <ion-icon
                        name="leaf-outline"
                        className="text-2xl text-rose-600"
                      ></ion-icon>
                    </div>
                    <div>
                      <h3 className="sm:text-xl sm:font-semibold mt-1 text-black dark:text-white text-base font-normal">
                        162
                      </h3>
                      <p>Going</p>
                    </div>
                  </div>
                </div>
                <ul className="mt-6 space-y-4 text-gray-600 text-sm dark:text-white/80">
                  <li className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      ></path>
                    </svg>
                    <div>
                      {" "}
                      <span className="font-semibold text-black dark:text-white">
                        {" "}
                        3,240{" "}
                      </span>{" "}
                      friends{" "}
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                      ></path>
                    </svg>
                    <div>
                      {" "}
                      on Socialite since{" "}
                      <span className="font-semibold text-black dark:text-white">
                        {" "}
                        2014
                      </span>{" "}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="box p-5 px-6 pr-0">
                <h3 className="font-semibold text-lg text-black dark:text-white">
                  Price Info
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                  <div className="flex gap-3">
                    <div className="p-2 inline-flex rounded-full bg-rose-50 self-center">
                      {" "}
                      <ion-icon
                        name="heart"
                        className="text-2xl text-rose-600"
                      ></ion-icon>
                    </div>
                    <div>
                      <h3 className="sm:text-xl sm:font-semibold mt-1 text-black dark:text-white text-base font-normal">
                        162
                      </h3>
                      <p>Intersted</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-2 inline-flex rounded-full bg-rose-50 self-center">
                      {" "}
                      <ion-icon
                        name="leaf-outline"
                        className="text-2xl text-rose-600"
                      ></ion-icon>
                    </div>
                    <div>
                      <h3 className="sm:text-xl sm:font-semibold mt-1 text-black dark:text-white text-base font-normal">
                        162
                      </h3>
                      <p>Going</p>
                    </div>
                  </div>
                </div>
                <ul className="mt-6 space-y-4 text-gray-600 text-sm dark:text-white/80">
                  <li className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      ></path>
                    </svg>
                    <div>
                      {" "}
                      <span className="font-semibold text-black dark:text-white">
                        {" "}
                        3,240{" "}
                      </span>{" "}
                      friends{" "}
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                      ></path>
                    </svg>
                    <div>
                      {" "}
                      on Socialite since{" "}
                      <span className="font-semibold text-black dark:text-white">
                        {" "}
                        2014
                      </span>{" "}
                    </div>
                  </li>
                </ul>
              </div>

              

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
