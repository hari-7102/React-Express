import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../component/Navbar';

import { useNavigate , useLocation } from 'react-router-dom';

const Home = () => {

    const location = useLocation()

    const navigate = useNavigate('')
    const [isDeleted, setIsDeleted] = useState(false);
    const [apidata, Setapidata] = useState([]);

    const getapi = async () => {
      const response = await axios.get("http://localhost:3000/getdetails");
  
    //   console.log("response", response);
  
      Setapidata(response.data);
    //   console.log("respodne", response.data);
    };

    const handleDelete = async (id) => {
        
        const responser = await axios.delete(`http://localhost:3000/postdetails/${id}`, {
         method: 'DELETE',
         
   
       });
       navigate(0)
       console.log(responser)
    };


    useEffect(()=>{
        handleDelete()
    },[isDeleted])
  
    useEffect(() => {
      getapi();
    }, []);


  return (
     <div className=" text-start  ">
      <p><Navbar/></p>
      <>
        <div className="overflow-x-auto p-4  ">
          <table className="min-w-1/2 w-full  border-collapse bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Gender</th>
                <th className="py-3 px-6 text-center ">Action</th>
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

                  <td>
                    <button onClick={(e) => navigate('/update', {state : item._id})} className='text-white cursor-pointer bg-green-800 px-5 py-1 rounded-2xl'>Update</button>
                    <button onClick={(e) => handleDelete(item._id)} className='text-white cursor-pointer bg-red-800 px-5 py-1 rounded-2xl'>Delete</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  )
}

export default Home