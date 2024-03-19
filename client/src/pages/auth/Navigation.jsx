import React, { useState } from "react";
import "./Navigation.css";
import {
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";

import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavouritesCount from "../products/FavoritesCount";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

function Navigation() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-black bg-[white] w-[4%] hover:w-[15%] h-[100vh]  fixed border border-r-gray-400 `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-cente space-y-1">
        <Link
          to="/"
          className="flex items-center text-center transition-transform transform hover:translate-x-2"
        >
          <AiFillHome className="mr-2 mt-[3rem]" size={26} color="90EE90" />
          <span className=" font-poppins font-bold hidden nav-item-name mt-[3rem]">
            Home
          </span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2 text-center"
        >
          <HiShoppingBag className="mr-2 mt-[3rem]" size={26} color="#FF5733" />
          <span className="font-poppins  font-bold hidden nav-item-name mt-[3rem]">
            Shop
          </span>{" "}
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2 text-center">
            <FaShoppingCart className="mt-[3rem] mr-2" size={26} color="#ADD8E6" />
            <span className=" font-poppins  font-bold hidden nav-item-name mt-[3rem]">
              Cart
            </span>{" "}
          </div>

          <div className="absolute top-10">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[3rem] mr-2" size={20} color="#ffb6c1"/>
            <span className=" font-poppins  font-bold hidden nav-item-name mt-[3rem]">
              Favorites
            </span>{" "}
            <FavouritesCount />
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-black focus:outline-none p-5 border bg-slate-200 w-full  justify-between"
        >
          {userInfo ? (
            <>
              <span className="text-black font-poppins  font-bold ">
                {userInfo.username}
              </span>
            </>
          ) : (
            <></>
          )}
          {userInfo && (
            <IoIosArrowDown size={25} className=" ml-3 text-black" />
          )}
        </button>
      

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-25 space-y-1 bg-white-400 text-black font-bold border rounded-md px-3 ${
              !userInfo.isadmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.isadmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100  "
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block px-4 py-2 text-left hover:bg-gray-100  "
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
export default Navigation;
