import React, { useEffect, useState } from 'react';
import { PAGES } from '../routes/routes';
import { getAuthToken,removeAuthToken } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const [dropdown, setDropDown] = useState(false);
  const [isAuthenticated,setIsAuthenticated]= useState(false)
  const [decodedToken,setDecodetoken] = useState(false)
  function handleDropDown() {
    setDropDown(!dropdown);
  }
  const Headings=[{
    name:"Sign Up",link:PAGES.Register 
  },
  
    { name: isAuthenticated && decodedToken.role === "user" ? "Logout" : "Login", link: isAuthenticated && decodedToken.role === "user"? PAGES.Home : PAGES.Login },
    { name:"Admin Login" ,link: PAGES.AdminLogin }

]



const navigate =useNavigate()
const handleLogout = () => {
    removeAuthToken(); 
    setIsAuthenticated(false); 
    navigate(PAGES.Home);
  };



useEffect(()=>{
    const checkAuth = async () =>{
        const token = await getAuthToken()
        setIsAuthenticated(token)
        const decodedToken = jwtDecode(token)
        setDecodetoken(decodedToken)

    
}
    checkAuth()
},[])

  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex items-center gap-10">
          <h1 className="text-xl font-bold hover:cursor-pointer" onClick={()=>navigate(PAGES.Home)}>Techify</h1>
          
          <div>
            <p
              onClick={handleDropDown}
              className="cursor-pointer  text-lg flex items-center"
            >
              Categories <MdOutlineArrowDropDown/>
            </p>

            <ul
              className={`${
                dropdown ? 'block' : 'hidden'
              } absolute bg-white text-black py-2 rounded-md shadow-lg mt-2 w-48`}
            >
              <li className="px-4 py-2 hover:bg-gray-200">Watches</li>
              <li className="px-4 py-2 hover:bg-gray-200">Handfrees</li>
              <li className="px-4 py-2 hover:bg-gray-200">AirPods</li>
              <li className="px-4 py-2 hover:bg-gray-200">Laptop</li>
            </ul>
          </div>

          <div className='flex items-center ml-auto gap-10'>
              {Headings.map((item,index)=>(
                <Link
                key={index}
                to={item.link}
                onClick={item.name === "Logout" ? handleLogout : null} 
                className='hover:text-blue-500'
                >
                {item.name}
                </Link>
              ))}
          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;
