"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function AccordionComponent({carData, dictionary, language }) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion variant="splitted" className="my-5" defaultExpandedKeys={["1"]}>
      <AccordionItem
        className="shadow-none border border-gray-200"
        key="1"
        aria-label={dictionary.detail.extint[language]}
        title={dictionary.detail.extint[language]}
      >
        <ul className="my-5 grid grid-cols-3 space-y-4 text-gray-600 text-sm ">
          {carData.optionExtInt.map((elem, index) => {
            return (
              <li className="flex items-center gap-3 col-span-1 text-center justify-center">
                {elem.optionName[language]}
              </li>
            );
          })}
        </ul>
      </AccordionItem>
      <AccordionItem
        className="shadow-none border border-gray-200"
        key="2"
        aria-label={dictionary.detail.safety[language]}
        title={dictionary.detail.safety[language]}
      >
        <ul className="my-5 grid grid-cols-3 space-y-4 text-gray-600 text-sm ">
          {carData.optionSafety.map((elem, index) => {
            return (
              <li className="flex items-center gap-3 col-span-1 text-center justify-center">
                {elem.optionName[language]}
              </li>
            );
          })}
        </ul>
      </AccordionItem>
      <AccordionItem
        className="shadow-none border border-gray-200"
        key="3"
        aria-label={dictionary.detail.convenience[language]}
        title={dictionary.detail.convenience[language]}
      >
        <ul className="my-5 grid grid-cols-3 space-y-4 text-gray-600 text-sm ">
          {carData.optionConvenience.map((elem, index) => {
            return (
              <li className="flex items-center gap-3 col-span-1 text-center justify-center">
                {elem.optionName[language]}
              </li>
            );
          })}
        </ul>
      </AccordionItem>
      <AccordionItem
        className="shadow-none border border-gray-200"
        key="4"
        aria-label={dictionary.detail.seat[language]}
        title={dictionary.detail.seat[language]}
      >
        <ul className="my-5 grid grid-cols-3 space-y-4 text-gray-600 text-sm ">
          {carData.optionSeat.map((elem, index) => {
            return (
              <li className="flex items-center gap-3 col-span-1 text-center justify-center">
                {elem.optionName[language]}
              </li>
            );
          })}
        </ul>
      </AccordionItem>
      <AccordionItem
        className="shadow-none border border-gray-200"
        key="5"
        aria-label={dictionary.detail.etc[language]}
        title={dictionary.detail.etc[language]}
      >
        <ul className="my-5 grid grid-cols-3 space-y-4 text-gray-600 text-sm ">
          {carData.optionEtc.map((elem, index) => {
            return (
              <li className="flex items-center gap-3 col-span-1 text-center justify-center">
                {elem.optionName[language]}
              </li>
            );
          })}
        </ul>
      </AccordionItem>
    </Accordion>
  );
}
