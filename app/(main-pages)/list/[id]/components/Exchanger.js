"use client";
import React, { useState, useEffect,useCallback } from "react";
import { debounce } from "lodash";
import axios from 'axios'
function Exchanger() {
  const [country1, setCountry1] = useState("KR");
  const [country2, setCountry2] = useState("US");
  const [amount1,setAmount1]=useState(0)
  const [amount2,setAmount2]=useState(0)
  const [amount, setAmount] = useState(0);
  const [direction, setDirection] = useState("down");
  const [result, setResult] = useState("");

  const debouncedHandleSubmit = useCallback(
    debounce(() => {
      handleSubmit();
    }, 1000),
    [country1, country2, amount, direction]
  );

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        "https://uapobh3i7k7x2724w5tkcium5m0xbfbt.lambda-url.ap-northeast-2.on.aws/exchange_rate",
        {
          params: {
            country1,
            country2,
            amount,
            direction,
          }
        }
      );

      // 응답 처리
      setResult(response.data);
      if (direction==="down"){
      setAmount2(response.data.country[1].value)
      } else if (direction==="up"){
        setAmount1(response.data.country[0].value)
      }

    } catch (error) {
      console.error("Error:", error);
      
    } finally {
      console.log('11')
      
    }
  };
  console.log("result:", result);
  useEffect(() => {
    debouncedHandleSubmit();
    // Cleanup function to cancel the debounce on unmount
    return () => debouncedHandleSubmit.cancel();
  }, [debouncedHandleSubmit]);

  console.log("country1:", country1);
  console.log("country2:", country2);

  return (
    <div>
      <div>
        <h1 className="font-bold mb-2 ">환율 계산</h1>

        <div className="flex space-x-5">
          <select
            id="category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            onChange={(e) => setCountry1(e.target.value)}
          >
            <option selected="">Country</option>
            <option value="KRW">KRW</option>
            <option value="USD">USD</option>
            <option value="RUB">RUB</option>
            <option value="AED">AED</option>
          </select>
          <input
            type="text"
            name="brand"
            id="brand"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Amount"
            required=""
            value={amount1}
            onChange={(e) => {
              setAmount(e.target.value);
              setAmount1(e.target.value)
              setDirection("down");
            }}
          />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">=</div>
      <div>
        <div className="flex space-x-5">
          <select
            id="category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            onChange={(e) => setCountry2(e.target.value)}
          >
            <option selected="">Country</option>
            <option value="KRW">KRW</option>
            <option value="USD">USD</option>
            <option value="RUB">RUB</option>
            <option value="AED">AED</option>
          </select>
          <input
            type="text"
            name="brand"
            id="brand"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder=""
            required=""
            value={amount2}
            onChange={(e) => {
              setAmount(e.target.value);
              setAmount2(e.target.value)
              setDirection("up");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Exchanger;
