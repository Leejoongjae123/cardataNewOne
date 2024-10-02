import React from "react";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import IonIcon from "@reacticons/ionicons";
import {Pagination} from "@nextui-org/react";
import Link from "next/link";
function NewOne() {
  const items = Array.from({ length: 6 }, (_, index) => `Item ${index + 1}`);

  return (
    <div>
      <div className="page-heading">
        <h1 className="page-title test"> New </h1>

        <nav className="nav__underline">
          <ul
            className="group"
            uk-switcher="connect: #group-tabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
          >
            <li>
              {" "}
              <a href="#"> SK Encar</a>{" "}
            </li>
            <li>
              {" "}
              <a href="#"> Naver Cafe</a>{" "}
            </li>
          </ul>
        </nav>
      </div>
      <div
        className="relative"
        tabindex="-1"
        uk-slider="autoplay: true;infinite: false;autoplayInterval:2000"
      >
        <div className="uk-slider-container pb-1">
          <ul
            className="uk-slider-items w-[calc(100%+14px)]"
            uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true"
          >
            {items.map((item, index) => (
              <li
                key={index}
                className="pr-3 md:w-1/3 w-1/2"
              uk-scrollspy-className="uk-animation-fade"
            >
              <div className="card">
                <Link href={`/list/${index}`}>
                  <div className="card-media sm:aspect-[2/1.7] h-36">
                    <img src="/images/product/product-1.jpg" alt="" />
                    <div className="card-overly"></div>
                  </div>
                </Link>
                <div className="card-body relative">
                  <a href="#">
                    <span className="text-teal-600 font-semibold text-xs">
                      {" "}
                      BMW 520d
                    </span>
                  </a>
                  <a href="product-view-1.html">
                    <p className="card-text block text-black mt-0.5"> </p>
                  </a>
                  <div className="-top-3 absolute bg-blue-100 font-medium px-2  py-0.5 right-2 rounded-full text text-blue-500 text-sm z-20">
                    250$/48M
                  </div>
                </div>
              </div>
            </li>
            ))}
            
            
            
          </ul>
        </div>

        <div className="max-md:hidden">
          <a
            className="nav-prev !bottom-1/2 !top-auto"
            href="#"
            uk-slider-item="previous"
          >
            {" "}
            <IonIcon name="chevron-back" className="text-2xl"></IonIcon>{" "}
          </a>
          <a
            className="nav-next !bottom-1/2 !top-auto"
            href="#"
            uk-slider-item="next"
          >
            {" "}
            <IonIcon name="chevron-forward" className="text-2xl"></IonIcon>
          </a>
        </div>

        <div className="flex justify-center">
          <ul className="inline-flex flex-wrap justify-center my-5 gap-2 uk-dotnav uk-slider-nav">
            {" "}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default NewOne;
