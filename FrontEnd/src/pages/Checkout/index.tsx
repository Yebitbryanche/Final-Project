import { FaArrowCircleRight, FaEnvelope, FaLongArrowAltRight, FaStripeS, FaUser } from "react-icons/fa"
import { FaPaypal } from "react-icons/fa6"
import { GiDeliveryDrone } from "react-icons/gi"
import { GrDeliver } from "react-icons/gr"
import { IoPeople } from "react-icons/io5"
import { MdDeliveryDining } from "react-icons/md"

function Checkout() {
  return (
    <div className="px-5 sm:px-10 py-5 flex flex-col md:flex-row gap-5">
      {/* Left Section */}
      <div className="flex flex-col flex-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl py-3 text-primary font-bold">Checkout</h1>
        <p className="text-sm sm:text-base md:text-lg text-black/70">
          Please checkout your products and we'll leave them at your doorstep
        </p>

        {/* Info Section */}
        <div>
          <div className="flex flex-col py-3 gap-3">
            <p className="py-1 text-primary font-medium">Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <p className="text-sm sm:text-base">First Name</p>
                <div className="w-full p-2 flex gap-x-2 rounded-md bg-secondary/5 items-center border-b border-secondary/40 cursor-pointer transition-all duration-300 ease-in-out hover:border-primary">
                  <FaUser className="text-black/40" />
                  <p className="text-black/50">Yebit</p>
                </div>
              </div>

              {/* Last Name */}
              <div>
                <p className="text-sm sm:text-base">Last Name</p>
                <div className="w-full p-2 flex gap-x-2 rounded-md bg-secondary/5 items-center border-b border-secondary/40 cursor-pointer transition-all duration-300 ease-in-out hover:border-primary">
                  <IoPeople className="text-black/40" />
                  <p className="text-black/50">Bryan Che</p>
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <p className="text-sm sm:text-base">Email</p>
                <div className="w-full p-2 flex gap-x-2 rounded-md bg-secondary/5 items-center border-b border-secondary/40 cursor-pointer transition-all duration-300 ease-in-out hover:border-primary">
                  <FaEnvelope className="text-black/40" />
                  <p className="text-black/50">pana@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="flex flex-col py-3">
            <h1>
              <p className="py-1 text-primary font-medium">Delivery Method</p>
            </h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-x-3 bg-secondary/5 cursor-pointer p-3 rounded-lg text-secondary border-2 border-secondary/10 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-primary">
                <GiDeliveryDrone />
                <p>Same Day</p>
              </div>
              <div className="flex items-center gap-x-3 bg-secondary/5 cursor-pointer p-3 rounded-lg text-secondary border-2 border-secondary/10 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-primary">
                <MdDeliveryDining />
                <p>Next Day</p>
              </div>
              <div className="flex items-center gap-x-3 bg-secondary/5 cursor-pointer p-3 rounded-lg text-secondary border-2 border-secondary/10 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-primary">
                <GrDeliver />
                <p>Standard</p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="py-3">
            <h1 className="py-1 text-primary font-medium">Payment</h1>
            <div className="flex flex-wrap gap-4">
              <button className="flex gap-x-3 bg-secondary/5 cursor-pointer p-3 rounded-md items-center transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
                <FaStripeS size={25} color="violet" />
                <p>Stripe</p>
              </button>
              <button className="flex gap-x-3 bg-secondary/5 cursor-pointer p-3 rounded-md items-center transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
                <FaPaypal size={25} color="dodgerblue" />
                <p>Paypal</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center">
        <div className="w-full md:w-[80%] shadow-md rounded-lg overflow-hidden">
          <div className="bg-primary text-white rounded-t-lg">
            <div className="flex justify-between p-3 text-sm sm:text-base">
              <p>Bryan</p>
              <p>15/10/2022</p>
            </div>
            <div className="flex justify-between p-3">
              <p>****5281</p>
            </div>
          </div>

          <div className="flex py-5 px-3 items-center shadow-xs justify-between text-sm sm:text-base">
            <p>Manage Cart</p>
            <FaLongArrowAltRight className="cursor-pointer transition-transform duration-300 hover:translate-x-1" />
          </div>

          {/* Order Summary */}
          <div className="flex flex-col py-3 items-center">
            <p className="text-2xl sm:text-3xl md:text-4xl text-center">32 Items</p>
            <div className="p-3 w-full sm:w-[90%]">
              <div className="flex justify-between p-2 text-sm sm:text-base"><p>SubTotal</p><p className="text-primary">13,000 XAF</p></div>
              <div className="flex justify-between p-2 text-sm sm:text-base"><p>Discount Total</p><p className="text-primary">1,000 XAF</p></div>
              <div className="flex justify-between p-2 text-sm sm:text-base"><p>Delivery</p><p className="text-primary">500 XAF</p></div>
              <div className="flex justify-between p-2 font-semibold text-sm sm:text-base"><p>Total</p><p className="text-primary">12,500 XAF</p></div>
            </div>

            <button className="flex gap-x-2 bg-secondary rounded-lg p-3 justify-center items-center text-white transition-all duration-300 ease-in-out hover:bg-primary">
              <p>Buy</p>
              <FaArrowCircleRight />
            </button>

            <p className="text-xs sm:text-sm font-bold py-3">
              <span className="text-primary">Mboa</span>
              <span className="text-secondary">Kako</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
