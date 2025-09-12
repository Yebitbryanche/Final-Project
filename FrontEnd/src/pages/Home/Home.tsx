import images from "../../types/images";
import Herobutton from "../../components/Herobutton";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel";
import Rating from "../../components/Ratingstar";
import Addtocardbutton from "../../components/Addtocardbutton";
import Buynowbutton from "../../components/Buynowbutton";
import { useEffect, useState } from "react";
import { api } from "../../API/Registration";
import { addToCart } from "../../services/addtoCart";
import type UserProps from "../../types/UserRead";
import type ProductProps from "../../types/products";

const Home = () => {
  const token = localStorage.getItem("token")
  const [user, setUser] = useState<UserProps>()
  const [products, setProducts] =useState<ProductProps[]>([])

  useEffect(() =>{
    api.get('/products')
    .then((res) =>{
     console.log(res.data) 
     setProducts(res.data.slice(0,4))  
    })
    .catch((error:any) => console.log(error.message))
  },[])

  useEffect(() => {
    api.get('/users/me', {
  headers: {
    Authorization: `Bearer ${token}`
  }
  })
    .then((res) =>{
      console.log(res.data)
      setUser(res.data)
    })
  },[])






  return (
    <div className="p-4 md:p-10 flex flex-col items-center gap-15 md:gap-30">
      {/* hero section with carousel */}
      <div className="flex flex-col lg:flex-row justify-between mt-[4rem]">
        <div className="flex flex-col gap-20">
          {/* first text */}
          <p className="text-primary text-3xl md:text-5xl font-bold">
            Shop Any where Any Time
          </p>

          <div className="flex flex-col gap-25">
            {/* second text section and small cards */}
            <div className="flex flex-col items-center md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-2xl md:text-4xl">
                  Back To School Promo <br />
                  <span className="text-2xl md:text-4xl text-secondary">
                    15% Discount
                  </span>
                </p>
              </div>

              <div>
                <Herobutton
                  title={"Shop Now"}
                  className="bg-primary text-white py-2 px-5 rounded-lg cursor-pointer mt-4 md:mt-0"
                />
              </div>
            </div>

            {/* small cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {/* card1 */}
              <div className="bg-white shadow-lg flex rounded-lg">
                <div>
                  <img
                    src={images.watches}
                    alt=""
                    className="w-20 h-20 rounded-l-lg"
                  />
                </div>
                <div className="p-2">
                  <p className="p-2">Gadjet</p>
                  <Link
                    to="/market"
                    className="text-primary p-2 text-sm"
                  >
                    see catalogue
                  </Link>
                </div>
              </div>

              {/* card2 */}
              <div className="bg-white shadow-lg flex rounded-lg">
                <div>
                  <img src={images.shoes} alt="" className="w-20 h-20 rounded-l-lg" />
                </div>
                <div className="p-2">
                  <p className="p-2">shoes</p>
                  <Link
                    to="/market"
                    className="text-primary p-2 text-sm"
                  >
                    see catalogue
                  </Link>
                </div>
              </div>

              {/* card3 */}
              <div className="bg-white shadow-lg flex rounded-lg">
                <div>
                  <img
                    src={images.stanleycup}
                    alt=""
                    className="w-20 h-20 rounded-l-lg"
                  />
                </div>
                <div className="p-2">
                  <p className="p-2">Furniture</p>
                  <Link
                    to="/market"
                    className="text-primary p-2 text-sm"
                  >
                    see catalogue
                  </Link>
                </div>
              </div>

              {/* card4 */}
              <div className="bg-white shadow-lg flex rounded-lg">
                <div>
                  <img
                    src={images.pullover}
                    alt=""
                    className="w-20 h-20 rounded-l-lg"
                  />
                </div>
                <div className="p-2">
                  <p className="p-2">Cloths</p>
                  <Link
                    to="/market"
                    className="text-primary p-2 text-sm"
                  >
                    see catalogue
                  </Link>
                </div>
              </div>

              {/* card5 */}
              <div className="bg-white shadow-lg flex rounded-lg">
                <div>
                  <img src={images.watch} alt="" className="w-20 h-20 rounded-l-lg" />
                </div>
                <div className="p-2">
                  <p className="p-2">Jewelries</p>
                  <Link
                    to="/market"
                    className="text-primary p-2 text-sm"
                  >
                    see catalogue
                  </Link>
                </div>
              </div>

              {/* card6 */}
              <div className="bg-white shadow-lg flex rounded-lg">
                <div>
                  <img
                    src={images.cosmetics}
                    alt=""
                    className="w-20 h-20 rounded-l-lg"
                  />
                </div>
                <div className="p-2">
                  <p className="p-2">Cosmetics</p>
                  <Link
                    to="/market"
                    className="text-primary p-2 text-sm"
                  >
                    see catalogue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* carousel */}
        <div className="mt-8 lg:mt-0 lg:basis-[40%] w-full">
          <Carousel />
        </div>
      </div>

      {/* card container */}

       <div className="grid grid-cols-1 items-center md:grid-cols-4 sm:grid-cols-2 gap-15 justify-center overflow-hidden">


        {/* first cart */}
        {
          products.map((product) => (
            <div className="p-2 bg-tertiary rounded-lg max-w-80 h-110 flex flex-col gap-3">
          {/* card image */}
          <div className="rounded-lg overflow-hidden">
            <img src={`http://127.0.0.1:8000/${product.image}`} alt="" className="w-full h-70 object-cover"/>
          </div>
          {/* first text */}

          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">{product.title}</p>
            </div>
            <div>
              <p className="text-primary">{product.price}  <span className="pl-1">XAF</span></p>
            </div>
          </div>

          {/* card description */}

          <div>
            <p className="text-sm">{product.description}</p>
          </div>

          <div className="flex justify-between">
            <Rating rating={0} />
            {/* category of item */}
            <p className="bg-secondary/50 text-black rounded-sm min-w-20 justify-center items-center flex text-sm text-white">{product.category}</p>
          </div>

          {/* card buttons */}
          <div className="flex justify-between">
            {/* add to card button */}

            <Addtocardbutton
              title="Add to Cart"
              className="bg-white text-primary px-5 py-2 cursor-pointer"
              onClick={() =>{
                if(!user?.id){
                  console.log("No users Loged in")
                }
                else{
                  console.log("User ID:", user?.id, "Product ID:", product.id);
                  addToCart(user.id, product.id)                 
                }
              }}
              
            />
            {/* But now button */}
            <Buynowbutton 
              title="Buy now"
              className="bg-secondary text-white px-5 py-2 cursor-pointer"
            />
          </div>
        </div>
          ))
        }
      </div>


{/* rounded image section */}
      <div>
        {/* big text */}
        <p className="justify-center items-center flex text-xl md:text-5xl font-bold text-black">Why Choose Us</p>

      </div>

      {/* rounded images with text */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-5 md:gap-10 ">
        {/* text */}
        <div className="flex flex-col gap-5 mt-10 lg:mt-50 text-center lg:text-left">
          <p className="text-lg sm:text-5xl text-primary font-bold">Mola We Got you Covered</p>
          <p className="text-xl sm:text-4xl text-black font-bold">Active 24/7 pour le <span>Continent</span></p>
          <p className="text-lg sm:text-5xl text-primary font-bold">237 4 Life</p>

        </div>

     {/* rounded images */}
        <div className="flex flex-col sm:flex-row lg:flex-row gap-5 items-center lg:items-start">
          <div className="w-40 sm:w-50 h-40 sm:h-150 overflow-hidden">
            <img src={images.mola1} alt=""  className="w-full h-full rounded-t-full rounded-b-full object-cover"/>
          </div>

          <div className="w-40 sm:w-50 h-40 sm:h-100 overflow-hidden mt-5 sm:mt-20">
            <img src={images.mola2} alt="" className="w-full h-full rounded-t-full rounded-b-full object-cover" />
          </div>

          <div className="w-40 sm:w-50 h-40 sm:h-150 overflow-hidden">
            <img src={images.mola3} alt="" className="w-full h-full rounded-t-full rounded-b-full object-cover"/>
          </div>


        </div>


      </div>

{/* icon card */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
    
    {/* first card */}
    <div className="bg-white p-6 w-full max-w-xs shadow-lg rounded-xl hover:bg-primary hover:text-white transition-colors duration-300 group">
      <div className="flex flex-col items-center gap-2 text-center">
        <img 
          src={images.icon1orange} 
          alt="Quick delivery" 
          className="mb-2 group-hover:filter group-hover:brightness-0 group-hover:invert transition duration-300 w-12 h-12" 
        />
        <p className="text-sm text-primary font-bold group-hover:text-white transition duration-300">
          Quick delivery
        </p>
      </div>
    </div>

    {/* second card */}
    <div className="bg-white p-6 w-full max-w-xs shadow-lg rounded-xl hover:bg-primary hover:text-white transition-colors duration-300 group">
      <div className="flex flex-col items-center gap-2 text-center">
        <img 
          src={images.icon2orange} 
          alt="Best Quality" 
          className="mb-2 group-hover:filter group-hover:brightness-0 group-hover:invert transition duration-300 w-12 h-12" 
        />
        <p className="text-sm text-primary font-bold group-hover:text-white transition duration-300">
          Best Quality
        </p>
      </div>
    </div>

    {/* third card */}
    <div className="bg-white p-6 w-full max-w-xs shadow-lg rounded-xl hover:bg-primary hover:text-white transition-colors duration-300 group">
      <div className="flex flex-col items-center gap-2 text-center">
        <img 
          src={images.icon3orange} 
          alt="Affordable Prices" 
          className="mb-2 group-hover:filter group-hover:brightness-0 group-hover:invert transition duration-300 w-12 h-12" 
        />
        <p className="text-sm text-primary font-bold group-hover:text-white transition duration-300">
          Affordable Prices
        </p>
      </div>
    </div>

    {/* fourth card */}
    <div className="bg-white p-6 w-full max-w-xs shadow-lg rounded-xl hover:bg-primary hover:text-white transition-colors duration-300 group">
      <div className="flex flex-col items-center gap-2 text-center">
        <img 
          src={images.icon4orange} 
          alt="Customer Support" 
          className="mb-2 group-hover:filter group-hover:brightness-0 group-hover:invert transition duration-300 w-12 h-12" 
        />
        <p className="text-sm text-primary font-bold group-hover:text-white transition duration-300">
          Customer Support
        </p>
      </div>
    </div>

  </div>
   
</div>

<div className="flex flex-col text-center">
      <p className=" leading-relaxed">
    <span className="text-3xl font-bold">At</span> <span className="text-primary font-semibold text-3xl">MboaKako</span><br /> <span className="text-4xl font-bold">we believe shopping should be 
    <span className="text-primary"> simple</span></span><br /> <span className="text-4xl font-bold">affordable, and stress-free.<br /></span>That’s why we bring you fresh 
    produts,<br /> quick deliveries, and unbeatable prices.  
  </p>
    </div>


    {/* redirection to the market */}
    <div className="relative w-full h-14 bg-secondary flex flex-col justify-center items-center rounded-full">
      <Link to={"/market"}className="text-white font-bold">Go To Market place</Link>

      <img src={images.chevron} alt="" className="absolute right-5 buttom-5 w-15" />

    </div>

   
    

    </div>
  );
};

export default Home;
