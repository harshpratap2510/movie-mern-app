import React from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../../components/Navbar';

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Navbar/>
      <div className='bg-black flex flex-col gap-12 items-center justify-center h-fit min-h-screen'>
            <div onClick={()=> navigate("/create-movie")} className=' flex items-center justify-center border hover:scale-105 transition-all border-gray-400 border-l-4 rounded-lg hover:border-white text-teal-400 w-64 h-16 text-xl'>
                    Create Movie
            </div>
            <div onClick={()=> navigate("/all-movies")} className=' flex items-center justify-center border hover:scale-105 transition-all border-gray-400 border-l-4 rounded-lg hover:border-white text-teal-400 w-64 h-16 text-xl'>
                    Edit Movie
            </div>
            <div onClick={()=> navigate("/all-movies")} className=' flex items-center justify-center border hover:scale-105 transition-all border-gray-400 border-l-4 rounded-lg hover:border-white text-teal-400 w-64 h-16 text-xl'>
                    Delete Movie
            </div>
            <div onClick={()=> navigate("/all-profiles")} className=' flex items-center justify-center border hover:scale-105 transition-all border-gray-400 border-l-4 rounded-lg hover:border-white text-teal-400 w-64 h-16 text-xl'>
                    All Users
            </div>  
      </div>
    </div>
  )
}

export default Dashboard
