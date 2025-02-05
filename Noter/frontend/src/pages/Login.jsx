import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "../components/LoadingIndicator";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("api/token", formData);
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center pt-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glassmorphism p-8 w-full max-w-md mx-4"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-white text-sm font-medium block mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 bg-tertiary rounded-lg text-white placeholder-secondary outline-none border border-secondary focus:border-white transition-all"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="text-white text-sm font-medium block mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-tertiary rounded-lg text-white placeholder-secondary outline-none border border-secondary focus:border-white transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          {loading && <LoadingIndicator />}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-secondary text-black rounded-lg font-medium hover:bg-white transition-colors"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="text-white hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
