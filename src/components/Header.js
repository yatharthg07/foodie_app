import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();

  return (
    <div className="flex justify-between items-center  bg-pink-100 m-2 shadow-lg rounded-md text-lg ">
      <div className="logo-container">
        <img className="w-40" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="nav-items mr-2 ">
        <ul className="flex space-x-6 items-center">
          <li>Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
          </li>
          <li>Cart</li>
          <button
            className="login px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}  
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
