import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ship, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend login
    // Connect this to your FastAPI authentication later.
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 text-white relative overflow-hidden"
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

        {/* LOGIN CARD */}
        <div className="bg-[#0A1C29]/90 backdrop-blur-xl border border-[#16445A] rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

          <p className="text-sm text-[#8BA3B3] text-center mt-2">
            Login to your AUQA SETU account
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
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
                  placeholder="Enter your password"
                  required
                  className="w-full bg-[#071923] border border-[#16445A] rounded-xl py-3 pl-11 pr-4 text-white placeholder-[#718A9A] outline-none focus:border-[#2DD4BF]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0D9488] hover:bg-[#2DD4BF] text-[#06141F] font-bold flex items-center justify-center gap-2 transition"
            >
              Login
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-sm text-center text-[#8BA3B3] mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#2DD4BF] font-semibold hover:text-[#5EEAD4]"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
