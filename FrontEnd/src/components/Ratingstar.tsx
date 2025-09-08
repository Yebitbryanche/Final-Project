import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type RatingProps = {
   rating: number;      // current rating value
  totalStars?: number; // default is 5
};

const Rating: React.FC<RatingProps> = ({ rating, totalStars = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, idx) => (
        idx < rating ? (
          <AiFillStar key={idx} className="text-yellow-500 text-xl" />
        ) : (
          <AiOutlineStar key={idx} className="text-yellow-500 text-xl" />
        )
      ))}
    </div>
  );
};

export default Rating;
