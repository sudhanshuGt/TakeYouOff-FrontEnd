import React from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Engineer",
    "Data Science",
    "Graphic Designer",
    "UI Developer",
    "Wordpress Developer",
];

export function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleClick = (item) => {
        dispatch(setSearchText(item));
        navigate("/browse");
    };

    return (
        <div className="w-full max-w-7xl mx-auto my-10 px-4">
            {/* For larger screens */}
            <div className="hidden lg:flex lg:justify-center lg:space-x-4 lg:overflow-x-auto lg:pb-4">
                {category.map((item, index) => (
                    <Button
                        key={index}
                        onClick={() => handleClick(item)}
                        variant="outline"
                        className="rounded-full whitespace-nowrap px-4 py-2"
                    >
                        {item}
                    </Button>
                ))}
            </div>

            {/* For smaller screens */}
            <div className="lg:hidden flex flex-wrap justify-center gap-2">
                {category.map((item, index) => (
                    <Button
                        key={index}
                        onClick={() => handleClick(item)}
                        variant="outline"
                        className="rounded-full px-3 py-1 text-sm"
                    >
                        {item}
                    </Button>
                ))}
            </div>
        </div>
    );
}
