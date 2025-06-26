import React from "react";
import categories from "../../Categories";
import { motion } from "framer-motion";
import { FadeLeft } from "../../utility/animation";

function Home({ handleCategorySelect }) {
  return (
    <div className="w-full mb-9">
      <div className="flex flex-wrap justify-center items-center gap-5 w-full">
        {categories.map((item) => (
          <motion.div
            key={item.id}
            variants={FadeLeft(item.delay)}
            initial="hidden"
            whileInView="visible"
            onClick={() => handleCategorySelect(item.name)} 
            className="w-[140px] h-[150px] bg-white flex flex-col items-center gap-4 p-5 justify-center text-[17px] font-semibold text-gray-600 rounded-xl shadow-2xl hover:bg-green-200 cursor-pointer transition-all duration-200"
          >
            {item.image}
            <span>{item.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
