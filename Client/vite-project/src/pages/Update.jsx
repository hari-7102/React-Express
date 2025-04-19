import React, { useEffect , useState} from "react";
import Navbar from "../component/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { Navigate } from "react-router-dom";
const Update = () => {

    const navigate = useNavigate('')

    const[isuserId ,setuserId] = useState('')
    const[isuserName ,setuserName] = useState('')
    const[isuserPhone ,setuserPhone] = useState('')
    const[isuserEmail ,setuserEmail] = useState('')
    const[isuserGender ,setuserGender] = useState('')

    const location = useLocation()
   
    const postId = location.state
    console.log(postId)
    
    
  
    // Fetch data from the API using axios
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getdetails/${postId}`);
        console.log("response",response.data)
       
        setuserId(response.data.userId);
        setuserName(response.data.userName);
        setuserPhone(response.data.userPhone);
        setuserEmail(response.data.userEmail);
        setuserGender(response.data.userGender);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };


    const handleUpdating = async () => {

        const updatedItem = {
            "userId" : isuserId,
            "userName" : isuserName,
            "userPhone" : isuserPhone,
            "userEmail" : isuserEmail, 
            "userGender" : isuserGender
        }
        try{
            const responser = await axios.put(`http://localhost:3000/postdetails/${postId}`, updatedItem)
            alert("Successfully Updated Data ..... ")
            navigate('/')
        } catch (error) {
            console.log("Error Message" , error)
        }
    }

    useEffect(() =>{
        fetchData()
    },[])

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="p-6 font-bold text-3xl"> Update the Details : </h1>
        <div className="flex flex-col border-2 border-current rounded-md border-solid p-8 ">
          <h1 className="font-bold ">Id</h1>
          <input
            type="number"
            placeholder="Id"
            onChange={(e) => setuserId(e.target.value)}
            value={isuserId}
            className="w-96 my-2"
          />
          <h1 className="font-bold">Name</h1>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setuserName(e.target.value)}
            value={isuserName}
            className="w-96 my-2"
          />
          <h1 className="font-bold">Phone</h1>
          <input
            type="phone"
            placeholder="Phone Number"
            maxLength={10}
            value={isuserPhone}
            onChange={(e) => setuserPhone(e.target.value)}
            className="w-96 my-2"
          />
          <h1 className="font-bold">Email</h1>
          <input
            type="email"
            placeholder="Email"
            value={isuserEmail}
            onChange={(e) => setuserEmail(e.target.value)}
            className="my-2"
          />
          <h1 className="font-bold">Gender</h1>
          <input
            type="text"
            placeholder="Gender"
            value={isuserGender}
            onChange={(e) => setuserGender(e.target.value)}
            className="my-2"
          />
        </div>

        <div className=" flex justify-center items-center">
          <button
            onClick={handleUpdating}
            className=" bg-red-400 p-3   m-3 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
