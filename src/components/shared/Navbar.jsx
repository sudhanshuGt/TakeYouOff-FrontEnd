import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { ProfilePopover } from '../ProfilePopover';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { authUser } = useSelector(store => store.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='bg-white shadow-md'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
        <div>
          <Link to="/">
            <h1 className='text-2xl font-bold'>TakeYou<span className='text-[#6A38C2]'>Off</span> </h1>
          </Link>
        </div>
        <div className='hidden sm:flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-5'>
            {
              authUser && authUser.role === "recruiter" ? (
                <>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/admin/companies"}>Companies</Link></li>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/admin/jobs"}>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/"}>Home</Link></li>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/jobs"}>Jobs</Link></li>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/browse"}>Browse</Link></li>
                </>
              )
            }
          </ul>
          {
            !authUser ? (
              <div className='flex items-center gap-2'>
                <Link to="/login"><Button variant={'outline'}>Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5f32ad]">Signup</Button></Link>
              </div>
            ) : (
              <ProfilePopover />
            )
          }
        </div>
        <div className='sm:hidden flex items-center'>
          <button onClick={toggleMenu} className='focus:outline-none'>
            {menuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden' onClick={toggleMenu}>
          <div
            className='fixed right-0 top-0 h-full w-64 bg-white shadow-md p-4'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex flex-col gap-4'>
              <ul className='flex flex-col font-medium gap-5'>
                {
                  authUser && authUser.role === "recruiter" ? (
                    <>
                      <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/admin/companies"}>Companies</Link></li>
                      <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/admin/jobs"}>Jobs</Link></li>
                    </>
                  ) : (
                    <>
                      <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/"}>Home</Link></li>
                      <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/jobs"}>Jobs</Link></li>
                      <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/browse"}>Browse</Link></li>
                    </>
                  )
                }
              </ul>
              {
                !authUser ? (
                  <div className='flex flex-col items-center gap-2'>
                    <Link to="/login"><Button variant={'outline'}>Login</Button></Link>
                    <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5f32ad]">Signup</Button></Link>
                  </div>
                ) : (
                  <ProfilePopover />
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
