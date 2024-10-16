"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { Chip } from "@nextui-org/react";
function MyPrice({ session }) {
  const supabase = createClient();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("1");
  const itemsPerPage = 5;
  console.log("session:", session);
  const getData = async () => {
    const { data, error, count } = await supabase
      .from("requests")
      .select("*", { count: "exact" })
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

  console.log("data22:", data);
  console.log("totalPages:", totalPages);

  return (
    <div>
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
                    {item.response ? "회신완료" : "검토중"}
                  </Chip>
                  <h1 className="ml-2 text-medium font-semibold">
                    {item.title}
                  </h1>
                </div>
                <p class="card-list-text">{item.description}</p>
                <div class="card-list-link"> {formatTimestamp(item.created_at)} </div>{" "}
                
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
    </div>
  );
}

export default MyPrice;

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
