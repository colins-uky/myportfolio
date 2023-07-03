import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
}

const PopUp: React.FC<ToastProps> = ({ message, visibility, setVisibility }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(false);
    }, 2000); // Change duration if needed
    return () => clearTimeout(timer);
  }, [visibility, setVisibility]);

  return (
    <div 
      className={`fixed bottom-0 right-0 m-6 py-2 px-3 rounded text-white ${visibility ? "bg-green-500 transition-opacity duration-300 ease-in opacity-100" : "opacity-0"}`}
    >
      {message}
    </div>
  );
};

export default PopUp;
