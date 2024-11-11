"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { Chip } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function MyPrice({ session, language, dictionary }) {
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();
  const supabase = createClient();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("1");
  const [responseData, setResponseData] = useState(null);
  const [productData, setProductData] = useState(null);
  const itemsPerPage = 5;
  const getData = async () => {
    const { data, error, count } = await supabase
      .from("requests")
      .select("*, productId(*)", { count: "exact" })
      .eq("userId", session.user.email)
      .order("created_at", { ascending: false })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    setData(data);
    setCount(count);
    setTotalPages(Math.ceil(count / itemsPerPage));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  console.log("language:", language);

  return (
    <div>
      <div className="box p-5 mt-4">
        {data.map((item, index) => (
          <>
            <div className="card-list">
              <div className="card-list-media h-32">
                <img src={item.thumbImage} alt="" />
              </div>

              <div className="card-list-body flex flex-col justify-center items-start">
                <div className="w-full flex justify-start items-center">
                  <Chip
                    className="mx-2 text-white"
                    color={item.response ? "primary" : "danger"}
                  >
                    {item.response ? (
                      <Button
                        className="text-white"
                        onPress={() => {
                          setResponseData(item);
                          onOpen1();
                        }}
                      >
                        {dictionary.mypage.reviewComplete[language]}
                      </Button>
                    ) : (
                      <Button
                        onPress={() => {
                          setResponseData(item);
                          onOpen2();
                        }}
                        className="text-white"
                      >
                        {dictionary.mypage.underreview[language]}
                      </Button>
                    )}
                  </Chip>
                  <h1 className="ml-2 text-medium font-semibold">
                    {item.title}
                  </h1>
                </div>
                <p className="card-list-text">{item.description}</p>
                <div className="card-list-link">
                  {" "}
                  {formatTimestamp(item.created_at)}{" "}
                </div>{" "}
              </div>
            </div>
            {index !== data.length - 1 && <hr className="card-list-divider" />}
          </>
        ))}
      </div>
      <div className="flex w-full justify-center items-center py-5">
        <Pagination
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
          className="text-white"
        />
      </div>
      <Modal size={"2xl"} isOpen={isOpen1} onOpenChange={onOpenChange1}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {dictionary.mypage.contents[language]}
              </ModalHeader>
              <ModalBody>
                {responseData && (
                  <>
                    <p>
                      Hello, this is Sincar. I am sending this email to provide
                      the vehicle appraisal value for the vehicle you requested
                      on {formatDateToWords(responseData.response_at)}.
                    </p>
                    <hr className="" />
                    <h2>{dictionary.mypage.specification[language]}</h2>
                    {responseData.platform === "SKEncar" ? (
                      <ul>
                        <li>
                          Name: {responseData?.productId?.title?.[language]}
                        </li>
                        <li>Number: {responseData?.productId?.inqCrrgsnb}</li>
                        <li>Model Year: {responseData?.productId?.year}</li>
                        <li>Mileage: {responseData?.productId?.mileage}</li>
                        <li>
                          Fuel: {responseData?.productId?.fuelType?.[language]}
                        </li>
                        <li>
                          Color: {responseData?.productId?.clr?.[language]}
                        </li>
                        <li>
                          Accident History:
                          {responseData.productId?.accidentSelf?.[language]}
                        </li>
                      </ul>
                    ) : (
                      <ul>
                        <li>
                          Name: {responseData.productId.titlePo?.[language]}
                        </li>
                        <li>Number: {responseData.productId.carNoPo}</li>
                        <li>
                          Model Year: {responseData.productId.modelYearPo}
                        </li>
                        <li>Mileage: {responseData.productId.mileagePo}</li>
                        <li>
                          Accident History:
                          {responseData.productId?.isAccidentPo?.[language]}
                        </li>
                      </ul>
                    )}
                    <hr className="" />
                    <h2>{dictionary.mypage.result[language]}</h2>
                    <p>{responseData.answer}</p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={onClose}
                >
                  {dictionary.mypage.confirm[language]}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"2xl"} isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {dictionary.mypage.contents[language]}
              </ModalHeader>
              <ModalBody>{dictionary.mypage.notyet[language]}</ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={onClose}
                >
                  {dictionary.mypage.confirm[language]}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MyPrice;

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function formatDateToWords(timestamp) {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
