"use client";
import React, { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from '@nextui-org/react'
function Answer({ session }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createClient();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("1");
  const [responseData, setResponseData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [answer, setAnswer] = useState(null);

  const itemsPerPage = 5;
  const getData = async () => {
    const { data, error, count } = await supabase
      .from("requests")
      .select("*, productId(*)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

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
  }, [currentPage]);

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
      .update({ answer: answer, response_at: new Date(),response:true })
      .eq("id", responseData.id);
    if (error) {
      toast.error("업데이트 실패:", error);
      return;
    }
    toast.success("업데이트 완료");
    getData();
    setAnswer("");
    
  }
  console.log("responseData:", responseData);
  const handleSendMail = async () => {
    try {
      const response = await fetch('https://ye6igz6td727rdifjkb4gsco3u0krbpw.lambda-url.ap-northeast-2.on.aws/send-email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          receiver: responseData.productId.email, // 가정: 이메일 필드가 productId 객체 내에 있다고 가정
          responsedatetime: formatTimestamp(new Date()),
          name: responseData.productId.title,
          number: responseData.productId.inqCrrgsnb,
          modelyear: responseData.productId.year,
          mileage: responseData.productId.mileage,
          fuel: responseData.productId.fuelType,
          color: responseData.productId.clr,
          accidenthistory: responseData.productId.accidentSelf,
          result: responseData.answer,
          id: responseData.id
        })
      });
  
      if (response.ok) {
        toast.success("이메일이 성공적으로 전송되었습니다.");
      } else {
        toast.error("이메일 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("이메일 전송 중 오류 발생:", error);
      toast.error("이메일 전송 중 오류가 발생했습니다.");
    }
  };
  return (
    <div>
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
      <div class="box p-5 mt-4">
        {data.map((item, index) => (
          <>
            <div class="card-list">
              <div class="card-list-media h-32">
                <img src={item.thumbImage} alt="" />
              </div>

              <div class="card-list-body flex flex-col justify-center items-start">
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
                    {item.title}
                  </h1>
                </div>
                <p class="card-list-text">{item.description}</p>
                <div class="card-list-link">
                  {" "}
                  {formatTimestamp(item.created_at)}{" "}
                </div>{" "}
              </div>
            </div>
            {index !== data.length - 1 && <hr class="card-list-divider" />}
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
                <p>
                  Hello, this is Sincar. I am sending this email to provide the
                  vehicle appraisal value for the vehicle you requested on{" "}
                  {formatDateToWords(responseData.response_at)}.
                </p>
                <hr className="" />
                <h2>Spec</h2>
                <ul>
                  <li>Name:{responseData.productId.title}</li>
                  <li>Number:{responseData.productId.inqCrrgsnb}</li>
                  <li>Model Year:{responseData.productId.year}</li>
                  <li>Mileage:{responseData.productId.mileage}</li>
                  <li>Fuel:{responseData.productId.fuelType}</li>
                  <li>Color:{responseData.productId.clr}</li>
                  <li>
                    Accident History:{responseData.productId.accidentSelf}
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
                <Link target="_blank" href={`https://www.encar.com/dc/dc_cardetailview.do?pageid=fc_carleaserent_l01&listAdvType=rent&carid=${responseData.productId.productId}`}>
                  {`https://www.encar.com/dc/dc_cardetailview.do?pageid=fc_carleaserent_l01&listAdvType=rent&carid=${responseData.productId.productId}`}
                </Link>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={()=>{
                    saveAnswer();
                    handleSendMail();
                    onClose();
                  }}
                >
                  메일송부
                </Button>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={() => {
                    saveAnswer();
                    onClose();
                  }}
                >
                  저장하기
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
