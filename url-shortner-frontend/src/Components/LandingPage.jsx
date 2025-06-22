import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useStoreContext } from "../contextApi/ContextApi";
import Card from "./Card";

const LandingPage = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full bg-white font-rounded">
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
        
        <motion.h1
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, type: "spring" }}
          className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-purple-900 via-purple-600 to-pink-300 text-transparent bg-clip-text drop-shadow-[3px_3px_0px_rgba(156,39,176,0.5)]"
        >
          URL Shortener
        </motion.h1>

        <motion.p
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, type: "spring" }}
          className="text-xl sm:text-2xl font-semibold text-gray-800 max-w-2xl"
        >
          Paste your untidy link to shorten it. Create a shortened & neat link, making it easy to remember.
        </motion.p>

       
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0, type: "spring" }}
          onClick={handleGetStarted}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-7 py-3 rounded-xl shadow-[0_8px_20px_rgba(76,29,149,0.6)] hover:scale-105 transition-all duration-300 active:translate-y-1 active:shadow-sm text-lg"
        >
          Get Started
        </motion.button>
      </div>

     
      <div className="pt-4 pb-7 grid lg:gap-7 gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4 px-4">
        <Card
          title="Simple URL Shortening"
          desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
        />
        <Card
          title="Powerful Analytics"
          desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies."
        />
        <Card
          title="Enhanced Security"
          desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
        />
        <Card
          title="Fast and Reliable"
          desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users."
        />
      </div>
    </div>
  );
};

export default LandingPage;
