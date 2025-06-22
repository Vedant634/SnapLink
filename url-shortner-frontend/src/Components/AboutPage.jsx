import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-screen bg-white pt-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        custom={0}
        className="w-full sm:py-12 py-8"
      >
        <h1 className="sm:text-4xl text-3xl font-extrabold italic text-slate-800 mb-3">
          About SnapLink
        </h1>
        <p className="text-gray-700 text-base mb-10 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full leading-relaxed">
          SnapLink makes sharing smarter. Easily create, manage, and track
          short links with real-time analytics and built-in security. Whether
          you're simplifying messy URLs or monitoring engagement, SnapLink helps
          you do it all — effortlessly.
        </p>
      </motion.div>

      <div className="space-y-10 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full">
        {[
          {
            icon: <FaLink className="text-blue-500 text-3xl mr-4" />,
            title: "Effortless Shortening",
            desc: "Create sleek, memorable links in seconds. SnapLink transforms long URLs into compact, clean versions that are easy to share and remember.",
          },
          {
            icon: <FaShareAlt className="text-green-500 text-3xl mr-4" />,
            title: "Share & Track",
            desc: "Distribute your links confidently and monitor performance with real-time data including clicks, referrers, and geography — all in one place.",
          },
          {
            icon: <FaEdit className="text-purple-500 text-3xl mr-4" />,
            title: "Privacy & Control",
            desc: "Every SnapLink is protected by strong encryption, ensuring your links and analytics stay secure. You stay in control — always.",
          },
          {
            icon: <FaChartLine className="text-red-500 text-3xl mr-4" />,
            title: "Lightning-Fast Redirection",
            desc: "Built on a high-speed infrastructure, SnapLink ensures instant redirects and maximum uptime for a seamless user experience.",
          },
        ].map(({ icon, title, desc }, index) => (
          <motion.div
            key={title}
            className="flex items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={index + 1}
          >
            {icon}
            <div>
              <h2 className="sm:text-2xl text-xl font-bold text-slate-800 mb-1">
                {title}
              </h2>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
