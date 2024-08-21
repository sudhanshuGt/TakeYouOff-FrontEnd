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
import { FaFilter } from 'react-icons/fa';
import Modal from 'react-modal';

const Jobs = () => {
    const { authUser } = useSelector((store) => store.auth);
    const { allJobs, searchText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [allJobs, searchText]);

    useEffect(() => {
        if (authUser?.role === 'recruiter') {
            navigate("/admin/jobs");
        }
    }, [authUser, navigate]);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className='bg-gray-100 h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='hidden lg:block w-[20%]'>
                        <FilterCard onClose={handleModalToggle} />
                    </div>
                    <div className='flex-1 h-[88vh] overflow-y-auto no-scrollbar pb-5'>
                        {loading ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {Array(9).fill().map((_, index) => (
                                    <Skeleton key={index} height={200} />
                                ))}
                            </div>
                        ) : filterJobs.length <= 0 ? (
                            <Jobnotfound />
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
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
            <button 
                className="fixed bottom-4 right-4 p-4 rounded-full bg-blue-500 text-white shadow-lg lg:hidden" 
                onClick={handleModalToggle}
            >
                <FaFilter size={24} />
            </button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalToggle}
                className="fixed inset-0 bg-white z-50 p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="flex justify-end">
                    <button onClick={handleModalToggle} className="text-xl font-bold">X</button>
                </div>
                <FilterCard onClose={handleModalToggle} />
            </Modal>
        </div>
    );
}

export default Jobs;
