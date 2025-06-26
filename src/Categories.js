import { TiThSmallOutline } from "react-icons/ti";
import { LuVegan } from "react-icons/lu";
import { FaBowlFood } from "react-icons/fa6";
import { MdNoFood } from "react-icons/md";
import { LuMilkOff } from "react-icons/lu";
import { PiBowlFoodFill } from "react-icons/pi";
import { delay } from "framer-motion";

const categories = [
    {
        id: 1,
        name: "All",
        image: <TiThSmallOutline className="w-[60px] h-[60px] text-green-600"/>,
        delay: 0.3,
    },
    {
        id: 2,
        name: "Vegan",
        image: <LuVegan className="w-[60px] h-[60px] text-green-600"/>,
        delay: 0.6,
    },
    {
        id: 3,
        name: "Vegetarian",
        image: <FaBowlFood className="w-[60px] h-[60px] text-green-600"/>,
        delay: 0.9,
    },
    {
        id: 4,
        name: "Gluten Free",
        image: <MdNoFood className="w-[60px] h-[60px] text-green-600"/>,
        delay: 1.2,
    },
    {
        id: 5,
        name: "Dairy Free",
        image: <LuMilkOff className="w-[60px] h-[60px] text-green-600"/>,
        delay: 1.5,
    },
    {
        id: 6,
        name: "Healthy",
        image: <PiBowlFoodFill className="w-[60px] h-[60px] text-green-600"/>,
        delay: 1.8,
    },
]

export default categories;