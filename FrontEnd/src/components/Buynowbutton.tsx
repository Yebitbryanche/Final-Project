import React from "react";

type HerobuttonProps = {
  title: string;
  className?: string;
  onClick?: () => void;
};



const Buynowbutton: React.FC<HerobuttonProps> = ({ title, className, onClick }) => {
  return (
  <button
    onClick={onClick}
    className={`py-2 px-5 rounded-lg font-semibold transition-colors duration-200 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {title}
  </button>

  );
};

export default Buynowbutton;
