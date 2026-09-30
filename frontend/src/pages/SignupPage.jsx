import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ship, User, Mail, Lock, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Save the newly created account
    const newUser = {
      name: name,
      email: email,
      password: password,
      role: "Fleet Manager",
    };

    localStorage.setItem("greenfleet_account", JSON.stringify(newUser));

    // Go to login after signup
    alert("Account created successfully. Please login.");

    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-10 text-white relative overflow-hidden"
      style={{
        backgroundColor: "#06141F",
        backgroundImage: `
          linear-gradient(
            rgba(6, 20, 31, 0.72),
            rgba(6, 20, 31, 0.90)
          ),
          url("/images/backgroundimage.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute w-96 h-96 bg-[#2DD4BF]/10 rounded-full blur-3xl top-10 left-10" />

      <div className="absolute w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl bottom-10 right-10" />

      <div className="relative z-10 w-full max-w-md">
        {/* LOGO */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0D9488]/20 border border-[#2DD4BF]/40 flex items-center justify-center">
              <Ship className="w-6 h-6 text-[#2DD4BF]" />
            </div>

            <div className="text-left">
              <h1 className="text-xl font-extrabold">
                AUQA <span className="text-[#2DD4BF]">SETU</span>
              </h1>

              <p className="text-[9px] uppercase tracking-widest text-[#718A9A]">
                Maritime Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* SIGNUP CARD */}
        <div className="bg-[#0A1C29]/90 backdrop-blur-xl border border-[#16445A] rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <p className="text-sm text-[#8BA3B3] text-center mt-2">
            Start using AUQA SETU
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-4">
            {/* NAME */}
            <div>
              <label className="block text-sm text-[#B7C8D3] mb-2">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718A9A]" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-[#071923] border border-[#16445A] rounded-xl py-3 pl-11 pr-4 text-white placeholder-[#718A9A] outline-none focus:border-[#2DD4BF]"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-[#B7C8D3] mb-2">Email</label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718A9A]" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#071923] border border-[#16445A] rounded-xl py-3 pl-11 pr-4 text-white placeholder-[#718A9A] outline-none focus:border-[#2DD4BF]"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-[#B7C8D3] mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718A9A]" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  required
                  className="w-full bg-[#071923] border border-[#16445A] rounded-xl py-3 pl-11 pr-4 text-white placeholder-[#718A9A] outline-none focus:border-[#2DD4BF]"
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm text-[#B7C8D3] mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718A9A]" />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="w-full bg-[#071923] border border-[#16445A] rounded-xl py-3 pl-11 pr-4 text-white placeholder-[#718A9A] outline-none focus:border-[#2DD4BF]"
                />
              </div>
            </div>

            {/* CREATE ACCOUNT */}
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-[#0D9488] hover:bg-[#2DD4BF] text-[#06141F] font-bold flex items-center justify-center gap-2 transition"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-sm text-center text-[#8BA3B3] mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#2DD4BF] font-semibold hover:text-[#5EEAD4]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
