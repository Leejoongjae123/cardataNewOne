"use client";
import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";
import { Input } from "@nextui-org/input";
import { createClient } from "@/utils/supabase/client";
import { Chip } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

function AllOne({ language, dictionary }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
  const currentYear = new Date().getFullYear();
  const [manufacturer, setManufacturer] = useState([]);
  const [model, setModel] = useState([]);
  const [modelGroup, setModelGroup] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedModelGroup, setSelectedModelGroup] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("SKEncar");
  const [search, setSearch] = useState("");
  const [searchModelYear, setSearchModelYear] = useState([]);
  const [searchMileage, setSearchMileage] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const itemsPerPage = 20;

  const getManufacturer = async () => {
    const currentYear = new Date().getFullYear();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("category")
      .select("manufacturer");

    if (error) {
      console.log(error);
    } else if (data) {
      const uniqueManufacturers = Array.from(
        new Set(data.map((item) => item.manufacturer))
      ).sort();
      const formattedManufacturers = uniqueManufacturers.map(
        (manufacturer) => ({
          key: manufacturer,
          label: manufacturer,
        })
      );

      setManufacturer(formattedManufacturers);
    }
  };

  useEffect(() => {
    getManufacturer();
  }, []);

  const getModel = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("category")
      .select("model")
      .eq("modelGroup", selectedModelGroup);

    if (error) {
      console.log(error);
    } else if (data) {
      const uniqueModels = Array.from(
        new Set(data.map((item) => item.model))
      ).sort();
      const formattedModels = uniqueModels.map((model) => ({
        key: model,
        label: model,
      }));
      setModel(formattedModels);
    }
  };
  const getModelGroup = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("category")
      .select("modelGroup")
      .eq("manufacturer", selectedManufacturer);

    if (error) {
      console.log(error);
    } else if (data) {
      const uniqueModelGroups = Array.from(
        new Set(data.map((item) => item.modelGroup))
      ).sort();
      const formattedModelGroups = uniqueModelGroups.map((modelGroup) => ({
        key: modelGroup,
        label: modelGroup,
      }));
      setModelGroup(formattedModelGroups);
    }
  };
  const getData = async () => {
    if (!selectedPlatform) return;

    const supabase = createClient();
    let query = supabase
      .from("cardata")
      .select("*", { count: "exact" })
      .eq("like", false)
      .eq("platform", selectedPlatform)
      .order("created_at", { ascending: false })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      if (search && selectedPlatform === "Other") {
        query = query.or(
          `titlePo->>en.ilike.%${search}%,titlePo->>kr.ilike.%${search}%` //240107 한글 검색도 되도록 수정
        );
      }

    if (selectedPlatform === "SKEncar" && selectedManufacturer) {
      query = query.eq("manufacturerEN", selectedManufacturer);
    }
    if (selectedPlatform === "SKEncar" && selectedModel) {
      query = query.eq("modelEN", selectedModel);
    }
    if (selectedPlatform === "SKEncar" && selectedModelGroup) {
      query = query.eq("modelGroupEN", selectedModelGroup);
    }

    if (
      selectedPlatform === "SKEncar" &&
      searchModelYear &&
      searchModelYear.length === 2 &&
      (searchModelYear[0] !== 2015 || searchModelYear[1] !== currentYear)
    ) {
      // 시작년도와 끝년도 사이의 모든 연도를 포함하는 배열 생성
      const yearRange = Array.from(
        { length: searchModelYear[1] - searchModelYear[0] + 1 },
        (_, i) => String(searchModelYear[0] + i)
      );
      // 각 연도에 대해 LIKE 조건을 생성
      query = query.or(
        yearRange.map((year) => `year.ilike.${year}%`).join(",")
      );
    }

    if (
      selectedPlatform === "SKEncar" &&
      searchMileage &&
      searchMileage.length === 2 &&
      (searchMileage[0] !== 0 || searchMileage[1] !== 300000)
    ) {
      query = query
        .gte("mileage", searchMileage[0].toString())
        .lte("mileage", searchMileage[1].toString());
    }

    const { data, error, count } = await query;

    if (error) {
      console.log(error);
    } else if (data) {
      setData(data);
      setTotalPages(Math.ceil(count / itemsPerPage));
    }
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedGetData = debounce(getData, 1000);

  useEffect(() => {
    const initializeFromURL = async () => {
      const manufacturerParam = searchParams.get("manufacturer");
      const modelGroupParam = searchParams.get("modelGroup");
      const modelParam = searchParams.get("model");
      const pageParam = searchParams.get("page");
      const platformParam = searchParams.get("platform");
      const searchParam = searchParams.get("search");
      const modelYearParam = searchParams.get("modelYear");
      const mileageParam = searchParams.get("mileage");

      // Initialize platform and search
      if (platformParam) {
        setSelectedPlatform(platformParam);
      }
      if (searchParam) {
        setSearch(searchParam);
      }

      // Initialize model year range
      if (modelYearParam) {
        const [startYear, endYear] = modelYearParam.split(",").map(Number);
        setSearchModelYear([startYear, endYear]);
      }

      // Initialize mileage range
      if (mileageParam) {
        const [startMileage, endMileage] = mileageParam.split(",").map(Number);
        setSearchMileage([startMileage, endMileage]);
      }

      // Initialize manufacturer, model group, and model
      if (manufacturerParam) {
        await getManufacturer();
        setSelectedManufacturer(manufacturerParam);
        if (modelGroupParam) {
          await getModelGroup();
          setSelectedModelGroup(modelGroupParam);
          if (modelParam) {
            await getModel();
            setSelectedModel(modelParam);
          }
        }
      }

      // Initialize page
      if (pageParam) {
        setSelectedPage(parseInt(pageParam));
        setCurrentPage(parseInt(pageParam));
      }

      // Set initialization flag and trigger data fetch
      setIsInitialized(true);
    };

    initializeFromURL();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      debouncedGetData();
    }
  }, [searchParams, isInitialized]);

  useEffect(() => {
    if (selectedPlatform && isInitialized) {
      getManufacturer();
    }
  }, [selectedPlatform]);

  useEffect(() => {
    getModel();
  }, [selectedModelGroup]);

  useEffect(() => {
    getModelGroup();
  }, [selectedManufacturer]);

  // Update URL when filters change
  const updateURL = (
    manufacturer,
    modelGroup,
    model,
    page,
    platform,
    search,
    modelYear,
    mileage
  ) => {
    const params = new URLSearchParams();
    if (manufacturer) params.set("manufacturer", manufacturer);
    if (modelGroup) params.set("modelGroup", modelGroup);
    if (model) params.set("model", model);
    if (page) params.set("page", page.toString());
    if (platform) params.set("platform", platform);
    if (search) params.set("search", search);
    if (modelYear) params.set("modelYear", modelYear.toString());
    if (mileage) params.set("mileage", mileage.toString());

    router.push(`/list?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedPage(page);
    updateURL(
      selectedManufacturer,
      selectedModelGroup,
      selectedModel,
      page,
      selectedPlatform,
      search,
      searchModelYear,
      searchMileage
    );
  };

  // Add this useEffect to update pagination when searchParams changes
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
      setSelectedPage(parseInt(pageParam));
    }
  }, [searchParams]);

  return (
    <div>
      <div className="page-heading">
        <h1 className="page-title test"> {dictionary.list.all[language]} </h1>

        <Tabs
          aria-label="Options"
          selectedKey={selectedPlatform}
          onSelectionChange={(key) => {
            setSelectedPlatform(key);
            updateURL(
              selectedManufacturer,
              selectedModelGroup,
              selectedModel,
              selectedPage,
              key,
              search,
              searchModelYear,
              searchMileage
            );
          }}
          fullWidth
          size="lg"
          className="mt-5"
        >
          <Tab key="SKEncar" title="SKEncar" className="flex-1" />
          <Tab key="Other" title="Other" className="flex-1" />
        </Tabs>
      </div>
      <div className="flex">
        {selectedPlatform === "SKEncar" ? (
          <div className="w-full h-full flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full h-15 my-5">
              <div className="col-span-1">
                <Select
                  items={manufacturer}
                  label={dictionary.list.manufacturer[language]}
                  placeholder={dictionary.list.select[language]}
                  className="max-w-xs"
                  selectedKeys={
                    selectedManufacturer ? [selectedManufacturer] : []
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedManufacturer(value);
                    setSelectedModel("");
                    setSelectedModelGroup("");
                    setSelectedPlatform("SKEncar");
                    updateURL(value, "", "", 1, "SKEncar", search, searchModelYear, searchMileage);
                  }}
                >
                  {(manufacturer) => (
                    <SelectItem key={manufacturer.key}>
                      {manufacturer.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="col-span-1">
                <Select
                  items={modelGroup}
                  label={dictionary.list.modelGroup[language]}
                  placeholder={dictionary.list.select[language]}
                  className="max-w-xs"
                  selectedKeys={selectedModelGroup ? [selectedModelGroup] : []}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedModelGroup(value);
                    setSelectedModel("");
                    setSelectedPlatform("SKEncar");
                    updateURL(selectedManufacturer, value, "", 1, "SKEncar",search,searchModelYear,searchMileage);
                  }}
                >
                  {(modelGroup) => (
                    <SelectItem key={modelGroup.key}>
                      {modelGroup.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="col-span-1">
                <Select
                  items={model}
                  label={dictionary.list.model[language]}
                  placeholder={dictionary.list.select[language]}
                  className="max-w-xs"
                  selectedKeys={selectedModel ? [selectedModel] : []}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedModel(value);
                    setSelectedPlatform("SKEncar");
                    updateURL(
                      selectedManufacturer,
                      selectedModelGroup,
                      value,
                      1,
                      "SKEncar",
                      search,
                      searchModelYear,
                      searchMileage
                    );
                  }}
                >
                  {(model) => (
                    <SelectItem key={model.key}>{model.label}</SelectItem>
                  )}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-15 my-5">
              <div className="col-span-1">
                <Slider
                  label={dictionary.list.modealYearSlider[language]}
                  step={1}
                  minValue={2000}
                  maxValue={currentYear}
                  defaultValue={[2000, currentYear]}
                  {...(searchModelYear?.length === 2 && { value: searchModelYear })}
                  formatOptions={{
                    useGrouping: false,
                  }}
                  className="w-full"
                  onChange={(value) => {
                    setSearchModelYear(value);
                    updateURL(
                      selectedManufacturer,
                      selectedModelGroup,
                      selectedModel,
                      selectedPage,
                      "SKEncar",
                      search,
                      value
                    );
                  }}
                />
              </div>
              <div className="col-span-1">
                <Slider
                  label={dictionary.list.mileageSlider[language]}
                  step={10000}
                  minValue={0}
                  maxValue={300000}
                  defaultValue={[0, 300000]}
                  {...(searchMileage?.length === 2 && { value: searchMileage })}
                  className="w-full"
                  onChange={(value) => {
                    setSearchMileage(value);
                    updateURL(
                      selectedManufacturer,
                      selectedModelGroup,
                      selectedModel,
                      selectedPage,
                      "SKEncar",
                      search,
                      searchModelYear,
                      value
                    );
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full my-5">
            <div className="w-full">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  updateURL("", "", "", currentPage, "Other", e.target.value);
                }}
                startContent={
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        )}
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
        uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
      >
        {data.map((item, index) => (
          <div className="card uk-transition-toggle" key={item.id}>
            <div className="absolute top-2 right-2 z-10">
              <Chip
                size="sm"
                color={selectedPlatform === "SKEncar" ? "danger" : "success"}
              >
                {selectedPlatform === "SKEncar"
                  ? dictionary.list.tagSKEncar?.[language]
                  : dictionary.list.tagOthercar?.[language]}
              </Chip>
            </div>
            <Link href={`/list/${item.id}`}>
              <div className="card-media h-36">
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
                      {dictionary.list.year?.[language]}:{parseInt(item?.year)}
                    </div>
                    <div className="text-xs line-clamp-1 mt-1 text-right">
                      {dictionary.list.accident[language]}:
                      {item.accidentSelf?.[language]}
                    </div>
                  </>
                ) : (
                  // Other 랫폼인 경우
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
        ))}
      </div>
      <div className="flex w-full justify-center items-center py-5">
        {totalPages && (
          <Pagination
            className="text-white"
            showControls
            color="primary"
            page={currentPage}
            total={totalPages}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default AllOne;
