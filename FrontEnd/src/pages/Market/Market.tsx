
import axios from "axios";
import Categorybutton from "../../components/Categorybutton";
import Filterbutton from "../../components/Filterbutton";
import Rating from "../../components/Ratingstar";
import Addtocardbutton from "../../components/Addtocardbutton";
import Buynowbutton from "../../components/Buynowbutton";
import { useEffect, useState } from "react";
import { api } from "../../API/Registration";
import { addToCart } from "../../services/addtoCart";
import type UserProps from "../../types/UserRead";

interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  oldprice?: number;
  newprice?: number;
  discountrate?: number;


}

function Market() {
  const token = localStorage.getItem("token")
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]); 
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]); 
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserProps>()

  useEffect(() => {
    api
      .get(`/products`)
      .then((response) => {
        const productsWithDiscount = response.data.map((product:ProductProps)=> {
          const discount = 20;
          const newPrice = product.price - (product.price *discount)/100;

          return{
            ...product, // copy everything in product
            oldprice:product.price,
            newprice:newPrice,
            discountrate:discount,
          }
        })

        setAllProducts(productsWithDiscount);
        setFilteredProducts(productsWithDiscount); // initialize filtered list
      })
      .catch((error: any) => setError(error.message));
  }, []);

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

  const handleFilter = (category: string) => {
    if (category === "All") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  const handlePricefilter = (price:number) => {
    const filtered = allProducts.filter((item) => item.price <= price)
    setFilteredProducts(filtered)
  }

  return (
    <div className="p-4 md:p-10 flex flex-col gap-10">
      {/* Categories */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 justify-center items-start md:items-center">
        <p className="text-2xl font-bold text-primary">Categories:</p>
        <div className="flex flex-wrap md:flex-nowrap gap-2 overflow-x-auto pb-2 md:pb-0">
          {["All","perfume","Flip","bodywash","Backpacks","Jewelries","Shoes"].map((cat) => (
            <Categorybutton
              key={cat}
              title={cat}
              className="bg-tertiary px-4 py-2 shadow-lg hover:bg-primary hover:text-white transition-colors duration-300 group cursor-pointer font-bold flex-shrink-0"
              onClick={() => handleFilter(cat)}
            />
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="flex justify-between items-center mt-6 mb-2">
        <p className="text-3xl font-bold">Recommended for you</p>
        <div className="relative">
          <Filterbutton title=" " className="bg-transparent text-gray-400 px-4 py-2 shadow-lg pr-8" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
          <input type="number"
          className="w-25 p-1 rounded-xs"
          placeholder="Filter by Price"
          onChange={(e) => handlePricefilter(parseFloat(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto whitespace-nowrap pb-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-2 bg-tertiary rounded-lg w-80 h-110 flex flex-col gap-3 flex-shrink-0"
          >
            <div className="rounded-lg overflow-hidden">
              <img src={`http://127.0.0.1:8000/${product.image}`} alt={product.title} className="w-full h-70 object-cover" />
            </div>
            <div className="flex justify-between">
              <p className="font-bold text-lg">{product.title.slice(0,20)}</p>
              <p className="text-primary">{product.price}XAF</p>
            </div>
            <p className="text-sm">{product.description.slice(0,30)}</p>
            <div className="flex justify-between">
              <Rating rating={product.rating} />
              <p className="bg-secondary/50 text-black rounded-lg w-20 justify-center items-center flex text-sm">{product.category}</p>
            </div>
            <div className="flex justify-between">
              <Addtocardbutton onClick= {()=> {if(!user?.id)
                {
                console.log("No users Loged in")
              }
              else{
                addToCart(user?.id, product.id)
              }
              }} title="Add to Cart" className="bg-white text-primary px-5 py-2" />
              <Buynowbutton title="Buy now" className="bg-secondary text-white px-5 py-2" />
            </div>
          </div>
        ))}
      </div>

      {/* Popular Products */}
      <p className="text-3xl font-bold mt-6 mb-2">Popular products</p>
      <div className="flex gap-6 overflow-x-auto whitespace-nowrap pb-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-2 bg-tertiary rounded-lg w-80 h-110 flex flex-col gap-3 flex-shrink-0"
          >
            <div className="rounded-lg overflow-hidden">
              <img src={`http://127.0.0.1:8000/${product.image}`} alt={product.title} className="w-full h-70 object-cover" />
            </div>
            <div className="flex justify-between">
              <p className="font-bold text-lg">{product.title.slice(0,20)}</p>
              <p className="text-primary">{product.price}XAF</p>
            </div>
            <p className="text-sm">{product.description}</p>
            <div className="flex justify-between">
              <Rating rating={product.rating} />
              <p className="bg-secondary/50 text-black rounded-lg w-20 justify-center items-center flex text-sm">{product.category}</p>
            </div>
            <div className="flex justify-between">
              <Addtocardbutton onClick={()=> {if(!user?.id)
                {
                console.log("No users Loged in")
              }
              else{
                addToCart(user?.id, product.id)
              }
              }} title="Add to Cart" className="bg-white text-primary px-5 py-2" />
              <Buynowbutton title="Buy now" className="bg-secondary text-white px-5 py-2" />
            </div>
          </div>
        ))}
      </div>

      {/* Best Deals */}
      <p className="text-3xl font-bold mt-6 mb-2">Best Deal products</p>
      <div className="flex gap-6 overflow-x-auto whitespace-nowrap pb-4">
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="p-2 bg-tertiary rounded-lg w-80 h-110 flex flex-col gap-3 flex-shrink-0"
          >
            <div className="rounded-lg overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-70 object-cover" />
            </div>
            <div className="flex justify-between">
              <p className="font-bold text-lg">{product.title.slice(0,20)}</p>
              <p className="text-white bg-primary/50 rounded-lg">{product.discountrate}%</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400 line-through">{product.oldprice}XAF</p>
              <p>{product.newprice}XAF</p>
            </div>
            <p className="text-sm">{product.description}</p>
            <div className="flex justify-between">
              <Rating rating={product.rating} />
              <p className="bg-secondary/50 text-black rounded-lg w-20 justify-center items-center flex text-sm">{product.category}</p>
            </div>
            <div className="flex justify-between">
              <Addtocardbutton title="Add to Cart" className="bg-white text-primary px-5 py-2" />
              <Buynowbutton title="Buy now" className="bg-secondary text-white px-5 py-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;
