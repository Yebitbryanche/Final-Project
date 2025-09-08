import React from "react";

type HerobuttonProps = {
  title: string;
  className?: string;
  onClick?: () => void;
};



const Addtocardbutton: React.FC<HerobuttonProps> = ({ title, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-5 rounded-lg font-semibold cursor-pointer ${className}`}
    >
      {title}
    </button>
  );
};

export default Addtocardbutton;
