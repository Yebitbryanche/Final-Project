import React from 'react'
import yemele from "../assets/images/yemele.jpeg"
import angela from "../assets/images/angela.jpeg"
import bryan from "../assets/images/bryan.jpeg"
import solomon from '../assets/images/solomon.jpeg'
import princess from "../assets/images/princess.jpeg"
import portfolio from "../assets/images/portfolio.png"
import darius from "../assets/images/Darius.jpeg"

function Portfolio() {
  return (
    <div className="p-4 md:p-15 mt-[4rem]">
      {/* text container */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-15 items-center md:items-start text-center md:text-left">
        <div className="font-bold text-4xl md:text-6xl ">
          <h2>Hello,</h2>
        </div>
        <div className="text-base md:text-lg max-w-lg">
          <p>
            As part of our development journey, we collaborated to build a modern e-commerce platform that allows users to browse products, add them to a cart, and make secure payments.
          </p>
        </div>
      </div>

      {/* undraw image */}
      <div className="flex justify-center md:justify-start">
        <img 
          src={portfolio} 
          alt=""  
          className="w-full sm:w-[300px] md:w-150 mt-6 md:ml-100 object-cover"
        />
      </div>

      <div>
        <p className="text-2xl md:text-4xl font-bold flex justify-center items-center mt-[4rem] md:mt-[8rem]">
          Meet our core team
        </p>

        {/* flexed images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-8 mt-[2rem] md:mt-[4rem]">
          <div className="text-center">
            <img src={yemele} alt="" className="object-cover w-full sm:w-auto md:w-150 h-64 md:h-100 mx-auto"/>
            <p className="text-sm md:text-lg underline mt-2">YEMELE KENFACK</p>
          </div>

          <div className="text-center">
            <img src={bryan} alt="" className="object-cover w-full sm:w-auto md:w-150 h-64 md:h-100 mx-auto"/>
            <p className="text-sm md:text-lg underline mt-2">YEBIT BRYAN</p>
          </div>

          <div className="text-center">
            <img src={solomon} alt="" className="object-cover w-full sm:w-auto md:w-150 h-64 md:h-100 mx-auto"/>
            <p className="text-sm md:text-lg underline mt-2">SONDRE SOLOMON</p>
          </div>

          <div className="text-center">
            <img src={angela} alt="" className="object-cover w-full sm:w-auto md:w-150 h-64 md:h-100 mx-auto"/>
            <p className="text-sm md:text-lg underline mt-2">ANGELA KEMUGNE</p>
          </div>

          <div className="text-center">
            <img src={princess} alt="" className="object-cover w-full sm:w-auto md:w-150 h-64 md:h-100 mx-auto"/>
            <p className="text-sm md:text-lg underline mt-2">DONFACK PRINCESS</p>
          </div>

          <div className="text-center">
            <img src={darius} alt="" className="object-cover w-full sm:w-auto md:w-150 h-64 md:h-100 mx-auto"/>
            <p className="text-sm md:text-lg underline mt-2">DARIUS NANA</p>
          </div>
        </div>
      </div>

      <div className="mt-[4rem] md:mt-[6rem] flex justify-center items-center">
        <p className="font-bold text-lg md:text-2xl">
          Powered By, <span className="text-primary">Mboa <span className="text-secondary">Kako</span></span>
        </p>
      </div>
    </div>
  )
}

export default Portfolio
