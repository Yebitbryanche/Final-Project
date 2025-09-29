import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../API/Registration";
import type {UserProps} from "../../types/UserRead";
import Rating from "../../components/Ratingstar";
import type { Review } from "../../types/review";

function ReviewPage() {
  const { id } = useParams<{ id: string }>(); // product id
  const [user, setUser] = useState<UserProps | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [users, setUsers] = useState<UserProps[]>([])
  const [reviews, setReviews] =useState<Review[]>([])

  const token = localStorage.getItem("token");

  // fetch logged-in user automatically
  useEffect(() => {
    if (!token) return;

    api
      .get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setError("You must be logged in to leave a review."));
  }, [token]);

  // fetch reviews

useEffect(() => {
  api.get("/product/reviews")
    .then((res) => {
      console.log("API response:", res.data);

      setReviews(res.data.reviews || []);
      setUsers(res.data.users || []);
    })
    .catch((err) => console.error("Failed to fetch reviews:", err));
}, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      setError("You must be logged in to leave a review.");
      return;
    }

    try {
      const response = await api.post(`/products/${id}/review/${user.id}`, {
          user_id:user.id,
          product_id: id,
          rating,
          comment,
      });
      console.log(response.data);
      setSuccess("Review submitted successfully!");
      setError("");
      setRating(0);
      setComment("");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to submit review");
    }
  };

  return (
    <div className="p-3">
      <div className="max-w-3xl mx-auto p-6 mt-[8rem] mb-[2rem] bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-secondary">
          Leave a Review
        </h1>

        {error && <div className="absolute w-[80%] p-5 bg-red-500 bottom-15 left-1"><p className="text-white mb-3">{error}</p></div>}
        {success && <div className="absolute w-[80%] p-5 bg-green-500 bottom-15 left-1"><p className="text-white mb-3">{success}</p></div> }

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Rating:</label>
            <Rating
              rating={rating}
              onChange={(value) => setRating(value)}
              editable={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-secondary rounded-lg p-2 h-28 resize-none focus:outline-primary focus:ring-1 focus:ring-primary"
              placeholder="Write your review..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-5 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
      <div className="flex overflow-x-auto space-x-4 p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {reviews.map((rev) => {
        const reviewer = users.find((u) => u.id === rev.user_id);

        return (
          <div
            key={rev.id}
            className="flex-shrink-0 w-80 p-4 bg-white rounded-lg shadow-md"
          >
            <Rating rating={rev.rating} editable={false} />
            <p className="text-gray-700 mt-2 line-clamp-3">{rev.comment}</p>
            <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
              <span>By {reviewer ? reviewer.user_name : "Anonymous"}</span>
              <span>{new Date(rev.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
    </div>

    </div>
  );
}

export default ReviewPage;
