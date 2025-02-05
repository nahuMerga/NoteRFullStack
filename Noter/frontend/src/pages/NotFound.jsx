import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center pt-[120px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-8xl font-bold text-white mb-4"
        >
          404
        </motion.h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          className="mb-8"
        >
          <div className="text-4xl font-semibold text-secondary mb-4">Page Not Found</div>
          <p className="text-secondary text-lg">The page you're looking for doesn't exist or has been moved.</p>
        </motion.div>
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
        >
          <Link
            to="/"
            className="inline-block py-3 px-8 bg-secondary text-black rounded-xl font-medium hover:bg-white transition-colors"
          >
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;