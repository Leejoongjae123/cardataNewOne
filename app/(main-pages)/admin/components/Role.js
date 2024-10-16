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

function Role({ session }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
      .select("*, answerId(*),productId(*)", { count: "exact" })
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
  console.log("data1111:", data);
  return (
    <div className="mt-5">
      <div class="flex flex-col gap-y-5">
        <div className="flex justify-end gap-3">
          <Select placeholder="category" className="max-w-xs w-1/2 md:w-1/4" defaultSelectedKeys={"1"}>
            
              <SelectItem key='name'>name</SelectItem>
              <SelectItem key='email'>email</SelectItem>
              <SelectItem key='phone'>phone</SelectItem>
            
          </Select>
          <Input
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            className="w-1/2 md:w-1/4"
            type="text"
            variant="bordered"
          />
        </div>

        <Table aria-label="Example static collection table text-center">
          <TableHeader>
            <TableColumn className="text-center w-1/6">NAME</TableColumn>
            <TableColumn className="text-center w-1/6">EMAIL</TableColumn>
            <TableColumn className="text-center w-1/6">PHONE</TableColumn>
            <TableColumn className="text-center w-1/6">ROLE</TableColumn>
            <TableColumn className="text-center w-1/6">CERTIFICATION</TableColumn>
            <TableColumn className="text-center w-1/6">EDIT</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="text-center">Tony Reichert</TableCell>
              <TableCell className="text-center">CEO</TableCell>
              <TableCell className="text-center">Active</TableCell>
              <TableCell className="text-center">Active</TableCell>
              <TableCell className="text-center">Active</TableCell>
              <TableCell className="text-center">
                <Button className='' variant="bordered"  color='danger'>
                  수정
                </Button>
              </TableCell>
            </TableRow>
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
                <p>{responseData.answerId.description}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={onClose}
                >
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
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

function formatDateToWords(timestamp) {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
