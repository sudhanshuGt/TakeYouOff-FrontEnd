import React from 'react';
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className='max-w-7xl mx-auto my-20 p-4'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center'>
        <span className='text-[#6A38C2]'>Latest and Top</span> Job Openings
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
        {allJobs && allJobs.slice(0, 6).map(job => (
          <Link key={job._id} to={`/description/${job._id}`}>
            <LatestJobCard job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
