import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type RatingProps = {
  rating: number;                 // current rating value
  totalStars?: number;            // default 5
  editable?: boolean;             // can the user change it?
  onChange?: (value: number) => void; // callback when a star is clicked
};

const Rating: React.FC<RatingProps> = ({ rating, totalStars = 5, editable = false, onChange }) => {
  const [hovered, setHovered] = useState<number>(0);

  const handleClick = (value: number) => {
    if (editable && onChange) onChange(value);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, idx) => {
        const starValue = idx + 1;
        return starValue <= (hovered || rating) ? (
          <AiFillStar
            key={idx}
            className={`text-yellow-500 text-xl ${editable ? "cursor-pointer" : ""}`}
            onMouseEnter={() => editable && setHovered(starValue)}
            onMouseLeave={() => editable && setHovered(0)}
            onClick={() => handleClick(starValue)}
          />
        ) : (
          <AiOutlineStar
            key={idx}
            className={`text-yellow-500 text-xl ${editable ? "cursor-pointer" : ""}`}
            onMouseEnter={() => editable && setHovered(starValue)}
            onMouseLeave={() => editable && setHovered(0)}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
};

export default Rating;
