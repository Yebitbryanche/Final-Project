import yemele from "../assets/images/yemele.jpeg"
import angela from "../assets/images/angela.jpeg"
import bryan from "../assets/images/bryan.jpeg"
import solomon from '../assets/images/solomon.jpeg'
import princess from "../assets/images/princess.jpeg"
import portfolio from "../assets/images/portfolio.png"

function Portfolio() {
  return (
    <div className='p-4 md:p-15 mt-[4rem]'>
      {/* text container */}
      <div className='flex gap-15 '>
        <div className='text-bold text-6xl'>
          <h2>Hello,</h2>

        </div>
        <div className='text-lg text-center '>
          <p>As part of our development journey, we collaborated to build a modern e-commerce platform that allows users to browse products, add them to a cart, and make secure payments.</p>

        </div>
      </div>
      {/* undraw image */}
        <img src={portfolio} alt=""  className='w-150 ml-100 object-cover'/>
      

      <div>
        <p className='text-4xl text-bold flex justify-center items-center mt-[8rem]'>Meet our core team</p>
        {/* flexed images */}
        <div className='grid grid-cols-2 gap-8 grid-rows-3 mt-[4rem] '>
          <div className=''>
          <img src={yemele} alt="" 
           className=' object-cover w-150 h-100'
          />
          <p className='text-lg underline'>YEMELE KENFACK</p>

          </div>

          <div className=''>
            <img src={bryan} alt="" 
           className=' object-cover w-150 h-100'
          />
          <p className='text-lg underline'>YEBIT BRYAN</p>
          </div>


           <div className=''>
          <img src={solomon} alt="" 
           className=' object-cover w-150 h-100'
          />
          <p className='text-lg underline'>SONDRE SOLOMON</p>

          </div>

          <div className=''>
            <img src={angela} alt="" 
           className=' object-cover w-150 h-100'
          />
          <p className='text-lg underline'>ANGELA KEMUGNE</p>
          </div>


           <div className=''>
          <img src={princess} alt="" 
           className=' object-cover w-150 h-100'
          />
          <p className='text-lg underline'>DONFACK PRINCESS</p>

          </div>

          <div className=''>
            <img src={yemele} alt="" 
           className=' object-cover w-150 h-100'
          />
          <p className='text-lg underline'>YEMELE KENFACK</p>
          </div>

          

          

          


          
        </div>
        
        
      </div>

      <div className='mt-[6rem] flex justify-center items-center'>
        <p className='tex-bold text-2xl '>Powered By, <span className='text-lg text-primary'>Mboa <span  className='text-lg text-secondary'>Kako</span></span></p>
      </div>
      
    </div>
  )
}

export default Portfolio
