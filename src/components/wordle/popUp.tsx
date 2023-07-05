import React, { useEffect } from "react";

interface PopUpProps {
  message: string;
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
}

const PopUp: React.FC<PopUpProps> = ({ message, visibility, setVisibility }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(false);
    }, 2000); // Change duration if needed
    return () => clearTimeout(timer);
  }, [visibility, setVisibility]);

  return (
    <div 
    className={`fixed top-16 z-50 m-6 py-4 px-5 rounded bg-rblack border-2 border-pink rounded-xl text-white transition-opacity duration-300 ease-in-out ${visibility ? "bg-green-500 opacity-100" : "opacity-0"}`}
    >
      {message}
    </div>
  );
};

export default PopUp;
