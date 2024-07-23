import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setSingleJobById } from '@/redux/jobSlice';
import { useParams } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { MapPin } from 'lucide-react';
import { BuildOutlined, NoLuggageOutlined } from '@mui/icons-material';

const JobDescription = () => {
  const { singleJobById } = useSelector(store => store.job);
  const { authUser } = useSelector(store => store.auth);

  const isInitiallyApplied = singleJobById?.applications?.some(application => application.applicant === authUser?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();
  const params = useParams();

  const applyJobHandler = async () => {

    window.open(singleJobById?.link, '_blank');

    // feature to saved applied job in profile section..can be implemeted later

    //  if( authUser?.id == NoLuggageOutlined){
    //       window.open(singleJobById?.link, '_blank');
    //  }else{
    //   try {
    //     axios.defaults.withCredentials = true;
    //     const res = await axios.get(`http://localhost:8000/api/v1/application/apply/${params.id}`);
    //     if (res.data.success) {
    //       setIsApplied(true); // Update the local state
    //       const updatedJob = { ...singleJobById, applications: [...singleJobById.applications, { applicant: authUser._id }] };
    //       dispatch(setSingleJobById(updatedJob)); 
    //       toast.success(res.data.message);
    //       window.open(singleJobById?.link, '_blank');
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     toast.error(error.response.data.message);
    //   }
    //  }
  };

  useEffect(() => {
    
    const fetchSingleJob = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:8000/api/v1/job/${params.id}`);
        if (res.data.success) {
          dispatch(setSingleJobById(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === authUser?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [params.id, dispatch, authUser?._id]);

  useEffect(() => {
    if (singleJobById) {
      document.title = singleJobById.title;
    }
  }, [singleJobById]);

  const renderList = (items) => {
    return items.split(',').map((item, index) => (
      <li key={index} className='list-disc list-inside'>
        {item.trim()}
      </li>
    ));
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10 p-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
          <div>
            <h1 className='font-bold text-2xl mb-2'>{singleJobById?.title} ({singleJobById?.experienceLevel} Year Exp.)</h1>   
            <div className='flex items-center gap-2 my-2'>
              <MapPin className='text-red-500' />
              <span className='text-gray-800'>{singleJobById?.location}</span>
            </div>


            <div className='flex items-center gap-2'>
              <Badge className='text-blue-700 font-bold' variant='ghost'>{singleJobById?.position} Positions</Badge>
              <Badge className='text-[#F83002] font-bold' variant='ghost'>{singleJobById?.jobType}</Badge>
              <Badge className='text-[#7209b7] font-bold' variant='ghost'>{singleJobById?.salary} LPA</Badge>
            </div>
          </div>
          <Button
            onClick={applyJobHandler}
            className={`rounded-lg mt-4 sm:mt-0 ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <div className='my-4'>
          <h1 className='border-b-2 pb-1 border-b-gray-300 font-medium text-lg'>Job Description</h1>
        </div>
        <div className='text-gray-800'>
          {singleJobById?.description}
        </div>
        {singleJobById?.responsibility && (
          <div className='my-4'>
            <h1 className='border-b-2 pb-1 border-b-gray-300 font-medium text-lg'>Responsibility</h1>
            <ul className='text-gray-800'>
              {renderList(singleJobById.responsibility)}
            </ul>
          </div>
        )}
        {singleJobById?.qualification && (
          <div className='my-4'>
            <h1 className='border-b-2 pb-1 border-b-gray-300 font-medium text-lg'>Qualification</h1>
            <ul className='text-gray-800'>
              {renderList(singleJobById.qualification)}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default JobDescription;
