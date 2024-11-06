"use client";
import React, { useEffect, useState, useCallback } from "react";
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
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import debounce from "lodash/debounce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
function Role({ session, language }) {
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
  const [selectData, setSelectData] = useState(null);
  const [searchCategory, setSearchCategory] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 10;
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  console.log("searchCategory:", searchCategory);
  const getData = async () => {
    let query = supabase
      .from("cardata")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (searchValue) {
      // title->>kr는 JSON 필드 title에서 kr 키의 값을 추출합니다
      query = query.ilike("title->>kr", `%${searchValue}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    setData(data);
    setCount(count);
    setTotalPages(Math.ceil(count / itemsPerPage));
    setIsLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchValue(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [currentPage, debouncedSearchValue]);

  const handleSubmit = async (selectData) => {
    console.log("selectData22:", selectData);
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: selectData.name,
        email: selectData.email,
        phone: selectData.phone,
        role: selectData.role,
        certificated: selectData.certificated,
        recommenderEmail: selectData.recommenderEmail,
        recommenderPhone: selectData.recommenderPhone,
      })
      .eq("id", selectData.id);
    if (error) {
      console.error("Error updating data:", error);
      toast.error("change failed");
      return;
    }
    console.log("Data updated successfully:", data);
    console.log("error:", error);
    toast.success("change successfully");
    getData();
  };

  const handleCancel = () => {
    setSelectData(null);
  };
  const handleStatusChange = async (itemId, newStatus) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("cardata")
      .update({ status: newStatus })
      .eq("id", itemId);

    getData();
  };

  const handleLikeChange = async (itemId, isSelected) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("cardata")
      .update({ like: isSelected })
      .eq("id", itemId);

    getData();
  };

  const handleDelete = async (itemId) => {
    const { error } = await supabase.from("cardata").delete().eq("id", itemId);
    if (error) {
      console.log("삭제 실패");
    } else {
      console.log("삭제 성공");
      getData();
    }
  };

  console.log("data:", data);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="mt-5">
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
          <div className="flex flex-col gap-y-5">
            <div className="flex justify-end gap-3">
              <Select
                placeholder="category"
                className="max-w-xs w-1/2 md:w-1/4"
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
                  <SearchIcon className="text-black/50 mb-0.5  text-slate-400 pointer-events-none flex-shrink-0" />
                }
                onChange={handleSearchChange}
                value={searchValue}
                className="w-1/2 md:w-1/4"
                type="text"
                variant="bordered"
              />
            </div>

            <Table aria-label="Example static collection table text-center">
              <TableHeader>
                <TableColumn className="text-center w-1/4 whitespace-nowrap">
                  제목
                </TableColumn>
                <TableColumn className="text-center w-1/4 whitespace-nowrap">
                  진행상황
                </TableColumn>
                <TableColumn className="text-center w-1/4 whitespace-nowrap">
                  찜하기
                </TableColumn>
                <TableColumn className="text-center w-1/4 whitespace-nowrap">
                  삭제하기
                </TableColumn>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center whitespace-nowrap">
                      <Link
                        onClick={() => {
                          onOpen();
                          setSelectData(item);
                        }}
                      >
                        {item.title[language]}
                      </Link>
                    </TableCell>
                    <TableCell className="flex justify-center text-center whitespace-nowrap">
                      <Select
                        className="w-32 whitespace-nowrap"
                        defaultSelectedKeys={[item.status]}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                        classNames={{
                          listbox: "w-32",
                          popover: "w-32",
                        }}
                      >
                        <SelectItem key="in" value="in" className="w-full">
                          판매 중
                        </SelectItem>
                        <SelectItem key="out" value="out" className="w-full">
                          판매 완료
                        </SelectItem>
                        <SelectItem key="ing" value="ing" className="w-full">
                          판매 진행 중
                        </SelectItem>
                      </Select>
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        color="primary"
                        variant="bordered"
                        isSelected={item.like}
                        onValueChange={(isSelected) =>
                          handleLikeChange(item.id, isSelected)
                        }
                      />{" "}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        color="danger"
                        variant="bordered"
                        onPress={() => {
                          onOpen2();
                          setSelectedItem(item);
                        }}
                        isDisabled={item.isRequest}
                      >
                        삭제하기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                    차량 정보
                  </ModalHeader>
                  <ModalBody className="grid grid-cols-2">
                    <div className="flex flex-col">
                      <h1 className="text-medium">물품명</h1>
                      <p className="text-sm">{selectData.title[language]}</p>
                    </div>
                    <div>
                      <h1 className="text-medium">판매가격</h1>
                      <p className="text-sm">
                        {parseInt(selectData.carPrice).toLocaleString()}만원
                      </p>
                    </div>
                    <div>
                      <h1 className="text-medium">연식</h1>
                      <p className="text-sm">{parseInt(selectData.year)}</p>
                    </div>
                    <div>
                      <h1 className="text-medium">주행거리</h1>
                      <p className="text-sm">
                        {parseInt(selectData.mileage)}km
                      </p>
                    </div>
                    <div>
                      <h1 className="text-medium">사고유무</h1>
                      <p className="text-sm">
                        {selectData.accidentSelf[language]}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-medium">차량번호</h1>
                      <p className="text-sm">{selectData.inqCrrgsnb}</p>
                    </div>
                    <div>
                      <h1 className="text-medium">판매자 이름</h1>
                      <p className="text-sm">{selectData.sellerName}</p>
                    </div>
                    <div>
                      <h1 className="text-medium">판매자 연락처</h1>
                      <p className="text-sm">{selectData.sellerPhone}</p>
                    </div>
                  </ModalBody>
                  <div className="p-10 rounded-lg flex justify-center items-center">
                    <img
                      className="rounded-lg w-auto h-72"
                      src={selectData.uploadedImageUrls[0].url}
                      alt="image"
                    />
                  </div>
                  <ModalFooter>
                    <Button
                      className="text-white"
                      color="primary"
                      onPress={() => {
                        onClose();
                      }}
                    >
                      확인
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Modal size={"md"} isOpen={isOpen2} onOpenChange={onOpenChange2}>
            <ModalContent>
              {(onClose2) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    안내
                  </ModalHeader>
                  <ModalBody className="grid grid-cols-1">
                    <p>정말 해당 상품을 삭제하시겠습니까?</p>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      className="text-white"
                      color="primary"
                      onPress={() => {
                        onClose2();
                        handleDelete(selectedItem.id);
                      }}
                    >
                      확인
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Role;

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
