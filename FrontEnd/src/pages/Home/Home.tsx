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
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<UserProps>();
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.slice(0, 4));
      })
      .catch((error: any) => console.log(error.message));
  }, []);

  useEffect(() => {
    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  }, []);

  return (
    <div className="p-4 md:p-10 flex flex-col items-center gap-15 md:gap-30">
      {/* hero section with carousel */}
      <div className="flex flex-col lg:flex-row justify-between mt-[4rem]">
        <div className="flex flex-col gap-20">
          {/* first text */}
          <p className="text-primary text-3xl md:text-5xl font-bold">
            Shop Any where Any Time
          </p>

          {/* Promo Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center md:flex-row justify-between gap-6">
              <p className="text-xl sm:text-2xl md:text-4xl text-center md:text-left">
                Back To School Promo <br />
                <span className="text-secondary">15% Discount</span>
              </p>
              <Link to={'/market'}>
                <Herobutton
                title="Shop Now"
                className="bg-secondary text-white py-2 px-5 rounded-lg cursor-pointer"
              />            
              </Link>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { img: images.watches, name: "Gadgets" },
                { img: images.shoes, name: "Shoes" },
                { img: images.stanleycup, name: "Furniture" },
                { img: images.pullover, name: "Clothes" },
                { img: images.watch, name: "Jewelries" },
                { img: images.cosmetics, name: "Cosmetics" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-lg flex items-center rounded-lg w-full"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-l-lg object-cover"
                  />
                  <div className="p-2 flex flex-col">
                    <p className="font-medium">{item.name}</p>
                    <Link
                      to="/market"
                      className="text-primary text-sm hover:underline"
                    >
                      See catalogue
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full lg:w-2/5">
          <Carousel />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}> 
            <div
              className="p-4 bg-tertiary rounded-lg flex flex-col gap-3 shadow-md"
            >
            
              <div className="rounded-lg overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/${product.image}`}
                  alt={product.title}
                  className="w-full h-52 object-cover"
                />
              </div>

              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">{product.title}</p>
                <p className="text-primary">
                  {product.price} <span className="pl-1">XAF</span>
                </p>
              </div>

              <p className="text-sm line-clamp-2">{product.description}</p>

              <div className="flex justify-between items-center">
                <Rating rating={0} />
                <p className="bg-secondary text-white px-2 py-1 rounded-sm text-xs">
                  {product.category}
                </p>
              </div>

              <div className="flex justify-between gap-2">
                <Addtocardbutton
                  title="Add to Cart"
                  className="bg-white text-primary px-4 py-2 cursor-pointer rounded"
                  onClick={() => {
                    if (!user?.id) {
                      console.log("No user logged in");
                    } else {
                      addToCart(user.id, product.id);
                    }
                  }}
                />
                <Buynowbutton
                  title="Buy now"
                  className="bg-secondary text-white px-4 py-2 cursor-pointer rounded"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
{/* rounded image section */} <div> {/* big text */} <p className="justify-center items-center flex text-xl md:text-5xl font-bold text-black">Why Choose Us</p> </div> {/* rounded images with text */} <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-5 md:gap-10 "> {/* text */} <div className="flex flex-col gap-5 mt-10 lg:mt-50 text-center lg:text-left"> <p className="text-lg sm:text-5xl text-primary font-bold">Mola We Got you Covered</p> <p className="text-xl sm:text-4xl text-black font-bold">Active 24/7 pour le <span>Continent</span></p> <p className="text-lg sm:text-5xl text-primary font-bold">237 4 Life</p> </div> {/* rounded images */} <div className="flex flex-col sm:flex-row lg:flex-row gap-5 items-center lg:items-start"> <div className="w-40 sm:w-50 h-40 sm:h-150 overflow-hidden"> <img src={images.mola1} alt="" className="w-full h-full rounded-t-full rounded-b-full object-cover"/> </div> <div className="w-40 sm:w-50 h-40 sm:h-100 overflow-hidden mt-5 sm:mt-20"> <img src={images.mola2} alt="" className="w-full h-full rounded-t-full rounded-b-full object-cover" /> </div> <div className="w-40 sm:w-50 h-40 sm:h-150 overflow-hidden"> <img src={images.mola3} alt="" className="w-full h-full rounded-t-full rounded-b-full object-cover"/> </div> </div> </div>
      {/* Icon Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
  {[
    {
      imgDefault: images.icon1orange,
      imgHover: images.icon1white,
      label: "Quick Delivery",
    },
    {
      imgDefault: images.icon2orange,
      imgHover: images.icon2white,
      label: "Best Quality",
    },
    {
      imgDefault: images.icon3orange,
      imgHover: images.icon3white,
      label: "Affordable Prices",
    },
    {
      imgDefault: images.icon4orange,
      imgHover: images.icon4white,
      label: "Customer Support",
    },
  ].map((item, idx) => (
    <div
      key={idx}
      className="group bg-white p-6 shadow-lg rounded-xl flex flex-col items-center text-center 
                 hover:bg-primary hover:text-white transition duration-300 cursor-pointer"
    >
      {/* swap icon on hover */}
      <img
        src={item.imgDefault}
        alt={item.label}
        className="w-12 h-12 mb-2 block group-hover:hidden"
      />
      <img
        src={item.imgHover}
        alt={item.label}
        className="w-12 h-12 mb-2 hidden group-hover:block"
      />

      {/* text */}
      <p className="text-sm font-bold text-primary group-hover:text-white transition">
        {item.label}
      </p>
    </div>
  ))}
</div>


      {/* Description */}
      <div className="text-center max-w-3xl">
        <p className="leading-relaxed text-lg sm:text-xl">
          <span className="text-3xl font-bold">At</span>{" "}
          <span className="text-primary font-semibold text-3xl">MboaKako</span>
          <br />
          <span className="text-2xl sm:text-3xl font-bold">
            we believe shopping should be{" "}
            <span className="text-primary">simple</span>, affordable, and
            stress-free.
          </span>
          <br />
          That’s why we bring you fresh products, quick deliveries, and
          unbeatable prices.
        </p>
      </div>

      {/* Redirect to Market */}
      <div className="relative w-full max-w-2xl h-14 bg-secondary flex items-center justify-center rounded-full">
        <Link to="/market" className="text-white font-bold text-lg">
          Go To Marketplace
        </Link>
        <img
          src={images.chevron}
          alt=""
          className="absolute right-5 w-6 h-6"
        />
      </div>
    </div>
  );
};

export default Home;
