import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"]
    },
    {
        filterType: "Salary",
        array: ["0 - 40k", "42k to 1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = ({ onClose }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchText(selectedValue));
        if (selectedValue) {
            onClose(); // Close the modal when a value is selected
        }
    }, [selectedValue, dispatch, onClose]);

    return (
        <div className='w-full bg-white p-4 rounded-lg shadow-md'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
            </div>
            <hr className='mt-3 mb-4' />
            <RadioGroup value={selectedValue} onValueChange={handleChange}>
                {filterData.map((data, index) => (
                    <div key={index} className="mb-4">
                        <h2 className='font-semibold text-base mb-2'>{data.filterType}</h2>
                        {data.array.map((item, idx) => {
                            const itemId = `r${index}-${idx}`;
                            return (
                                <div key={idx} className="flex items-center space-x-3 my-2">
                                    <RadioGroupItem 
                                        value={item} 
                                        id={itemId} 
                                        className="w-4 h-4 border-2 border-gray-300 rounded-full checked:bg-blue-600 transition-all" 
                                    />
                                    <Label 
                                        htmlFor={itemId} 
                                        className="text-sm text-gray-700 cursor-pointer"
                                    >
                                        {item}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
