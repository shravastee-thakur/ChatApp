import React, { useState } from "react";
import assets from "../assets/assets";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
  };
  return (
    <div className="min-h-screen bg-[#024751] bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col">
      {/* left */}

      <img src={assets.logo} className="w-[min(30vw,250px)]" />

      {/* right */}

      <form
        onSubmit={handleSubmit}
        className="border-2 bg-white/8 text-white border-gray-500 p-4 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className=" font-medium text-2xl flex justify-between items-center">
          {currentState}
        </h2>

        {currentState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            value={fullName}
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              value={email}
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              value={password}
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </>
        )}

        {currentState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            placeholder="provide a short bio..."
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3   bg-sky-300 rounded-md cursor-pointer"
        >
          {currentState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currentState === "Sign up" ? (
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-blue-200 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Create an account
              <span
                onClick={() => {
                  setCurrentState("Sign up");
                }}
                className="font-medium text-blue-200 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
