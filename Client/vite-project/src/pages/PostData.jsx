import React from "react";
import Navbar from "../component/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const PostData = () => {
  const navigate = useNavigate("");

  const [isuserId, setuserId] = useState("");
  const [isuserName, setuserName] = useState("");
  const [isuserPhone, setuserPhone] = useState("");
  const [isuserEmail, setuserEmail] = useState("");
  const [isuserGender, setuserGender] = useState("");

  const handleSubmit = async () => {
    const sendableData = {
      userId: isuserId,
      userName: isuserName,
      userPhone: isuserPhone,
      userEmail: isuserEmail,
      userGender: isuserGender,
    };

    if (!isuserName || !isuserEmail || !isuserPhone || !isuserGender) {
        alert("Please fill all the required fields!");
        return;
      }

    const response = await axios.post(
      "http://localhost:3000/postdetails",
      sendableData
    );
    alert("Sucessfully Loaded Data ...... ");
    navigate("/");
  };

  return (
    <div className="">
      <Navbar />
      <p className="text-3xl px-12 py-4">Input Data to API </p>
      <div className=" px-12   flex flex-col justify-start items-start  gap-5">
        <input
          type="number"
          placeholder="UserId"
          required
          className="w-1/2 border border-gray-700 rounded-lg py-2 px-5 placeholder:text-xl"
          onChange={(e) => setuserId(e.target.value)}
          value={isuserId}
        />
        <input
          type="text"
          placeholder="User Name"
          required
          className="w-1/2 border border-gray-700 rounded-lg py-2 px-5 placeholder:text-xl"
          onChange={(e) => setuserName(e.target.value)}
          value={isuserName}
        />
        <input
          type="number"
          maxLength={10}
          placeholder="UserPhone"
          required
          className="w-1/2 border border-gray-700 rounded-lg py-2 px-5 placeholder:text-xl"
          onChange={(e) => setuserPhone(e.target.value)}
          value={isuserPhone}
        />
        <input
          type="email"
          required
          placeholder="User Email"
          className="w-1/2 border border-gray-700 rounded-lg py-2 px-5 placeholder:text-xl"
          onChange={(e) => setuserEmail(e.target.value)}
          value={isuserEmail}
        />
        <input
          type="text"
          required
          placeholder="User Gender"
          className="w-1/2 border border-gray-700 rounded-lg py-2 px-5 placeholder:text-xl"
          onChange={(e) => setuserGender(e.target.value)}
          value={isuserGender}
        />
      </div>

      <div className="py-6 px-80 ">
        <button
          onClick={handleSubmit}
          className=" text-white cursor-pointer   bg-blue-800 px-5 py-2 rounded-4xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostData;
