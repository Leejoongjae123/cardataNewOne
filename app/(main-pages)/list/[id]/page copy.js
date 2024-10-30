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

  // Fetch car data from Supabase
  const { data: carData, error } = await supabase
    .from("cardata")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching car data:", error);
    // Handle the error appropriately
  }
  const carSpec = [
    parseInt(carData.mileage).toString() + "km",
    parseInt(carData.year),
    carData.fuelType[language],
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

                  {/* <div>
                    <h4 className="text-sm font-bold"> 상세정보 </h4>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div> Status </div>
                      <div className="text-teal-600"> Instock </div>
                      <div> Status </div>
                      <div className="text-teal-600"> Instock </div>
                      <div> Status </div>
                      <div className="text-teal-600"> Instock </div>
                    </div>
                  </div> */}

                  <div className="flex gap-1 py-2 justify-between items-center">
                    <button
                      className="button bg-primary px-3 text-white w-full"
                      uk-tooltip="title: Ask; offset: 8"
                    >
                      계산 요청하기
                    </button>
                  </div>
                  <div>
                    <p className="text-sm text-black font-light text-center">
                      판매자 연락처는 관리자만
                    </p>
                    <p className="text-sm text-black font-light text-center">
                      확인할 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h1 className="text-medium font-bold mb-2 ">판매자</h1>
                    <div className="flex justify-center items-center gap-3 py-2 text-sm font-medium mt-2">
                      <div className="flex-1 justify-center items-center">
                        <h4 className="text-black text-center "> {carData.sellerName} </h4>{" "}
                        <div className="text-xs text-gray-500 text-center ">
                          {carData.sellerPhone}
                        </div>
                        <div className="text-xs text-gray-500 text-center ">
                          {carData.sellerAddress}
                        </div>
                      </div>
                    </div>
                  </div>
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

        <div
          className="flex 2xl:gap-12 gap-10 mt-8 max-lg:flex-col"
          id="js-oversized"
        >
          <div className="flex-1 space-y-4">
            <div className="box p-5 px-6 relative">
              <h3 className="font-semibold text-lg text-black "> About </h3>

              <div className="space-y-4 leading-7 tracking-wide mt-4 text-black text-sm ">
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                  aliquip ex ea commodo consequat
                </p>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                  aliquip ex ea commodo consequat
                </p>
              </div>
            </div>

            <div className="box p-5 px-6 relative">
              <h3 className="font-semibold text-lg text-black ">
                {" "}
                Discussions{" "}
              </h3>

              <div className=" text-sm font-normal space-y-4 relative mt-4">
                <div className="flex items-start gap-3 relative">
                  <a href="timeline.html">
                    {" "}
                    <img
                      src="/images/avatars/avatar-3.jpg"
                      alt=""
                      className="w-6 h-6 mt-1 rounded-full"
                    />{" "}
                  </a>
                  <div className="flex-1">
                    <a
                      href="timeline.html"
                      className="text-black font-medium inline-block "
                    >
                      {" "}
                      Monroe Parker{" "}
                    </a>
                    <p className="mt-0.5">
                      What a beautiful photo! I love it. 😍{" "}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 relative">
                  <a href="timeline.html">
                    {" "}
                    <img
                      src="/images/avatars/avatar-2.jpg"
                      alt=""
                      className="w-6 h-6 mt-1 rounded-full"
                    />{" "}
                  </a>
                  <div className="flex-1">
                    <a
                      href="timeline.html"
                      className="text-black font-medium inline-block "
                    >
                      {" "}
                      John Michael{" "}
                    </a>
                    <p className="mt-0.5"> You captured the moment.😎 </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 relative">
                  <a href="timeline.html">
                    {" "}
                    <img
                      src="/images/avatars/avatar-5.jpg"
                      alt=""
                      className="w-6 h-6 mt-1 rounded-full"
                    />{" "}
                  </a>
                  <div className="flex-1">
                    <a
                      href="timeline.html"
                      className="text-black font-medium inline-block "
                    >
                      {" "}
                      James Lewis{" "}
                    </a>
                    <p className="mt-0.5">
                      What a beautiful photo! I love it. 😍{" "}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 relative">
                  <a href="timeline.html">
                    {" "}
                    <img
                      src="/images/avatars/avatar-4.jpg"
                      alt=""
                      className="w-6 h-6 mt-1 rounded-full"
                    />{" "}
                  </a>
                  <div className="flex-1">
                    <a
                      href="timeline.html"
                      className="text-black font-medium inline-block "
                    >
                      {" "}
                      Martin Gray{" "}
                    </a>
                    <p className="mt-0.5"> You captured the moment.😎 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[400px]">
            <div
              className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
              uk-sticky="media: 1024; end: #js-oversized; offset: 80"
            >
              <div className="box p-5 px-6 pr-0">
                <h3 className="font-semibold text-lg text-black ">
                  {" "}
                  Status{" "}
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
                      <h3 className="sm:text-xl sm:font-semibold mt-1 text-black  text-base font-normal">
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

              <div className="box p-5 px-6">
                <div className="flex items-baseline justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Invite friends </h3>
                  <a href="#" className="text-sm text-blue-500">
                    See all
                  </a>
                </div>

                <div className="side-list">
                  <div className="side-list-item">
                    <a href="timeline.html">
                      <img
                        src="/images/avatars/avatar-3.jpg"
                        alt=""
                        className="side-list-image rounded-full"
                      />
                    </a>
                    <div className="flex-1">
                      <a href="timeline.html">
                        <h4 className="side-list-title"> Monroe Parker </h4>
                      </a>
                      <div className="side-list-info"> Turkey</div>
                    </div>
                    <button className="button border2">Invite</button>
                  </div>

                  <div className="side-list-item">
                    <a href="timeline.html">
                      <img
                        src="/images/avatars/avatar-4.jpg"
                        alt=""
                        className="side-list-image rounded-full"
                      />
                    </a>
                    <div className="flex-1">
                      <a href="timeline.html">
                        <h4 className="side-list-title"> Martin Gray </h4>
                      </a>
                      <div className="side-list-info"> Dubai</div>
                    </div>
                    <button className="button border2">Invite</button>
                  </div>

                  <div className="side-list-item">
                    <a href="timeline.html">
                      <img
                        src="/images/avatars/avatar-5.jpg"
                        alt=""
                        className="side-list-image rounded-full"
                      />
                    </a>
                    <div className="flex-1">
                      <a href="timeline.html">
                        <h4 className="side-list-title"> James Lewis </h4>
                      </a>
                      <div className="side-list-info"> London</div>
                    </div>
                    <button className="button border2">Invite</button>
                  </div>
                </div>
              </div>

              <div className="box p-5 px-6 space-y-4">
                <h3 className="font-bold text-base text-black"> Created by </h3>

                <div className="side-list-item">
                  <a href="timeline.html">
                    <img
                      src="/images/avatars/avatar-4.jpg"
                      alt=""
                      className="side-list-image rounded-full"
                    />
                  </a>
                  <div className="flex-1">
                    <a href="timeline.html">
                      <h4 className="side-list-title"> Maria Gray</h4>
                    </a>
                    <div className="side-list-info">Turkey </div>
                  </div>
                  <a
                    href="timeline.html"
                    className="bg-secondery/60 button rounded-full"
                  >
                    Profile
                  </a>
                </div>

                <ul className="text-gray-600 space-y-4 text-sm dark:text-white/80">
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
