import React from "react";
import plate from "../../assets/plate.png";
import leaf from "../../assets/leaf.png";
import { motion } from "framer-motion";
import { FadeLeft } from "../../utility/animation";
import { FadeUp } from "../../utility/animation";
import { FadeRight } from "../../utility/animation";

const Hero = () => {
    return (
        <section>
            <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
                <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
                    <div className="text-center md:text-left space-y-6 lg:max-w-[400px]">
                        <motion.h1
                            variants={FadeRight(0.6)}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl lg:text-6xl font-bold leading-snug xl:leading-snug font-averia">Scroll,
                            <br />
                            Pick, <span className="text-green-600">Cook!</span>
                        </motion.h1>
                        <motion.p
                            variants={FadeRight(0.9)}
                            initial="hidden"
                            animate="visible"
                            className="text-2xl tracking-wide" >Your next favorite recipe is just a scroll away!</motion.p>
                        <motion.p
                            variants={FadeRight(1.2)}
                            initial="hidden"
                            animate="visible"
                            className="text-gray-400">

                            Healthy and delicious recipes to kickstart your day.
                            Cook fresh meals that nourish your body and energize your mind — right from your kitchen!

                        </motion.p>
                    </div>
                </div>
                {/* Hero images */}
                <div className="flex justify-center items-center">
                    <motion.img
                        initial={{ opacity: 0, x: 200, rotate: 75 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        src={plate} alt="" className="w-[300px] md:w-[500px] drop-shadow"></motion.img>
                </div>
                <div className="absolute top-14 left-36 md:top-right-1/2 blur-sm opacity-100 rotate-[40deg]">
                    <motion.img
                        initial={{ opacity: 0, y: -200, rotate: 75 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        src={leaf} alt="" className="w-full md:max-w-[300px]"></motion.img>
                </div>
            </div>
        </section>
    )
}
export default Hero;  