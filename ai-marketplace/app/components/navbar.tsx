"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed lg:px-40 md:px-40 w-full z-20 px-4 py-4 flex justify-between items-center transition-colors duration-300 ${scrolled ? 'bg-white bg-opacity-30' : 'border-gray-200 bg-white bg-opacity-10'}`}>
      <Link href="/" className="text-3xl font-bold leading-none">
        <Image src="/logo.png" alt="Aral Tech" width={100} height={100} />
      </Link>
      <div className="lg:hidden">
        <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={toggleMenu}>
          <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
        <li><Link href="/" className="text-sm text-white font-bold hover:text-gray-500">Home</Link></li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><Link href="/models" className="text-sm text-white font-bold hover:text-gray-500">AI Models</Link></li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><Link href="/about" className="text-sm text-white font-bold hover:text-gray-500">About us</Link></li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><Link href="/contact" className="text-sm text-white font-bold hover:text-gray-500">Contact</Link></li>
      </ul>
      <div className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
        <Link href="/signin">Sign In</Link>
      </div>
      <div className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
        <Link href="/signup">Sign Up</Link>
      </div>
      {menuOpen && (
        <div className="navbar-menu relative z-50 lg:hidden">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25 z-40" onClick={toggleMenu}></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto z-50">
            <div className="flex items-center mb-8">
              <Link href="/" className="mr-auto text-3xl font-bold leading-none">
                <Image src="/logo.png" alt="Aral Tech" width={100} height={100} />
              </Link>
              <button className="navbar-close" onClick={toggleMenu}>
                <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <Link href="/" className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Home</Link>
                </li>
                <li className="mb-1">
                  <Link href="/models" className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">AI Models</Link>
                </li>
                <li className="mb-1">
                  <Link href="/about" className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">About Us</Link>
                </li>
                <li className="mb-1">
                  <Link href="/contact" className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                <Link href="/signin" className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl">Sign in</Link>
                <Link href="/signup" className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl">Sign Up</Link>
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2024</span>
              </p>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
