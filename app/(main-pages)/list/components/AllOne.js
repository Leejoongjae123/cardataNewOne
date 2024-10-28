"use client";
import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";
import { Input } from "@nextui-org/input";
import { createClient } from "@/utils/supabase/client";
import {Chip} from "@nextui-org/react";
function AllOne({language, dictionary}) {
  const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);

  const [manufacturer, setManufacturer] = useState([]);
  const [model, setModel] = useState([]);
  const [modelGroup, setModelGroup] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedModelGroup, setSelectedModelGroup] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("1");
  const [selectedPlatform, setSelectedPlatform]=useState("SKEncar")
  const itemsPerPage = 20;

  const getManufacturer = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("category")
      .select("manufacturer");

    if (error) {
      console.log(error);
    } else if (data) {
      const uniqueManufacturers = Array.from(
        new Set(data.map((item) => item.manufacturer))
      );
      const formattedManufacturers = uniqueManufacturers.map(
        (manufacturer) => ({
          key: manufacturer,
          label: manufacturer,
        })
      );
      setManufacturer(formattedManufacturers);
    }
  };

  const getModel = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("category")
      .select("model")
      .eq("manufacturer", selectedManufacturer);

    if (error) {
      console.log(error);
    } else if (data) {
      const uniqueModels = Array.from(new Set(data.map((item) => item.model)));
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
      .eq("model", selectedModel);

    if (error) {
      console.log(error);
    } else if (data) {
      const uniqueModelGroups = Array.from(
        new Set(data.map((item) => item.modelGroup))
      );
      const formattedModelGroups = uniqueModelGroups.map((modelGroup) => ({
        key: modelGroup,
        label: modelGroup,
      }));
      setModelGroup(formattedModelGroups);
    }
  };

  const getData = async () => {
    const supabase = createClient();
    let query = supabase
      .from("cardata")
      .select("*", { count: "exact" })
      .eq('like', false)  // Add this line to filter for like = false
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (selectedManufacturer) {
      query = query.eq("manufacturer", selectedManufacturer);
    }
    if (selectedModel) {
      query = query.eq("model", selectedModel);
    }
    if (selectedModelGroup) {
      query = query.eq("modelGroup", selectedModelGroup);
    }

    const { data, error, count } = await query;

    if (error) {
      console.log(error);
    } else if (data) {
      setData(data);
      setTotalPages(Math.ceil(count / itemsPerPage));
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage, selectedManufacturer, selectedModel, selectedModelGroup]);

  useEffect(() => {
    getManufacturer();
    getData();
  }, []);

  useEffect(() => {
    getModel();
  }, [selectedManufacturer]);

  useEffect(() => {
    getModelGroup();
  }, [selectedModel]);

  console.log("manufacturer:", manufacturer);
  console.log("model:", model);
  console.log("data:", data);
  return (
    <div>
      <div className="page-heading">
        <h1 className="page-title test"> {dictionary.list.all[language]} </h1>

        <nav className="nav__underline">
          <ul
            className="group"
            uk-switcher="connect: #group-tabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
          >
            <li>
              {" "}
              <a onClick={()=>{
                setSelectedPlatform("SKEncar")
              }}> SK Encar</a>
            </li>
            <li>
              
              <a onClick={()=>{
                setSelectedPlatform("Other")
              }}> Other car</a>{" "}
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full h-15 my-5">
          <div className="col-span-1">
            <Select
              items={manufacturer}
              label={dictionary.list.manufacturer[language]}
              placeholder="Select"
              className="max-w-xs"
              onChange={(e) => {
                setSelectedManufacturer(e.target.value);
                setSelectedModel("");
                setSelectedModelGroup("");
              }}
            >
              {(manufacturer) => <SelectItem>{manufacturer.label}</SelectItem>}
            </Select>
          </div>
          <div className="col-span-1">
            <Select
              items={model}
              label={dictionary.list.model[language]}
              placeholder="Select"
              className="max-w-xs"
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setSelectedModelGroup("");
              }}
            >
              {(model) => <SelectItem>{model.label}</SelectItem>}
            </Select>
          </div>
          <div className="col-span-1">
            <Select
              items={modelGroup}
              label={dictionary.list.modelGroup[language]}
              placeholder="Select"
              className="max-w-xs"
              onChange={(e) => setSelectedModelGroup(e.target.value)}
            >
              {(modelGroup) => <SelectItem>{modelGroup.label}</SelectItem>}
            </Select>
          </div>

          {/* <div className="w-full h-15 p-2">
            <button
              type="button"
              className="button bg-primary text-white w-full h-full px-5"
            >
              Search
            </button>
          </div> */}
        </div>
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
                {selectedPlatform}
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
                <p className="card-text text-black font-medium line-clamp-2">
                  {item.title}
                </p>
                <div className="text-xs line-clamp-1 mt-1 text-right">
                  Mileage:{parseInt(item.mileage)}km{" "}
                </div>
                <div className="text-xs line-clamp-1 mt-1 text-right">
                  Year:{parseInt(item.year)}{" "}
                </div>
                <div className="text-xs line-clamp-1 mt-1 text-right">
                  Accident:{item.accidentSelf}{" "}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center items-center py-5">
        <Pagination
          className="text-white"
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default AllOne;
