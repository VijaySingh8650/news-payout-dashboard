"use client";

import React, { useState } from "react";
import InputField from "../components/dynamic-input-field";
import { TypeOfFormData } from "@/types";

const LogInPage = () => {

  const [error, setError] = useState<boolean>(false);
  const [formData, setFormData] = useState<TypeOfFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =  () => {
    if (!formData?.email ||!formData?.password) {
      setError(true);
    } else {
      // API Call
      setError(false);
      // Navigate to dashboard
      // router.push("/");
    }
  }

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw]">

        <div className="w-[300px] md:w-[500px] shadow-cardShadow p-4 rounded-lg flex flex-col gap-4">
        <InputField
        label={true}
        labelText="Email"
        required
        error={error && !formData?.email}
        errorText=""
        handleChange={handleChange}
        value={formData?.email ? formData?.email : ""}
        inputName="email"
        placeholder={"Eg: Your Email"}
        type="text"
      />

      <InputField
        label={true}
        labelText="Password"
        required
        error={error && !formData?.password}
        errorText=""
        handleChange={handleChange}
        value={formData?.password ? formData?.password : ""}
        inputName="password"
        placeholder={"Eg: Password"}
        type="password"
      />

      <div className="text-center">

        <button onClick={handleSubmit} className="bg-primaryColor text-secondaryColor font-bold rounded-md px-2 py-1 w-[200px] shadow">Submit</button>

      </div>

      

        </div>

    </div>
  );
};

export default LogInPage;
