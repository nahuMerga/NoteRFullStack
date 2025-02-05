import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';
import LoadingIndicator from '../components/LoadingIndicator';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/user/register/', {
        username: formData.username,
        password: formData.password
      });
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed!');
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
        <h2 className="text-3xl font-bold text-center text-white mb-8">Create an Account</h2>
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
          <div>
            <label className="text-white text-sm font-medium block mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 bg-tertiary rounded-lg text-white placeholder-secondary outline-none border border-secondary focus:border-white transition-all"
              placeholder="Confirm your password"
              required
            />
          </div>
          {loading && <LoadingIndicator />}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-secondary text-black rounded-lg font-medium hover:bg-white transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;