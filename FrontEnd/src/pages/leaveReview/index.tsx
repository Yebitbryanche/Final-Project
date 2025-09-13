import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../API/Registration";
import type UserProps from "../../types/UserRead";
import Rating from "../../components/Ratingstar";

function ReviewPage() {
  const { id } = useParams<{ id: string }>(); // product id
  const [user, setUser] = useState<UserProps | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const token = localStorage.getItem("token");

  // fetch logged-in user automatically
  useEffect(() => {
    if (!token) return;

    api
      .get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setError("Failed to fetch user"));
  }, [token]);

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
    <div className="max-w-3xl mx-auto p-6 mt-[8rem] mb-[2rem] bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-secondary">
        Leave a Review
      </h1>

      {error && <div className="absolute w-[80%] p-5 bg-red-500 bottom-15 left-1"><p className="text-white mb-3">{error}</p></div>}
      {success && <div className="absolute w-[80%] p-5 bg-red-500 bottom-15 left-1"><p className="text-white mb-3">{success}</p></div> }

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
  );
}

export default ReviewPage;
