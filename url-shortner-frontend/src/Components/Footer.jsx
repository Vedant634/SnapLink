import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-700 text-white py-10 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Info */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold italic">SnapLink</h2>
          <p className="text-indigo-200 mt-1">
            Simplifying URL shortening for efficient sharing.
          </p>
        </div>

      
        <div className="text-center text-sm text-indigo-100">
          &copy; {new Date().getFullYear()} SnapLink. All rights reserved.
        </div>

        <div className="flex space-x-5">
          <a href="#" className="hover:text-yellow-300 transition">
            <FaFacebook size={22} />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <FaTwitter size={22} />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <FaInstagram size={22} />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
