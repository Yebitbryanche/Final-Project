import React from 'react'
import bag from "../../assets/images/bag.jpg"
import yemele from "../../assets/images/yemele.jpeg"
import bryan from "../../assets/images/bryan.jpeg"
import angela from "../../assets/images/angela.jpeg"


function Developers() {
  return (
    <div className='p-4 md:p-10 flex flex-col justify-between gap-8'>
        <p className='text-4xl text-secondary font-bold justify-center items-center flex'>Meet Our Team of Builders</p>

        <div className='flex justify-center items-center gap-5'>
            <img src={yemele} alt="" className='w-50 h-50 rounded-full object-cover' />
            <img src={bryan} alt="" className='w-50 h-50 rounded-full mt-40 object-cover'/>
            <img src={angela} alt="" className='w-50 h-50 rounded-full object-cover' />
            <img src={bag} alt="" className='w-50 h-50 rounded-full mt-40 object-cover'/>
            <img src={bag} alt="" className='w-50 h-50 rounded-full object-cover'/>
            <img src={bag} alt="" className='w-50 h-50 rounded-full mt-40 object-cover'/>

        </div>
        <div className='text-center flex flex-col gap-4'>
            
            <p className='text-2xl font-bold'>We are a passionate team of developers driven by innovation and collaboration. With 2 skilleds <span className='text-primary'>Backend Engineers </span> <span className='text-sm'> and 3 creative Frontend Developers, we bring ideas to life by combining strong technical foundations with engaging user experiences.</span></p>
            
        </div>
        
      
    </div>
  )
}

export default Developers
