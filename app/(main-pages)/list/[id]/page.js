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
import RequestEst from "./components/RequestEst";
import { redirect } from "next/navigation";
import LanguageSelect from "@/app/(auth-pages)/components/LanguageSelect";
import {cookies} from "next/headers";
import {dictionary} from "@/app/(main-pages)/components/dictionary";
async function page({ params }) {
  const languageCookie = cookies().get('language');
  const language = languageCookie ? languageCookie.value : 'kr';

  const { id } = params;

  const supabase = createClient();

  // Fetch session information
  const {
    data: { session },
  } = await supabase.auth.getSession();

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

  // Fetch car data from Supabase
  const { data: carData, error: error2 } = await supabase
    .from("cardata")
    .select("*")
    .eq("id", id)
    .single();

  if (error2 || !carData) {
    console.error("Error fetching car data or car not found:", error2);
    redirect("/nopage");
  }

  if (error2) {
    console.error("Error fetching car data2:", error2);
    // Handle the error appropriately
  }
  const carSpec = [
    parseInt(carData.mileage).toString() + "km",
    parseInt(carData.year),
    carData.fuelType[language],
    carData.carCategory[language],
    carData.dsp,
    carData.trns[language],
    carData.clr[language],
    carData.inqCrrgsnb,
  ].join(" • ");

  return (
    <div>
      <div className="mx-auto flex flex-col">
        <div className="w-full h-5"></div>
        <div className="flex flex-col 2xl:gap-6 gap-6 md:p-4 rounded-lg box">
          <div className="w-full">
            <div className="flex flex-col gap-y-3 mx-5 my-5 px-5">
              <div className="flex flex-col lg:flex-row space-x-5 justify-between items-center ">
                <div className="flex justify-end items-center md:hidden w-full mb-3">
                  <LanguageSelect />
                </div>
                <div className="flex justify-start items-center w-full space-x-3">
                  <div className="flex justify-start items-center">
                    <Chip
                      className="mx-5"
                      variant="bordered"
                      color={carData.sellType === "렌트" ? "danger" : "primary"}
                    >
                      {carData.sellType === "렌트" ? dictionary.detail.cartypeRent[language] : dictionary.detail.cartypeLease[language]}
                    </Chip>
                  </div>

                  <div className="block text-lg font-semibold">
                    {carData.title[language]}
                  </div>
                </div>
                <div className="hidden md:block">
                  <LanguageSelect />
                </div>
              </div>
              <div>
                <p className="text-medium">{carSpec}</p>
              </div>
            </div>
            <div className="w-full h-full flex flex-col lg:flex-row px-5 py-5 gap-5 justify-center items-center">
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
                          data-caption={carData.title[language]}
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
                            className="w-6 h-6 lg:h-8 rounded object-cover"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-full lg:w-1/2 ">
                <div className="md:space-y-5 space-y-3 ">
                  <h1 className="text-medium font-bold mb-2 ">{dictionary.detail.mainInfo[language]}</h1>
                  <div>
                    <div className="flex w-full justify-around items-center">
                      {carData.sellType === "리스" ? (
                        <>
                          <div className="text-sm border-r pr-2 text-center">
                            <p>{dictionary.detail.monthlyLease[language]}</p>
                            
                            <p>{formatNumber(carData.monthlyPrice)}</p>
                            <p>KRW/MONTH</p>
                          </div>
                          <div className="text-sm border-r pr-2 text-center">
                            <p>{dictionary.detail.receivePrice[language]}</p>
                            <p>{formatNumber(carData.leaseReceivePrice)}</p>
                            <p>KRW</p>
                          </div>
                          <div className="text-sm text-center">
                            <p>{dictionary.detail.carPrice[language]}</p>
                            <p>{formatNumber(carData.carPrice)}</p>
                            <p>KRW</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm border-r pr-2 text-center">
                          <p>{dictionary.detail.monthlyRent[language]}</p>
                            <p>{formatNumber(carData.monthlyPrice)}</p>
                            <p>KRW/MONTH</p>
                          </div>
                          <div className="text-sm border-r pr-2 text-center">
                            <p>{dictionary.detail.receivePrice[language]}</p>
                            <p>{formatNumber(carData.leaseReceivePrice)}</p>
                            <p>KRW</p>
                          </div>
                          <div className="text-sm text-center">
                            <p>{dictionary.detail.carPrice[language]}</p>
                            <p>{formatNumber(carData.carPrice)}</p>
                            <p>KRW</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 py-2 justify-between items-center">
                    <RequestEst
                      description={carSpec}
                      title={carData.title[language]}
                      desc={carData.description}
                      thumbImage={carData.uploadedImageUrls[0].url}
                      productId={carData.productId}
                      id={id}
                      userId={session.user.email}
                      language={language}
                      dictionary={dictionary}
                      profiles={profiles}
                      titlekr={carData.title['kr']}
                    ></RequestEst>
                    
                    {profiles.role === "master" && (
                      <Link className="text-center text-xs" href={`http://www.encar.com/dc/dc_cardetailview.do?pageid=dc_carleaserent_l01&listAdvType=rent&carid=${carData.productId}`} target="_blank">
                        http://www.encar.com/dc/dc_cardetailview.do?pageid=dc_carleaserent_l01&listAdvType=rent&carid=${carData.productId}
                      </Link>
                    )}
                  </div>
                  {profiles.role === "master" ? (
                    <div>
                      <h1 className="text-medium font-bold mb-2 ">{dictionary.detail.seller[language]}</h1>
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
                        {dictionary.detail.onlyfor1[language]}
                      </p>
                      
                    </div>
                  )}

                  <Exchanger language={language} dictionary={dictionary}></Exchanger>

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
                    {dictionary.detail.chat[language]}
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
                  {dictionary.detail.option[language]}
                </h3>

                <ul
                  className="relative space-y-3 uk-accordion my-3"
                  uk-accordion="active: 1; multiple: true"
                >
                  <li className="uk-open">
                    <a
                      className="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      {dictionary.detail.extint[language]}
                      <svg
                        className="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
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
                    <div className="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionExtInt.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName[language]}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      className="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      {dictionary.detail.safety[language]}
                      <svg
                        className="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
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
                    <div className="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionSafety.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName[language]}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      className="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      {dictionary.detail.convenience[language]}
                      <svg
                        className="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
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
                    <div className="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionConvenience.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName[language]}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      className="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      {dictionary.detail.seat[language]}
                      <svg
                        className="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
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
                    <div className="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionSeat.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName[language]}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      className="flex items-center justify-between p-3 text-base bg-white shadow rounded-md text-black dark:text-white dark:bg-gray-800 group uk-accordion-title"
                      href="#"
                    >
                      {dictionary.detail.etc[language]}
                      <svg
                        className="duration-200 group-aria-expanded:rotate-180 w-5 h-5"
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
                    <div className="p-2 dark:text-white/80 uk-accordion-content">
                      <ul className="grid grid-cols-3 space-y-4 text-gray-600 text-sm dark:text-white/80">
                        {carData.optionEtc.map((elem, index) => {
                          return (
                            <li className="flex items-center gap-3 col-span-1">
                              {elem.optionName[language]}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="box p-5 px-6 pr-0 col-span-1">
                  <h3 className="font-semibold text-lg text-black dark:text-white">
                    {dictionary.detail.insurance[language]}
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
                          {carData.history[language]}
                        </h3>
                        <p>{dictionary.detail.insurance1[language]}</p>
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
                          {carData.changeCount[language]}
                        </h3>
                        <p>{dictionary.detail.insurance2[language]}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="p-2 inline-flex rounded-full bg-rose-50 self-center">
                        <ion-icon
                          name="heart"
                          className="text-2xl text-rose-600"
                        ></ion-icon>
                      </div>
                      <div>
                        <h3 className="sm:text-xl sm:font-semibold mt-1 text-black dark:text-white text-base font-normal">
                          {carData.accidentSelf[language]}
                        </h3>
                        <p>{dictionary.detail.insurance3[language]}</p>
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
                          {carData.accidentOther[language]}
                        </h3>
                        <p>{dictionary.detail.insurance4[language]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="box p-5 px-6 pr-0 cols-span-1">
                  <h3 className="font-semibold text-lg text-black dark:text-white">
                    {dictionary.detail.price[language]}
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
                          {formatNumber(carData.leaseReceivePrice)} KRW
                        </h3>
                        <p>{dictionary.detail.price1[language]}</p>
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
                          {formatNumber(carData.leasePriceIn)} KRW
                        </h3>
                        <p>{dictionary.detail.price2[language]}</p>
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
                          {formatNumber(carData.leasePriceOut)} KRW
                        </h3>
                        <p>{dictionary.detail.price3[language]}</p>
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
                          {formatNumber(carData.leasePriceAll)} KRW
                        </h3>
                        <p>{dictionary.detail.price4[language]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box p-5 px-6 pr-0">
                <h3 className="font-semibold text-lg text-black dark:text-white">
                  {dictionary.detail.issues[language]}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mt-4">
                  <div className="flex gap-3">
                    <div className="p-2 inline-flex rounded-full bg-rose-50 self-center">
                      <ion-icon
                        name="heart"
                        className="text-2xl text-rose-600"
                      ></ion-icon>
                    </div>
                    <div>
                      <h3 className="sm:text-xl sm:font-semibold mt-1 text-black dark:text-white text-base font-normal">
                        {carData.performanceDashboard[language]}
                      </h3>
                      <p>{dictionary.detail.issue1[language]}</p>
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
                        {carData.performanceDistance[language]}
                      </h3>
                      <p>{dictionary.detail.issue2[language]}</p>
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
                        {carData.performanceVIN[language]}
                      </h3>
                      <p>{dictionary.detail.issue3[language]}</p>
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
                        {carData.performanceEmit[language]}
                      </h3>
                      <p>{dictionary.detail.issue4[language]}</p>
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
                        {carData.performanceTuning[language]}
                      </h3>
                      <p>{dictionary.detail.issue5[language]}</p>
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
                        {carData.performanceSpecial[language]}
                      </h3>
                      <p>{dictionary.detail.issue6[language]}</p>
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
                        {carData.performanceChange[language]}
                      </h3>
                      <p>{dictionary.detail.issue7[language]}</p>
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
                        {carData.performanceColor[language]}
                      </h3>
                      <p>{dictionary.detail.issue8[language]}</p>
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
                        {carData.performanceOption[language]}
                      </h3>
                      <p>{dictionary.detail.issue9[language]}</p>
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
                        {carData.performanceRecall[language]}
                      </h3>
                      <p>{dictionary.detail.issue10[language]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

function formatNumber(value) {
  // Remove any non-numeric characters except the decimal point
  const numericValue = value.replace(/[^\d.]/g, '');
  
  // Convert the extracted value to a number and multiply by 10,000
  const multipliedValue = parseFloat(numericValue) * 10000;
  
  // Format the number with commas as thousand separators
  return multipliedValue.toLocaleString();
}
