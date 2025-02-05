import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { navLinks } from '../Constants/index';
import { HiMenu, HiX, HiDocumentText } from 'react-icons/hi';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <nav className="navbar sm:px-16 px-6 py-5">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <HiDocumentText className="text-[#ff0080] w-9 h-9" />
          <p className="text-white text-[24px] font-bold cursor-pointer flex">
            NoteR &nbsp;
            <span className="sm:block hidden text-secondary">| Your Digital Note Book</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {navLinks.map((nav) => (
            <motion.li
              key={nav.id}
              whileHover={{ scale: 1.1 }}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={nav.id}>{nav.title}</Link>
            </motion.li>
          ))}
          <motion.li
            whileHover={{ scale: 1.1 }}
            className="text-[18px] font-medium glow-effect px-4 py-2 rounded-xl"
          >
          </motion.li>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="text-white hover:text-secondary transition-colors"
          >
            {toggle ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: toggle ? 1 : 0,
              scale: toggle ? 1 : 0.95
            }}
            transition={{ duration: 0.2 }}
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 glassmorphism absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <motion.li
                  key={nav.id}
                  whileHover={{ scale: 1.1 }}
                  className={`font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;