import React from "react";

type typeOfPageProps = {
  error: boolean;
  value: string | number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: boolean;
  labelText?: string;
  required?: boolean;
  inputName: string;
  placeholder?: string;
  errorText?: string;
  type: string;
}



  const InputField: React.FC<typeOfPageProps> = ({error, value, handleChange, label, labelText, required, inputName, placeholder, errorText, type}) => {


  return (
    <div className="flex flex-col">
      {label && <label
        className={`${
         (error || errorText) ? "text-red-500 " : "text-black"
        }  text-[14px] font-medium line-height-[21.95px] `}
        htmlFor={inputName}
      >
        {labelText} {required && <span className="text-red-500">*</span>}
      </label>}

      <div className="mt-1 w-full h-[36px] relative">

      <input
        type={type}
        id={inputName}
        name={inputName}
        value={value}
        onChange={handleChange}
        className={`border outline-none ${
         (error || errorText) ? "border-red-500" : "border-gray-300"
        } rounded-md text-sm px-4 ${inputName==="contactNumber" ? "pl-10" : "pl-4"} py-2 w-full h-full  font-normal`}
        placeholder={placeholder}
      />

      </div>

      <div className="text-red-500 text-[12px] h-[10px]">{errorText}</div>

      

    </div>
  );
};

export default InputField;
