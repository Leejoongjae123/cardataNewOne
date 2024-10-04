"use client";
import React from "react";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";
import { Input } from "@nextui-org/input";

function AllOne() {
  const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
  return (
    <div>
      <div className="page-heading">
        <h1 className="page-title test"> All </h1>

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
      <div className="flex">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full h-15 my-5">
          <Select
            items={animals}
            label="Favorite Animal"
            placeholder="Select an animal"
            className="max-w-xs"
          >
            {(animal) => <SelectItem>{animal.label}</SelectItem>}
          </Select>
          <Select
            items={animals}
            label="Favorite Animal"
            placeholder="Select an animal"
            className="max-w-xs"
          >
            {(animal) => <SelectItem>{animal.label}</SelectItem>}
          </Select>
          <Select
            items={animals}
            label="Favorite Animal"
            placeholder="Select an animal"
            className="max-w-xs"
          >
            {(animal) => <SelectItem>{animal.label}</SelectItem>}
          </Select>
          <div className="w-full h-15 p-2">
            <button
              type="button"
              className="button bg-primary text-white w-full h-full px-5"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
        uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
      >
        {items.map((item, index) => (
          <div className="card uk-transition-toggle" key={index}>
            <Link href={`/list/${index}`}>
              <div className="card-media h-36">
                <img src="/images/product/product-8.jpg" alt="" />
                <div className="card-overly"></div>
              </div>
            </Link>
            <div className="card-body flex justify-between">
              <div className="flex-1">
                <p className="card-text text-black font-medium line-clamp-1">
                  Benz
                </p>
                <div className="text-xs line-clamp-1 mt-1"> E-Class </div>
              </div>
              <h4 className="card-title"> 50$/20M </h4>
            </div>
            
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center items-center py-5">
        <Pagination className="text-white" total={10} initialPage={1} />
      </div>
    </div>
  );
}

export default AllOne;
