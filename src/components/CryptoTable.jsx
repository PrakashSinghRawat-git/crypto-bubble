import React, { useEffect, useState } from "react";
import { data } from "@/constants/change_in_crypto";

const CryptoTable = ({ stats }) => {
  const [isRecommend, setisRecommend] = useState(false);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    // Define the URL you want to fetch data from
    let url = "https://cryptostats.onrender.com/change-in-crypto";
    if (isRecommend) {
      url = "https://cryptostats.onrender.com/recommend-me-crypto";
    }

    // Fetch data from the URL
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        // Store the fetched data in the state variable
        console.log(res.data[0]);
        setData2(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [isRecommend]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-[85%]  z-999">
      <button
        onClick={() => setisRecommend(!isRecommend)}
        className="bg-green-300 rounded px-4 py-2 mt-4"
      >
        {!isRecommend ? "Recommend Me" : "Overview"}
      </button>
      <table className="w-full text-sm text-left rtl:text-right   text-white  font-semibold bg-[#1E2A31]  ">
        <thead className="text-xs   uppercase bg-gray-700    text-white  font-semibold">
          <tr>
            <th scope="col" className="p-4">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Market Cap
            </th>
            <th scope="col" className="px-6 py-3">
              24h Volume
            </th>
            <th scope="col" className="px-6 py-3">
              Day
            </th>
            <th scope="col" className="px-6 py-3">
              Week
            </th>
            <th scope="col" className="px-6 py-3">
              Month
            </th>
            <th scope="col" className="px-6 py-3">
              Year
            </th>
            <th scope="col" className="px-6 py-3">
              Circulating Supply
            </th>
          </tr>
        </thead>
        <tbody>
          {data2?.map((item, index) => (
            <tr className="   border-gray-700   hover:bg-gray-600" key={index}>
              <td className="w-4 p-4">{index + 1}</td>
              <th
                scope="row"
                className="px-6 py-4   whitespace-nowrap   text-white  font-semibold"
              >
                {item.coin_name}
              </th>

              <td className="px-6 py-4">{item?.Open}$</td>
              <td className="px-6 py-4">{item["Market Cap"]}$</td>
              <td className="px-6 py-4">{item?.Volume}$</td>

              {data?.map((i, ind) => {
                if (i.coin_name === item.coin_name) {
                  return (
                    <td
                      className={`px-6 py-4 border-b ${
                        i.change_day >= 0 == 0 ? "bg-red-500" : "bg-green-500"
                      }`}
                      key={ind}
                    >
                      {i.change_day.toFixed(2)}%
                    </td>
                  );
                } else {
                  return null;
                }
              })}
              {data?.map((i, ind) => {
                if (i.coin_name === item.coin_name) {
                  return (
                    <td
                      className={`px-6 py-4 border-b ${
                        i.change_week >= 0 == 0 ? "bg-red-500" : "bg-green-500"
                      }`}
                      key={ind}
                    >
                      {i.change_week.toFixed(2)}%
                    </td>
                  );
                } else {
                  return null;
                }
              })}
              {data?.map((i, ind) => {
                if (i.coin_name === item.coin_name) {
                  return (
                    <td
                      className={`px-6 py-4 border-b ${
                        i.change_month >= 0 == 0 ? "bg-red-500" : "bg-green-500"
                      }`}
                      key={ind}
                    >
                      {i.change_month.toFixed(2)}%
                    </td>
                  );
                } else {
                  return null;
                }
              })}
              {data?.map((i, ind) => {
                if (i.coin_name === item.coin_name) {
                  return (
                    <td
                      className={`px-6 py-4 border-b ${
                        i.change_year >= 0 == 0 ? "bg-red-500" : "bg-green-500"
                      }`}
                      key={ind}
                    >
                      {i.change_year.toFixed(2)}%
                    </td>
                  );
                } else {
                  return null;
                }
              })}
              <td className="px-6 py-4">{item["Circulating Supply"]}$</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
