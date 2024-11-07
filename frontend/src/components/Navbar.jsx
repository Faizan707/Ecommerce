import React, { useEffect, useState } from 'react';
import { PAGES } from '../routes/routes';
import { getAuthToken, removeAuthToken } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineArrowDropDown, MdMenu, MdClose } from "react-icons/md";
import useFetchCategories from '../hooks/useFetchCategories';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa"; 
import { jwtDecode } from "jwt-decode";
import CartSummary from '../pages/CartSummay';
function Navbar() {
  const [dropdown, setDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [decodedToken,setDecodeToken] = useState(false)
  const [toggleCart,setToggleCart] = useState(false)

  const { error, loading } = useFetchCategories();
  const categories = useSelector((state) => state.category.categoriesData);
  const cartCount = useSelector((state)=>state.Cart.cartItems.length); 
  const navigate = useNavigate();

  function handleDropDown() {
    setDropDown(!dropdown);
  }

  const Headings = [
    { name: "Sign Up", link: PAGES.Register },
    { 
      name: isAuthenticated && decodedToken.role === "user" ? "Logout" : "Login", 
      link: isAuthenticated && decodedToken.role === "user" ? PAGES.Home : PAGES.Login 
    },
    { name: "Admin Login", link: PAGES.AdminLogin },
    { name: "Cart" } 
  ];


  const handleToggleCart = () =>{
    setToggleCart(true)
  }

  const handleLogout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
    setDecodeToken(null); 
    navigate(PAGES.Home);
  };

  const checkAuthentication = async () => {
    const token = await getAuthToken();
    if (token) {
      setIsAuthenticated(true);
      const decoded = jwtDecode(token);
      setDecodeToken(decoded);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);



  const handleCategoriesProducts = (id, name) => {
    navigate(
      PAGES.ProductsByCategories
        .replace(":id", id)
        .replace(":name", name)
    );
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold hover:cursor-pointer" onClick={() => navigate(PAGES.Home)}>Techify</h1>
          
          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <div>
              <p onClick={handleDropDown} className="cursor-pointer text-lg flex items-center">
                Categories <MdOutlineArrowDropDown />
              </p>
              <ul className={`${
                  dropdown ? 'block' : 'hidden'
                } absolute bg-white text-black py-2 rounded-md shadow-lg mt-2 w-48`}
              >
                {loading ? (
                  <li className="px-4 py-2">Loading...</li>
                ) : error ? (
                  <li className="px-4 py-2 text-red-500">Failed to load categories</li>
                ) : (
                  categories.length > 0 ? (
                    categories.map((category) => (
                      <li key={category._id} className="px-4 py-2 hover:bg-gray-200 hover:cursor-pointer" onClick={() => handleCategoriesProducts(category._id, category.name)}>{category.name}</li>
                    ))
                  ) : (
                    <li className="px-4 py-2">No categories available</li>
                  )
                )}
              </ul>
            </div>

            <div className='flex items-center ml-auto gap-10'>
              {Headings.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  onClick={item.name === "Logout" ? handleLogout : null}
                  className='hover:text-blue-500 flex items-center relative'
                >
                  {item.name === "Cart" ? (
                    <>
                      <FaShoppingCart className="mr-2" onClick={handleToggleCart}/>
                      <span
                        className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-xs"
                      >
                        {cartCount}
                      </span>
                    </>
                  ) : null}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 p-4 flex flex-col gap-4">
              <p onClick={handleDropDown} className="cursor-pointer text-lg flex items-center">
                Categories <MdOutlineArrowDropDown />
              </p>
              <ul className={`${
                  dropdown ? 'block' : 'hidden'
                } bg-white text-black py-2 rounded-md shadow-lg mt-2 w-full`}
              >
                {loading ? (
                  <li className="px-4 py-2">Loading...</li>
                ) : error ? (
                  <li className="px-4 py-2 text-red-500">Failed to load categories</li>
                ) : (
                  categories.length > 0 ? (
                    categories.map((category) => (
                      <li key={category._id} className="px-4 py-2 hover:bg-gray-200 hover:cursor-pointer" onClick={() => handleCategoriesProducts(category._id, category.name)}>{category.name}</li>
                    ))
                  ) : (
                    <li className="px-4 py-2">No categories available</li>
                  )
                )}
              </ul>
              
              {Headings.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  onClick={() => {
                    if (item.name === "Logout") handleLogout();
                    setMobileMenuOpen(false); 
                  }}
                  className="hover:text-blue-500 flex items-center relative"
                >
                  {item.name === "Cart"   ? (
                    <>
                      <FaShoppingCart className="mr-2" onClick={handleToggleCart}/>
                      <span
                        className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-xs"
                      >
                        {cartCount}
                      </span>
                    </>
                  ) : null}
                  {item.name }
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
      {toggleCart && <CartSummary onClose={() => setToggleCart(false)} />} 
      {console.log(toggleCart)}

    </>
  );
}

export default Navbar;
