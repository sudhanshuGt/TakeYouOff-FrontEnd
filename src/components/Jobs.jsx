import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import Footer from './shared/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Jobnotfound from './Jobnotfound';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Jobs = () => {
    const { authUser } = useSelector((store) => store.auth);
    const { allJobs, searchText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchText) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchText.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchText.toLowerCase()) ||
                    job?.location?.toLowerCase().includes(searchText.toLowerCase())
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }

        // Introducing a 1-second manual delay
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [allJobs, searchText]);

    useEffect(() => {
        if (authUser?.role === 'recruiter') {
            navigate("/admin/jobs");
        }
    }, [authUser, navigate]);

    return (
        <div className='bg-gray-100 h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    <div className='flex-1 h-[88vh] overflow-y-auto no-scrollbar pb-5'>
                        {loading ? (
                            <div className='grid grid-cols-3 gap-4'>
                                {Array(9).fill().map((_, index) => (
                                    <Skeleton key={index} height={200} />
                                ))}
                            </div>
                        ) : filterJobs.length <= 0 ? (
                            <Jobnotfound />
                        ) : (
                            <div className='grid grid-cols-3 gap-4'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;
