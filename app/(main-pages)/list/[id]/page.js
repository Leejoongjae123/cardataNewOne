import React from "react";
import IonIcon from "@reacticons/ionicons";
import { createClient } from "@/utils/supabase/server";

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

  return (
    <div>
      <div class="mx-auto flex flex-col">
        <div className="w-full h-5"></div>
        <div class="flex max-lg:flex-col 2xl:gap-6 gap-6 md:p-4 rounded-lg box">
          <div class="w-1/2">
            <div class="relative" uk-slideshow="animation: push; ratio: 7:5">
              <ul
                class="uk-slideshow-items overflow-hidden rounded-xl"
                uk-lightbox="animation: fade"
              >
                {carData.uploadedImageUrls.map((elem, index) => {
                  return (
                    <li class="w-full">
                      <a
                        class="inline"
                        href={elem.url}
                        data-caption="Caption 1"
                      >
                        <img
                          src={elem.url}
                          alt=""
                          class="w-full h-full absolute object-cover insta-0"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div class="max-md:hidden">
                <a class="nav-prev m-6" href="#" uk-slideshow-item="previous">
                  {" "}
                  <IonIcon name="chevron-back" class="text-2xl"></IonIcon>{" "}
                </a>
                <a class="nav-next m-6" href="#" uk-slideshow-item="next">
                  {" "}
                  <IonIcon name="chevron-forward" class="text-2xl"></IonIcon>
                </a>
              </div>

              <ul class="flex flex-wrap gap-4 py-4 w-full justify-center items-center">
                {carData.uploadedImageUrls.map((elem, index) => {
                  return (
                    <li className="w-1/20 mb-4" uk-slideshow-item={index.toString()}>
                      <a href="#">
                        <img
                          src={elem.url}
                          alt=""
                          class="w-full h-8 rounded object-cover"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div class="flex-1 space-y-8">
            <div class="md:space-y-5 space-y-3 p-5 max-md:pt-0 md:pr-2">
              <div>
                <h3 class="text-lg font-semibold">{carData.title}</h3>
              </div>

              <h1 class="text-2xl font-semibold"> $12.99 </h1>

              <div>
                <h4 class="text-sm font-medium"> Details </h4>
                <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div> Status </div>
                  <div class="text-teal-600"> Instock </div>
                </div>
              </div>

              <div class="flex gap-2 py-2">
                {/* <button class="button bg-primary text-white flex-1 py-1">
                  Add to cart{" "}
                </button> */}
                <button
                  class="button bg-secondery px-3"
                  uk-tooltip="title: Hello World; offset: 8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                </button>
                <button
                  class="button bg-secondery px-3"
                  uk-tooltip="title: Hello World; offset: 8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </button>
              </div>

              <p class="text-sm text-black font-light ">
                {" "}
                sed diam nonummy nibh euismod tincidunt volutpat laoreet dolore
                magna aliquam erat volutpat{" "}
              </p>

              <div>
                <h4 class="text-sm font-medium"> Seller </h4>
                <div class="flex gap-3 py-2 text-sm font-medium mt-2">
                  <a href="timeline.html">
                    {" "}
                    <img
                      src="/images/avatars/avatar-3.jpg"
                      alt=""
                      class="w-9 h-9 rounded-full"
                    />{" "}
                  </a>
                  <div class="flex-1">
                    <a href="timeline.html">
                      {" "}
                      <h4 class="text-black "> Monroe Parker </h4>{" "}
                    </a>
                    <div class="text-xs text-gray-500 "> 2 hours ago </div>
                  </div>

                  <button type="button" class="button border2 px-3">
                    {" "}
                    Follow{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex 2xl:gap-12 gap-10 mt-8 max-lg:flex-col"
          id="js-oversized"
        >
          <div class="flex-1 space-y-4">
            <div class="box p-5 px-6 relative">
              <h3 class="font-semibold text-lg text-black "> About </h3>

              <div class="space-y-4 leading-7 tracking-wide mt-4 text-black text-sm dark:text-white">
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

            <div class="box p-5 px-6 relative">
              <h3 class="font-semibold text-lg text-black dark:text-white">
                {" "}
                Discussions{" "}
              </h3>

              <div class=" text-sm font-normal space-y-4 relative mt-4">
                <div class="flex items-start gap-3 relative">
                  <a href="timeline.html">
                    {" "}
                    <img
                      src="/images/avatars/avatar-3.jpg"
                      alt=""
                      class="w-6 h-6 mt-1 rounded-full"
                    />{" "}
                  </a>
                  <div class="flex-1">
                    <a
                      href="timeline.html"
                      class="text-black font-medium inline-block dark:text-white"
                    >
                      {" "}
                      Monroe Parker{" "}
                    </a>
                    <p class="mt-0.5">What a beautiful photo! I love it. 😍 </p>
                  </div>
                </div>
                <div class="flex items-start gap-3 relative">
                  <a href="timeline.html">
                    {" "}
                    <img
                      src="/images/avatars/avatar-2.jpg"
                      alt=""
                      class="w-6 h-6 mt-1 rounded-full"
                    />{" "}
                  </a>
                  <div class="flex-1">
                    <a
                      href="timeline.html"
                      class="text-black font-medium inline-block dark:text-white"
                    >
                      {" "}
                      John Michael{" "}
                    </a>
                    <p class="mt-0.5"> You captured the moment.😎 </p>
                  </div>
                </div>
                <div class="flex items-start gap-3 relative">
                  <a href="timeline.html">
                    {" "}
                    <img
                      src="/images/avatars/avatar-5.jpg"
                      alt=""
                      class="w-6 h-6 mt-1 rounded-full"
                    />{" "}
                  </a>
                  <div class="flex-1">
                    <a
                      href="timeline.html"
                      class="text-black font-medium inline-block dark:text-white"
                    >
                      {" "}
                      James Lewis{" "}
                    </a>
                    <p class="mt-0.5">What a beautiful photo! I love it. 😍 </p>
                  </div>
                </div>
                <div class="flex items-start gap-3 relative">
                  <a href="timeline.html">
                    {" "}
                    <img
                      src="/images/avatars/avatar-4.jpg"
                      alt=""
                      class="w-6 h-6 mt-1 rounded-full"
                    />{" "}
                  </a>
                  <div class="flex-1">
                    <a
                      href="timeline.html"
                      class="text-black font-medium inline-block dark:text-white"
                    >
                      {" "}
                      Martin Gray{" "}
                    </a>
                    <p class="mt-0.5"> You captured the moment.😎 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-[400px]">
            <div
              class="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
              uk-sticky="media: 1024; end: #js-oversized; offset: 80"
            >
              <div class="box p-5 px-6 pr-0">
                <h3 class="font-semibold text-lg text-black dark:text-white">
                  {" "}
                  Status{" "}
                </h3>

                <div class="grid grid-cols-2 gap-2 text-sm mt-4">
                  <div class="flex gap-3">
                    <div class="p-2 inline-flex rounded-full bg-rose-50 self-center">
                      {" "}
                      <ion-icon
                        name="heart"
                        class="text-2xl text-rose-600"
                      ></ion-icon>
                    </div>
                    <div>
                      <h3 class="sm:text-xl sm:font-semibold mt-1 text-black dark:text-white text-base font-normal">
                        162
                      </h3>
                      <p>Intersted</p>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <div class="p-2 inline-flex rounded-full bg-rose-50 self-center">
                      {" "}
                      <ion-icon
                        name="leaf-outline"
                        class="text-2xl text-rose-600"
                      ></ion-icon>
                    </div>
                    <div>
                      <h3 class="sm:text-xl sm:font-semibold mt-1 text-black dark:text-white text-base font-normal">
                        162
                      </h3>
                      <p>Going</p>
                    </div>
                  </div>
                </div>
                <ul class="mt-6 space-y-4 text-gray-600 text-sm dark:text-white/80">
                  <li class="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      ></path>
                    </svg>
                    <div>
                      {" "}
                      <span class="font-semibold text-black dark:text-white">
                        {" "}
                        3,240{" "}
                      </span>{" "}
                      friends{" "}
                    </div>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
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
                      <span class="font-semibold text-black dark:text-white">
                        {" "}
                        2014
                      </span>{" "}
                    </div>
                  </li>
                </ul>
              </div>

              <div class="box p-5 px-6">
                <div class="flex items-baseline justify-between text-black dark:text-white">
                  <h3 class="font-bold text-base"> Invite friends </h3>
                  <a href="#" class="text-sm text-blue-500">
                    See all
                  </a>
                </div>

                <div class="side-list">
                  <div class="side-list-item">
                    <a href="timeline.html">
                      <img
                        src="/images/avatars/avatar-3.jpg"
                        alt=""
                        class="side-list-image rounded-full"
                      />
                    </a>
                    <div class="flex-1">
                      <a href="timeline.html">
                        <h4 class="side-list-title"> Monroe Parker </h4>
                      </a>
                      <div class="side-list-info"> Turkey</div>
                    </div>
                    <button class="button border2">Invite</button>
                  </div>

                  <div class="side-list-item">
                    <a href="timeline.html">
                      <img
                        src="/images/avatars/avatar-4.jpg"
                        alt=""
                        class="side-list-image rounded-full"
                      />
                    </a>
                    <div class="flex-1">
                      <a href="timeline.html">
                        <h4 class="side-list-title"> Martin Gray </h4>
                      </a>
                      <div class="side-list-info"> Dubai</div>
                    </div>
                    <button class="button border2">Invite</button>
                  </div>

                  <div class="side-list-item">
                    <a href="timeline.html">
                      <img
                        src="/images/avatars/avatar-5.jpg"
                        alt=""
                        class="side-list-image rounded-full"
                      />
                    </a>
                    <div class="flex-1">
                      <a href="timeline.html">
                        <h4 class="side-list-title"> James Lewis </h4>
                      </a>
                      <div class="side-list-info"> London</div>
                    </div>
                    <button class="button border2">Invite</button>
                  </div>
                </div>
              </div>

              <div class="box p-5 px-6 space-y-4">
                <h3 class="font-bold text-base text-black"> Created by </h3>

                <div class="side-list-item">
                  <a href="timeline.html">
                    <img
                      src="/images/avatars/avatar-4.jpg"
                      alt=""
                      class="side-list-image rounded-full"
                    />
                  </a>
                  <div class="flex-1">
                    <a href="timeline.html">
                      <h4 class="side-list-title"> Maria Gray</h4>
                    </a>
                    <div class="side-list-info">Turkey </div>
                  </div>
                  <a
                    href="timeline.html"
                    class="bg-secondery/60 button rounded-full"
                  >
                    Profile
                  </a>
                </div>

                <ul class="text-gray-600 space-y-4 text-sm dark:text-white/80">
                  <li class="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      ></path>
                    </svg>
                    <div>
                      {" "}
                      <span class="font-semibold text-black dark:text-white">
                        {" "}
                        3,240{" "}
                      </span>{" "}
                      friends{" "}
                    </div>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
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
                      <span class="font-semibold text-black dark:text-white">
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
