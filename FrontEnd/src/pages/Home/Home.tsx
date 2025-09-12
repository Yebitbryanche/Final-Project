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
    <div className="p-4 sm:p-6 md:p-10 flex flex-col items-center gap-12 md:gap-20 ">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 w-full pt-[4rem]">
        {/* Left Text Section */}
        <div className="flex flex-col gap-10 w-full lg:w-3/5">
          <p className="text-primary text-2xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left">
            Shop Anywhere, Anytime
          </p>

          {/* Promo Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center md:flex-row justify-between gap-6">
              <p className="text-xl sm:text-2xl md:text-4xl text-center md:text-left">
                Back To School Promo <br />
                <span className="text-secondary">15% Discount</span>
              </p>
              <Herobutton
                title="Shop Now"
                className="bg-primary text-white py-2 px-5 rounded-lg cursor-pointer"
              />
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
          <div
            key={product.id}
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
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center">
        <p className="text-xl sm:text-3xl md:text-5xl font-bold text-black">
          Why Choose Us
        </p>
      </div>

      {/* Rounded Images Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 w-full">
        {/* Text */}
        <div className="flex flex-col gap-4 text-center lg:text-left">
          <p className="text-lg sm:text-3xl md:text-5xl text-primary font-bold">
            Mola We Got You Covered
          </p>
          <p className="text-xl sm:text-3xl md:text-4xl font-bold">
            Active 24/7 <span className="text-secondary">pour le Continent</span>
          </p>
          <p className="text-lg sm:text-3xl md:text-5xl text-primary font-bold">
            237 4 Life
          </p>
        </div>

        {/* Rounded Images */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          {[images.mola1, images.mola2, images.mola3].map((img, idx) => (
            <div
              key={idx}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden"
            >
              <img
                src={img}
                alt="Mola"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Icon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {[
          { img: images.icon1orange, label: "Quick Delivery" },
          { img: images.icon2orange, label: "Best Quality" },
          { img: images.icon3orange, label: "Affordable Prices" },
          { img: images.icon4orange, label: "Customer Support" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 shadow-lg rounded-xl flex flex-col items-center text-center hover:bg-primary hover:text-white transition"
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-12 h-12 mb-2 transition group-hover:brightness-0 group-hover:invert"
            />
            <p className="text-sm font-bold text-primary group-hover:text-white">
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
