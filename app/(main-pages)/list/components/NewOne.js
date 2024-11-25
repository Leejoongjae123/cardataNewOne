"use client";
import React, { useState, useEffect } from "react";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/client";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import IonIcon from "@reacticons/ionicons";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";
import { Chip } from "@nextui-org/react";
import LanguageSelect from "@/app/(auth-pages)/components/LanguageSelect";
import { dictionary } from "@/app/(main-pages)/components/dictionary";
import { Tabs, Tab } from "@nextui-org/react";
function NewOne({ language, dictionary }) {
  const [data, setData] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("SKEncar");

  const items = Array.from({ length: 6 }, (_, index) => `Item ${index + 1}`);

  const getData = async () => {
    const supabase = createClient();
    let query = supabase
      .from("cardata")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("like", false) // Add this line to filter for like = false
      .eq("platform", selectedPlatform) // Add platform filter
      .limit(10);

    const { data, error } = await query;

    if (error) {
      console.log(error);
    } else if (data) {
      setData(data);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedPlatform]);

  console.log(data);
  return (
    <div className="mt-10">
      <div className="page-heading">
        <div className="flex items-center justify-between">
          <h1 className="page-title test"> {dictionary.list.new[language]} </h1>
          <LanguageSelect />
        </div>
        <Tabs
          classNames="mt-5"
          aria-label="Options"
          selectedKey={selectedPlatform}
          onSelectionChange={(key) => {
            setSelectedPlatform(key);
          }}
          fullWidth
          size="lg"
          className="mt-5"
        >
          <Tab key="SKEncar" title="SKEncar" className="flex-1" />
          <Tab key="Other" title="Other" className="flex-1" />
        </Tabs>
        
      </div>
      <div
        className="relative mt-5"
        tabIndex="-1"
        uk-slider="autoplay: true;infinite: false;autoplayInterval:2000"
      >
        <div className="uk-slider-container pb-1">
          <ul
            className="uk-slider-items w-[calc(100%+14px)]"
            uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true"
          >
            {data.map((item, index) => (
              <li
                key={index}
                className="pr-3 md:w-1/4 w-1/2"
                uk-scrollspy-className="uk-animation-fade"
              >
                <div className="card">
                  <div className="absolute top-2 right-2 z-10">
                    <Chip
                      size="sm"
                      color={
                        selectedPlatform === "SKEncar" ? "danger" : "success"
                      }
                    >
                      {selectedPlatform === "SKEncar"
                        ? dictionary.list.tagSKEncar?.[language]
                        : dictionary.list.tagOthercar?.[language]}
                    </Chip>
                  </div>

                  <Link href={`/list/${item.id}`}>
                    <div className="card-media sm:aspect-[2/1.7] h-36">
                      <img src={item?.uploadedImageUrls[0]?.url} alt="" />
                      <div className="card-overly"></div>
                    </div>
                  </Link>
                  <div className="card-body flex justify-between">
                    <div className="flex-1">
                      {selectedPlatform === "SKEncar" ? (
                        // SKEncar인 경우
                        <>
                          <p className="card-text text-black font-medium line-clamp-2">
                            {item.title?.[language]}
                          </p>
                          <div className="text-xs line-clamp-1 mt-1 text-right">
                            {dictionary.list.mileage?.[language]}:
                            {parseInt(item.mileage)}km
                          </div>
                          <div className="text-xs line-clamp-1 mt-1 text-right">
                            {dictionary.list.year?.[language]}:
                            {parseInt(item?.year)}
                          </div>
                          <div className="text-xs line-clamp-1 mt-1 text-right">
                            {dictionary.list.accident[language]}:
                            {item.accidentSelf?.[language]}
                          </div>
                        </>
                      ) : (
                        // Other 플랫폼인 경우
                        <>
                          <p className="card-text text-black font-medium line-clamp-2">
                            {item.titlePo?.[language]}
                          </p>
                          <div className="text-xs line-clamp-1 mt-1 text-right">
                            Mileage:{item.mileagePo}km
                          </div>
                          <div className="text-xs line-clamp-1 mt-1 text-right">
                            Year:{item.modelYearPo}
                          </div>
                          <div className="text-xs line-clamp-1 mt-1 text-right">
                            Accident:{item.isAccidentPo?.[language]}
                          </div>
                        </>
                      )}
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
