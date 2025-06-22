import React from 'react'
import { motion } from "framer-motion";

const Card = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] border border-slate-200 px-6 py-8 flex flex-col gap-4 hover:shadow-[0_12px_28px_rgba(76,29,149,0.12)] transition-shadow duration-300"
    >
      
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-l-[60px] border-t-purple-600 border-l-transparent"></div>

      <h1 className="text-slate-900 text-xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="text-slate-600 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
};

export default Card;
