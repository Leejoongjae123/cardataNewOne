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
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import debounce from "lodash/debounce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@nextui-org/react";
function Role({ session, language }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createClient();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("1");
  const [responseData, setResponseData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [selectData, setSelectData] = useState(null);
  const [searchCategory, setSearchCategory] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const getData = async () => {
    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (searchValue) {
      query = query.ilike(searchCategory, `%${searchValue}%`);
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
  console.log("selectData:", selectData);

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
        <div class="flex flex-col gap-y-5">
          <div className="flex justify-end gap-3">
            <Select
              placeholder="category"
              className="max-w-xs w-1/2 md:w-1/4"
              defaultSelectedKeys={["name"]}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <SelectItem key="name" value="name">
                이름
              </SelectItem>
              <SelectItem key="email" value="email">
                이메일
              </SelectItem>
              <SelectItem key="phone" value="phone">
                연락처
              </SelectItem>
            </Select>
            <Input
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
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
              <TableColumn className="text-center w-1/6">이름</TableColumn>
              <TableColumn className="text-center w-1/6">이메일</TableColumn>
              <TableColumn className="text-center w-1/6">연락처</TableColumn>
              <TableColumn className="text-center w-1/6">권한</TableColumn>
              <TableColumn className="text-center w-1/6">
                CERTIFICATION
              </TableColumn>
              <TableColumn className="text-center w-1/6">비고</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-center">{item.email}</TableCell>
                  <TableCell className="text-center">{item.phone}</TableCell>
                  <TableCell className="text-center">{item.role}</TableCell>
                  <TableCell className="text-center">
                    {item.certificated.toString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onPress={() => {
                        onOpen();
                        setSelectData(item);
                      }}
                      className=""
                      variant="bordered"
                      color="danger"
                    >
                      수정
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
                  Information
                </ModalHeader>
                <ModalBody className="grid grid-cols-2">
                  <div className="flex flex-col">
                    <h1>생성일자</h1>
                    <Input
                      // onChange={(e) => setSelectData({ ...selectData, created_at: e.target.value })}
                      value={formatTimestamp(selectData?.updated_at)}
                      className="w-full"
                      type="text"
                      disabled
                    />
                  </div>
                  <div>
                    <h1>이름</h1>
                    <Input
                      onChange={(e) =>
                        setSelectData({ ...selectData, name: e.target.value })
                      }
                      value={selectData?.name || ""}
                      className="w-full"
                      type="text"
                    />
                  </div>
                  <div>
                    <h1>이메일</h1>
                    <Input
                      onChange={(e) =>
                        setSelectData({ ...selectData, email: e.target.value })
                      }
                      value={selectData?.email || ""}
                      className="w-full"
                      type="text"
                      disabled
                    />
                  </div>
                  <div>
                    <h1>전화번호</h1>
                    <Input
                      onChange={(e) =>
                        setSelectData({ ...selectData, phone: e.target.value })
                      }
                      value={selectData?.phone || ""}
                      className="w-full"
                      type="text"
                    />
                  </div>
                  <div>
                    <h1>역할</h1>
                    <Select
                      onChange={(e) =>
                        setSelectData({ ...selectData, role: e.target.value })
                      }
                      selectedKeys={selectData?.role ? [selectData.role] : []}
                      className="w-full "
                    >
                      <SelectItem key="master" value="master">
                        Master
                      </SelectItem>
                      <SelectItem key="client" value="client">
                        Client
                      </SelectItem>
                      <SelectItem key="recommender" value="recommender">
                        Recommender
                      </SelectItem>
                    </Select>
                  </div>
                  <div>
                    <h1>인증</h1>
                    <Select
                      onChange={(e) =>
                        setSelectData({
                          ...selectData,
                          certificated: e.target.value === "true",
                        })
                      }
                      selectedKeys={[selectData?.certificated?.toString()]}
                      className="w-full"
                    >
                      <SelectItem key="true" value="true">
                        True
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        False
                      </SelectItem>
                    </Select>
                  </div>
                  <div>
                    <h1>추천인 이메일</h1>
                    <Input
                      onChange={(e) =>
                        setSelectData({
                          ...selectData,
                          recommenderEmail: e.target.value,
                        })
                      }
                      value={selectData?.recommenderEmail || ""}
                      className="w-full"
                      type="text"
                    />
                  </div>
                  <div>
                    <h1>추천인 연락처</h1>
                    <Input
                      onChange={(e) =>
                        setSelectData({
                          ...selectData,
                          recommenderPhone: e.target.value,
                        })
                      }
                      value={selectData?.recommenderPhone || ""}
                      className="w-full"
                      type="text"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="bg-red-500"
                    color="danger"
                    variant="bordered"
                    onPress={() => {
                      onClose();
                      handleCancel();
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    className="text-white"
                    color="primary"
                    onPress={() => {
                      onClose();
                      handleSubmit(selectData);
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
