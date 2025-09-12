import React from "react";

type HerobuttonProps = {
  title: string;
  className?: string;
  onClick?: () => void;
};



const Filterbutton: React.FC<HerobuttonProps> = ({ title, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-5 rounded-lg font-semibold ${className}`}
    >
      {title}
    </button>
  );
};

export default Filterbutton;

