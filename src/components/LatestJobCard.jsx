import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { ApplyJobDialog } from './ApplyJobDialog';
import { Avatar, AvatarImage } from './ui/avatar';

const Job = ({ job }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const timeDifference = currentDate - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 3600));
    }

    return (
        <div className='p-2 rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-50 border border-gray-200'>
            {/* Job Image and Badges */}
            <div className='relative w-full'>
                <img src={job?.image} alt="Job" className='w-full h-52 object-cover rounded-lg' />
                <Badge 
                    className='absolute top-3 left-3 bg-white bg-opacity-80 text-gray-800 font-semibold px-4 py-2 rounded-md'
                    variant={'ghost'}
                >
                    {job?.position} positions
                </Badge>

                <Badge 
                    className='absolute bottom-3 left-3 bg-white bg-opacity-80 text-gray-800 font-semibold px-4 py-2 rounded-md'
                    variant={'ghost'}
                >
                    {job?.experienceLevel} year
                </Badge>

                <Badge 
                    className='absolute bottom-3 right-3 bg-white bg-opacity-80 text-gray-800 font-semibold px-4 py-2 rounded-md'
                    variant={'ghost'}
                >
                    {job?.salary} 
                </Badge>
            </div>

            {/* Job Details */}
            <div className='mt-4'>
                <h1 className='font-bold text-xl text-gray-800'>{job?.title}</h1>
                <p className='text-sm text-gray-500 mt-2 truncate'>{job?.description}</p>
            </div>

             

            {/* Action Buttons */}
            <div className='flex justify-between items-center mt-4'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline" 
                    className="rounded-lg border-gray-300 text-gray-700"
                >
                    Details
                </Button>
                <Button 
                    onClick={() => setOpen(true)} 
                    className="bg-[#7209b7] text-white rounded-lg"
                >
                    Save For Later
                </Button>
            </div>

            {/* Apply Job Dialog */}
            <ApplyJobDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Job;
