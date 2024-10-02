import React from 'react'

const DashProfile = () => {
  return (
    <div className=' flex-1 flex justify-center text-gray-700'>
         <div className=' relative flex flex-col  bg-gradient-to-r from-red-300 via-red-600 to-red-800 p-2 w-full h-72 rounded-xl'>
             <p className=' text-gray-200 text-center text-2xl'>Edit Profile</p>

         <div className=' w-40 h-40 flex justify-center absolute bottom-[-40px] left-[45%] cursor-pointer  items-center rounded-full border-gray-500 border-2 '>
           <img src="/profile.jpg" className='w-[156px] h-[156px] rounded-full' alt="" srcSet="" />   
         </div>
         </div>
         
         <div>
            <form className=' space-y-4'>
                 
            </form>
         </div>
    </div>
  )
}

export default DashProfile