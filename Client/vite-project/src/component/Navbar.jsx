import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
const Navbar = () => {

  const location = useLocation('')

  const  nav = [
    {name : 'Home' , to: '/'},
    {name : 'PostData' , to: '/postdata'},
    {name : 'Update' , to: '/update'},
  ]
  return (
    <div>
      <nav className="bg-gray-200">
        <ul className="flex justify-center text-xl items-start  gap-6 py-4">
          {nav.map((item , index ) =>(
              <p className={` px-4 py-1 ${location.pathname == item.to ? 'bg-amber-300 rounded-2xl' : 'underline underline-offset-2'}  `}>
              <li><Link to={item.to}>{item.name}</Link></li>
            </p>
          ))

          }

 
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
