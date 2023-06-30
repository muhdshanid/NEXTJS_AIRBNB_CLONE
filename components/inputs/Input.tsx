"use client";

import { InputProps } from "@/types/types";
import { BiDollar } from "react-icons/bi";

const Input = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}: InputProps) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        type={type}
        className={`peer w-full  p-2 font-light bg-white border-2 rounded-md outline-none
        transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        {...register(id, { required })}
        placeholder={label}
        disabled={disabled}
        id={id}
      />
    </div>
  );
};

export default Input;
