"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Pagination } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { Chip, Textarea } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "@nextui-org/react";
import axios from "axios";
import { SearchIcon } from "./SearchIcon";
import debounce from "lodash/debounce";

function Answer({ session, language }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
  const [answer, setAnswer] = useState(null);
  const [message, setMessage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [isUnanswered, setIsUnanswered] = useState(false);
  const itemsPerPage = 5;

  const getData = async () => {
    let query = supabase
      .from("requests")
      .select("*, productId(*),userId(*)", { count: "exact" })
      .order("created_at", { ascending: false });

    // searchValue가 있을 경우 title 검색 조건 추가
    if (searchValue) {
      query = query.ilike("titlekr", `%${searchValue}%`);
    }
    if (isUnanswered) {
      query = query.is("response", false);
    }

    const { data, error, count } = await query.range(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage - 1
    );

    if (error) {
      console.error("데이터 조회 실패:", error);
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
  }, [currentPage, debouncedSearchValue, isUnanswered]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };
  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchValue(value);
    }, 300),
    []
  );

  const changeData = async () => {
    const { data, error } = await supabase
      .from("requests")
      .update({ response: responseData.response })
      .eq("id", responseData.id);
    if (error) {
      toast.error("업데이트 실패:", error);
      return;
    }
    toast.success("업데이트 완료");
  };

  const saveAnswer = async () => {
    const { data, error } = await supabase
      .from("requests")
      .update({ answer: answer, responseDate: new Date(), response: true })
      .eq("id", responseData.id);
    if (error) {
      toast.error("업데이트 실패:", error);
      return;
    }
    toast.success("업데이트 완료");
    getData();
    setResponseData((prevResponseData) => ({
      ...prevResponseData,
      answer: answer,
    }));
  };

  const handleSendMail = async () => {
    const response = await axios.post(
      "https://ye6igz6td727rdifjkb4gsco3u0krbpw.lambda-url.ap-northeast-2.on.aws/send-email",
      {
        receiver: responseData.userId.email,
        responsedatetime: formatDateToWords(new Date()),
        name: responseData.productId.title[language],
        number: responseData.productId.inqCrrgsnb,
        modelyear: parseInt(responseData.productId.year),
        mileage: parseInt(responseData.productId.mileage),
        fuel: responseData.productId.fuelType[language],
        color: responseData.productId.clr[language],
        accidenthistory: responseData.productId.accidentSelf[language],
        result: responseData.answer,
        id: responseData.productId.id.toString(),
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const response2 = await axios.post(
      "https://ye6igz6td727rdifjkb4gsco3u0krbpw.lambda-url.ap-northeast-2.on.aws/send-email",
      {
        receiver: responseData.userId.recommenderEmail,
        responsedatetime: formatDateToWords(new Date()),
        name: responseData.productId.title[language],
        number: responseData.productId.inqCrrgsnb,
        modelyear: parseInt(responseData.productId.year),
        mileage: parseInt(responseData.productId.mileage),
        fuel: responseData.productId.fuelType[language],
        color: responseData.productId.clr[language],
        accidenthistory: responseData.productId.accidentSelf[language],
        result: responseData.answer,
        id: responseData.productId.id.toString(),
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setMessage("메일 송부 완료");
      onOpen2();
    } else {
      setMessage("메일 송부 실패");
      onOpen2();
    }
  };
  console.log("responseData:", responseData);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-end gap-3 items-center my-5 md:my-0">
        <div className="flex  w-full justify-end items-center">
          <Select
            placeholder="category"
            className="w-full md:w-1/4"
            defaultSelectedKeys={["title"]}
            onChange={(e) => setSearchCategory(e.target.value)}
            isDisabled
          >
            <SelectItem key="title" value="title">
              제목
            </SelectItem>
          </Select>
          <Input
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            onChange={handleSearchChange}
            value={searchValue}
            className="w-full md:w-1/4"
            type="text"
            variant="bordered"
          />
        </div>

        <Checkbox
          className="w-full"
          isSelected={isUnanswered}
          onValueChange={setIsUnanswered}
        >
          미회신
        </Checkbox>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
                          setAnswer(item.answer);
                          onOpen();
                        }}
                      >
                        회신완료
                      </Button>
                    ) : (
                      <Button
                        onPress={() => {
                          setResponseData(item);
                          setAnswer(item.answer);
                          onOpen();
                        }}
                        className="text-white"
                      >
                        검토중
                      </Button>
                    )}
                  </Chip>
                  <h1 className="ml-2 text-medium font-semibold">
                    {item.productId.title[language]}
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
      <Modal size={"2xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Contents
              </ModalHeader>
              <ModalBody>
                <div>
                  <h1>Sender</h1>
                  <ul>
                    <li>Name:{responseData.userId.name}</li>
                    <li>Email:{responseData.userId.email}</li>
                    <li>Phone:{responseData.userId.phone}</li>
                  </ul>
                </div>
                <hr />
                <div>
                  <h1>Title</h1>
                  <p>
                    Hello, this is Sincar. I am sending this email to provide
                    the vehicle appraisal value for the vehicle you requested on{" "}
                    {formatDateToWords(responseData.responseDate)}.
                  </p>
                </div>

                <hr className="" />
                <h2>Spec</h2>
                <ul>
                  <li>Name:{responseData.productId.title[language]}</li>
                  <li>Number:{responseData.productId.inqCrrgsnb}</li>
                  <li>Model Year:{responseData.productId.year}</li>
                  <li>Mileage:{responseData.productId.mileage}</li>
                  <li>Fuel:{responseData.productId.fuelType[language]}</li>
                  <li>Color:{responseData.productId.clr[language]}</li>
                  <li>
                    Accident History:
                    {responseData.productId.accidentSelf[language]}
                  </li>
                </ul>
                <hr className="" />
                <h2>Result</h2>
                <Textarea
                  label=""
                  placeholder="Enter your description"
                  className="w-full"
                  onChange={(e) => setAnswer(e.target.value)}
                  value={answer}
                />

                <hr />
                <h1>※ 엔카경로</h1>
                <Link
                  target="_blank"
                  href={`https://www.encar.com/dc/dc_cardetailview.do?pageid=fc_carleaserent_l01&listAdvType=rent&carid=${responseData.productId.productId}`}
                >
                  {`https://www.encar.com/dc/dc_cardetailview.do?pageid=fc_carleaserent_l01&listAdvType=rent&carid=${responseData.productId.productId}`}
                </Link>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={() => {
                    onClose();
                    handleSendMail();
                  }}
                >
                  메일송부
                </Button>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={() => {
                    saveAnswer();
                  }}
                >
                  저장하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"lg"} isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <ModalContent>
          {(onClose2) => (
            <>
              <ModalHeader className="flex flex-col gap-1">결과</ModalHeader>
              <ModalBody>
                <p>{message}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={() => {
                    onClose2();
                  }}
                >
                  닫기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Answer;

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
