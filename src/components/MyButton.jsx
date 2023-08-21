import React from "react";

export default function MyButton({ type, children, className, onClick }) {
  return (
    <div className="flex">
        <div onClick={onClick} className={`flex items-center justify-center p-2 rounded-md border cursor-pointer
          ${type === 'secondary' ? "border-green-400 bg-green-200 hover:bg-green-400" :
          type === 'danger' ? "border-red-400 bg-red-200 hover:bg-red-400" :
          type === 'gray' ? "border-gray-400 bg-gray-200 hover:bg-gray-400" :
          "border-green-400 bg-green-400 hover:bg-green-200"}
          ${className}
      `}>
        {children}
      </div>
    </div>
  );
}