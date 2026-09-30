import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Ship } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const enteredEmail = email.trim().toLowerCase();
    const enteredPassword = password;

    if (!enteredEmail || !enteredPassword) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      // Get the account created during Signup
      const savedAccount = localStorage.getItem("greenfleet_account");

      if (!savedAccount) {
        alert("No account found. Please sign up first.");
        setLoading(false);
        return;
      }

      const account = JSON.parse(savedAccount);

      const savedEmail = String(account.email || "")
        .trim()
        .toLowerCase();

      const savedPassword = String(account.password || "");

      // Check email and password
      if (enteredEmail !== savedEmail || enteredPassword !== savedPassword) {
        alert("Invalid email or password.");
        setLoading(false);
        return;
      }

      // Create the currently logged-in user
      const loggedInUser = {
        name: account.name,
        email: account.email,
        role: account.role || "Fleet Manager",
      };

      // Save current logged-in user
      localStorage.setItem("greenfleet_user", JSON.stringify(loggedInUser));

      setLoading(false);

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong while logging in.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundColor: "#06141F",
        backgroundImage: "url('/images/backgroundimage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#06141F]/80" />

      <div className="relative z-10 w-full max-w-md">
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "rgba(10, 28, 41, 0.95)",
            border: "1px solid #16445A",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: "linear-gradient(135deg, #0D9488 0%, #16445A 100%)",
              }}
            >
              <Ship className="w-7 h-7 text-[#5EEAD4]" />
            </div>

            <h1 className="text-2xl font-bold text-white">
              GREENFLEET <span className="text-[#2DD4BF]">AI</span>
            </h1>

            <p className="text-xs text-[#8BA3B3] mt-1">
              Quantum-Inspired Maritime Optimization
            </p>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Welcome Back</h2>

            <p className="text-sm text-[#8BA3B3] mt-1">
              Login to your GreenFleet AI account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718A9A]" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg pl-11 pr-4 py-3 bg-[#071923] border border-[#16445A] text-white placeholder-[#718A9A] outline-none focus:border-[#2DD4BF] transition"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718A9A]" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg pl-11 pr-12 py-3 bg-[#071923] border border-[#16445A] text-white placeholder-[#718A9A] outline-none focus:border-[#2DD4BF] transition"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718A9A] hover:text-[#5EEAD4]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-[#06141F] transition hover:opacity-90 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #2DD4BF 0%, #5EEAD4 100%)",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup */}
          <div className="text-center mt-6">
            <p className="text-sm text-[#8BA3B3]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#2DD4BF] font-semibold hover:text-[#5EEAD4]"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Back */}
          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-xs text-[#718A9A] hover:text-[#5EEAD4]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
