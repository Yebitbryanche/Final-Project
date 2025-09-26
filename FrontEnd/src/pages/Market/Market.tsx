
import Categorybutton from "../../components/Categorybutton";
import Filterbutton from "../../components/Filterbutton";
import Rating from "../../components/Ratingstar";
import Addtocardbutton from "../../components/Addtocardbutton";
import Buynowbutton from "../../components/Buynowbutton";
import { useEffect, useState } from "react";
import { api } from "../../API/Registration";
import type {UserProps} from "../../types/UserRead";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useCart } from "../../Context/Context";

interface ProductProps {
  average_rating: number;
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
  const token = localStorage.getItem("token");
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProps>();
  const [ratings, setRatings] = useState<Record<number, number>>({}); 
  const { cart, addToCart } = useCart()

  // Fetch all products
useEffect(() => {
  setLoading(true);
  api
    .get(`/products`)
    .then((response) => {
      const productsWithDiscount = response.data.map((product: ProductProps) => {
        const discount = 20;
        const newPrice = product.price - (product.price * discount) / 100;
        return {
          ...product,
          oldprice: product.price,
          newprice: newPrice,
          discountrate: discount,
          rating: product.average_rating || 0, // ✅ Already included
        };
      });
      console.log(response.data)
      setAllProducts(productsWithDiscount);
      setFilteredProducts(productsWithDiscount);
       productsWithDiscount.forEach((product: ProductProps) => {
          api
            .get(`/products/${product.id}`)
            .then((res) => {
              console.log(cart)
              setRatings((prev) => ({
                ...prev,
                [product.id]: res.data.average_rating || 0,
              }));
            })
            .catch(() => console.log(`Failed to load rating for product ${product.id}`));
        });
    })
    .catch((error: any) => setError(error.message))
    .finally(() => setLoading(false));
}, []);

  // Fetch logged-in user
  useEffect(() => {
    if (!token) return;

    api
      .get("/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch(() => setError("Failed to fetch user"));
  }, [token]);

  const handleFilter = (category: string) => {
    if (category === "All") setFilteredProducts(allProducts);
    else
      setFilteredProducts(
        allProducts.filter((item) => item.category.toLowerCase() === category.toLowerCase())
      );
  };

  const handlePricefilter = (price: number) => {
    setFilteredProducts(allProducts.filter((item) => item.price <= price));
  };

  if (loading) {
    return (
     <Loader/>
    );
  }

  return (
    <div className="p-4 md:p-10 flex flex-col gap-10">
      {error?
      <p className="absolute w-100 bottom-5 items-center rounded-sm text-white flex justify-between left-1 p-4 bg-red-500">error</p>:
      null}
      
     {/* Categories */}
<div className="flex flex-col md:flex-row gap-4 md:gap-5 justify-center items-start md:items-center mt-[4rem]">
  <p className="text-2xl font-bold text-primary">Categories:</p>
  <div className="relative w-full overflow-x-auto">
    <div className="flex gap-2 animate-scroll whitespace-nowrap">
      {["All", "perfume", "Flip", "bodywash", "Backpacks", "Jewelries", "Shoes","Topwear","Bags","Belts","Headwear","Innerwear","bottomwear","Wallets","Fragrance","Nails","Eyewear","Ties"].map(
        (cat) => (
          <Categorybutton
            key={cat}
            title={cat}
            className="bg-tertiary px-4 py-2 shadow-lg hover:bg-primary hover:text-white transition-colors duration-300 group cursor-pointer font-bold flex-shrink-0"
            onClick={() => handleFilter(cat)}
          />
        )
      )}
      {/* Duplicate for seamless loop */}
      {["All", "perfume", "Flip", "bodywash", "Backpacks", "Jewelries", "Shoes","Topwear","Bags","Belts","Headwear","Innerwear","bottomwear","Wallets","Fragrance","Nails","Eyewear","Ties"].map(
        (cat) => (
          <Categorybutton
            key={cat + "-duplicate"}
            title={cat}
            className="bg-tertiary px-4 py-2 shadow-lg hover:bg-primary hover:text-white transition-colors duration-300 group cursor-pointer font-bold flex-shrink-0"
            onClick={() => handleFilter(cat)}
          />
        )
      )}
    </div>
  </div>
</div>



      {/* Recommended Products */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-2xl md:text-3xl font-bold text-secondary">Recommended for you</p>
          <div className="relative">
            <Filterbutton title=" " className="bg-transparent text-gray-400 px-4 py-2 shadow-lg pr-8" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="relative w-full md:w-40">
                <input
                  type="number"
                  className="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 text-sm md:text-base"
                  placeholder="Max Price"
                  onChange={(e) => handlePricefilter(parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-2 bg-tertiary rounded-lg flex flex-col gap-3">
              <Link to={`/product/${product.id}`}>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/images/${product.image}`}
                    alt={product.title}
                    className="w-full h-60 object-cover"
                  />
                </div>
              </Link>
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg truncate">{product.title}</p>
                <p className="text-primary">{product.price} XAF</p>
              </div>
              <p className="text-sm line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <Rating rating={ratings[product.id] || 0} />
                <p className="bg-secondary/50 text-black rounded-lg px-2 py-1 text-xs">
                  {product.category}
                </p>
              </div>
              <div className="flex justify-between gap-2 mt-2">
                <Addtocardbutton
                  onClick={() => {
                    if (!user?.id) {
                      console.log("No user logged in");
                    } else {
                      addToCart(user.id, product.id);
                    }
                  }}
                  title="Add to Cart"
                  className="bg-white text-primary px-3 py-2 flex-1 text-sm"
                />
                <Buynowbutton
                  title="Buy now"
                  className="bg-secondary text-white px-3 py-2 flex-1 text-sm"
                  onClick={() => {
                    if (!user?.id) console.log("No user logged in");
                    else addToCart(user.id, product.id);
                  }
                    
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-2xl md:text-3xl font-bold text-secondary">Popular Products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-2 bg-tertiary rounded-lg flex flex-col gap-3">
              <Link to={`/product/${product.id}`}>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/images/${product.image}`}
                    alt={product.title}
                    className="w-full h-60 object-cover"
                  />
                </div>
              </Link>
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg truncate">{product.title}</p>
                <p className="text-primary">{product.price} XAF</p>
              </div>
              <p className="text-sm line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <Rating rating={ratings[product.id] || 0} />
                <p className="bg-secondary/50 text-black rounded-lg px-2 py-1 text-xs">
                  {product.category}
                </p>
              </div>
              <div className="flex justify-between gap-2 mt-2">
                <Addtocardbutton
                  onClick={() => {
                    if (!user?.id) console.log("No user logged in");
                    else addToCart(user.id, product.id);
                  }}
                  title="Add to Cart"
                  className="bg-white text-primary px-3 py-2 flex-1 text-sm"
                />
                <Buynowbutton
                  title="Buy now"
                  className="bg-secondary text-white px-3 py-2 flex-1 text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Market;
