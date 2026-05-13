import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  // Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error State
  const [error, setError] = useState("");

  // Login Function
  const handleLogin = () => {

    const success = login(email, password);

    if (success) {

      navigate("/dashboard");

    }
    else {

      setError("Invalid Email or Password");

    }

  };

  return (

    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#111827] p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-3">
          SupportSphere
        </h1>

        <p className="text-gray-400 text-center mb-8">
          AI Powered B2B Support System
        </p>

        {/* Error Message */}
        {error && (

          <div className="bg-red-500 text-white p-3 rounded-xl mb-5 text-center">
            {error}
          </div>

        )}

        <div className="space-y-5">

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-[#1e293b] text-white border border-gray-700 outline-none focus:border-cyan-400"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-[#1e293b] text-white border border-gray-700 outline-none focus:border-cyan-400"
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all p-4 rounded-xl font-bold text-lg"
          >
            Login
          </button>

          {/* Demo Credentials */}
          <div className="bg-[#1e293b] p-4 rounded-xl text-sm text-gray-300 mt-4">

            <p className="font-bold text-cyan-400 mb-2">
              Demo Credentials
            </p>

            <p>Email: admin@supportsphere.com</p>

            <p>Password: 123456</p>

          </div>

        </div>

      </motion.div>

    </div>

  );
}

export default Login;