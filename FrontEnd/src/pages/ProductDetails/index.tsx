import { useEffect, useState } from "react";
import type ProductProps from "../../types/products";
import { useParams } from "react-router-dom";
import { api } from "../../API/Registration";
import { type RatingProps } from "../../types/productRatings";
import Rating from "../../components/Ratingstar";
import Addtocardbutton from "../../components/Addtocardbutton";
import { useNavigate } from "react-router-dom";

function PrroductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [error, setError] = useState("");
  const [ratings, setRatings] = useState<RatingProps | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Failed to load Product details"));
  }, [id]);

  useEffect(() => {
    if (!product?.id) return;

    api
      .get(`/products/${product.id}`)
      .then((res) => {
        setRatings(res.data);
        console.log(res.data);
      })
      .catch(() => setError("Failed to load ratings"));
  }, [product?.id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="mt-20 px-4 sm:px-8 lg:px-16 py-[2rem]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-center md:gap-x-12 gap-y-8">
        
        {/* Left: Product Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 lg:w-2/5">
          <img
            src={`http://127.0.0.1:8000/images/${product.image}`}
            alt={product.title}
            className="w-full max-h-[500px] rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 flex flex-col gap-y-5 bg-tertiary rounded-lg px-6 py-5 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-semibold text-secondary">{product.title}</h1>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex justify-between items-center">
            <p className="text-sm md:text-base text-gray-500">{product.category}</p>
            <p className="text-xl md:text-2xl font-bold text-secondary">
              {product.price} XAF
            </p>
          </div>

          <div>
            <Rating rating={ratings?.average_rating ?? 0} />
            <p className="text-sm text-gray-500">
              {ratings?.review_count ?? 0} reviews
            </p>
          </div>

          <Addtocardbutton
          onClick={() => {navigate(`/products/${id}/review`)}}
            className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition cursor-pointer w-full sm:w-auto"
            title="Leave a Review"
          />
        </div>
      </div>
    </div>
  );
}

export default PrroductDetails;
