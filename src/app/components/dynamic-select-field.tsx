
import { TypeOfDropDown } from "@/types";
import React, { useEffect, useState } from "react";

type typeOfPageProps = {
  value: string | number;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label: boolean;
  labelText?: string;
  required?: boolean;
  inputName: string;
  placeholder?: string;
  dropdown: TypeOfDropDown[];
};

const SelectField: React.FC<typeOfPageProps> = ({
 
  value,
  handleChange,
  label,
  labelText,

  inputName,
  placeholder,

  dropdown,

}) => {



  console.log(value, "sdlnfhfhf");
  return (
    <div className="flex flex-col">
      {label && (
        <label
          className={`"text-black"
            text-[14px] font-medium line-height-[21.95px] `}
          htmlFor={inputName}
        >
          {labelText} 
        </label>
      )}

      <select
        className={`mt-2 border outline-none  "border-gray-300"
         rounded-md text-sm px-4 py-2 max-w-full max-h-[36px]  font-semibold bg-primaryColor text-secondaryColor `}
        value={value}
        name={inputName}
        onChange={handleChange}
      >
        <option value="" disabled className="text-gray-500">
          {placeholder}
        </option>

        {dropdown?.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>


      
    </div>
  );
};

export default SelectField;
