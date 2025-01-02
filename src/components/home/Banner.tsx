import React from 'react';

const Banner = () => {
  return (
    <div
    className="relative bg-cover bg-center bg-no-repeat md:h-[550px]"
    style={{
      backgroundImage: `url('https://i.ibb.co.com/w4yW08H/banner-micro1.jpg')`, 
    }}
  >
    <div className="bg-gradient-to-r from-white to-white/10 py-16 px-6 md:py-24 lg:py-32 md:h-[550px]  ">
      <div className="max-w-5xl mx-auto text-start">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
          Find part time jobs, freelance jobs, and remote jobs here
        </h1>
        <p className="text-black mt-4">
          Thousands of small businesses use <span className="text-blue-600 font-semibold">Micro Service</span> to turn their ideas into reality.
        </p>
        <div className="mt-8 flex flex-col md:flex-row justify-center ">
          <div className="flex items-center w-full md:w-1/2 bg-white shadow-md border-r-2 rounded-l-lg ">
            <span className="text-gray-500 pl-4">Where?</span>
            <input
              type="text"
              placeholder="Online Job"
              className="flex-grow py-3 px-4 text-gray-700 bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center w-full md:w-1/2 bg-white shadow-md  ">
            <span className="text-gray-500 pl-4">What job do you want?</span>
            <input
              type="text"
              placeholder="Job Title or Keywords"
              className="flex-grow py-3 px-4 text-gray-700 bg-transparent focus:outline-none"
            />
          </div>
          <button className="py-3 px-6 bg-blue-600 text-white font-bold rounded-r-lg shadow-md hover:bg-blue-700 hover:scale-105">
            Search
          </button>
        </div>
        <div className="  mt-12 md:mt-16 flex justify-center gap-6">
          <div className=' border-r-2 border-black pr-6'>
            <h3 className="text-lg md:text-xl font-bold text-black">1,586</h3>
            <p className="text-gray-800 font-semibold">Jobs Posted</p>
          </div>
          <div className=' border-r-2 border-black pr-6'>
            <h3 className="text-lg md:text-xl font-bold text-black">3,543</h3>
            <p className="text-gray-800 font-semibold">Service Posted</p>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-black">1,232</h3>
            <p className="text-gray-800 font-semibold">Shops</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Banner;