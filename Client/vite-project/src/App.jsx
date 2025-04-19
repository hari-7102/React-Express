import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostData from "./pages/PostData";
import Update from "./pages/Update";

const App = () => {
  // const [apidata, Setapidata] = useState([]);

  // const getapi = async () => {
  //   const response = await axios.get("http://localhost:3000/getdetails");

  //   console.log("response", response);

  //   Setapidata(response.data);
  //   console.log("respodne", response.data);
  // };

  // useEffect(() => {
  //   getapi();
  // }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postdata" element={<PostData />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </Router>
      {/* <>
        <div className="overflow-x-auto p-4">
          <table className="min-w-1/2 border-collapse bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Gender</th>
              </tr>
            </thead>
            <tbody>
              {apidata.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{item.userId}</td>
                  <td className="py-3 px-6">{item.userName}</td>
                  <td className="py-3 px-6">{item.userPhone}</td>
                  <td className="py-3 px-6">{item.userEmail}</td>
                  <td className="py-3 px-6">{item.userGender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </> */}
    </div>
  );
};

export default App;
