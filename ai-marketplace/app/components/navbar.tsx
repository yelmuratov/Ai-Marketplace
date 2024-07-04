"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore, useLoginModal, useRegisterModal } from '../../stores/auth-store';
import { useAuth } from '@/context/auth-contex';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkBackground, setDarkBackground] = useState(true);
  const { accessToken, user, setTokens, setUser } = useAuthStore();
  const { logout } = useAuth(); // Use the logout from context
  const { closeRegisterModal, openRegisterModal } = useRegisterModal();
  const { closeLoginModal } = useLoginModal();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('auth-storage');
      if (storedState) {
        try {
          const parsedState = JSON.parse(storedState).state;
          setTokens(parsedState.accessToken, parsedState.refreshToken);
          setUser(parsedState.user);
        } catch (error) {
          console.error('Error parsing local storage data:', error);
        }
      }
    }
  }, [setTokens, setUser]);

  useEffect(() => {
    if (accessToken) {
      closeLoginModal();
      closeRegisterModal();
    }
  }, [accessToken, closeLoginModal, closeRegisterModal]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setDarkBackground(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const target = document.querySelector('.page-background');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  return (
    <nav
      className={`fixed lg:px-10 w-full z-20 px-4 py-4 flex justify-between items-center transition-colors duration-300 ${
        scrolled ? 'bg-white bg-opacity-30 backdrop-blur-md border-b border-black-800' : 'bg-transparent'
      } ${darkBackground ? 'text-white' : 'text-black'}`}
    >
      <Link href="/" className="text-3xl font-bold leading-none">
        <Image src="/logo.png" alt="Aral Tech" width={100} height={100} />
      </Link>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className={`navbar-burger flex items-center p-3 ${darkBackground ? 'text-white' : 'text-black'}`}>
              <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col mt-4">
              <Link href="/" className="p-4 text-sm font-semibold hover:bg-gray-100">Home</Link>
              <Link href="/models" className="p-4 text-sm font-semibold hover:bg-gray-100">AI Models</Link>
              <Link href="/about" className="p-4 text-sm font-semibold hover:bg-gray-100">About Us</Link>
              <Link href="/contact" className="p-4 text-sm font-semibold hover:bg-gray-100">Contact</Link>
            </div>
            <div className="mt-auto">
              {user ? (
                <div className='md:hidden block'>
                  <span className="block text-black text-sm text-center my-4">{user.email}</span>
                  <SheetTrigger asChild>
                    <Button onClick={logout} className="w-full text-center py-2 text-sm font-semibold">Logout</Button>
                  </SheetTrigger>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link href="/signin" className="block w-full text-center py-2 text-sm font-semibold">Sign In</Link>
                  <Link href="/signup" className="block w-full text-center py-2 text-sm font-semibold">Sign Up</Link>
                </div>  
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <ul
        className={`hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6 ${
          darkBackground ? 'text-[#8d99ae]' : 'text-[#8d99ae]'
        }`}
      >
        <li><Link href="/" className="text-sm font-bold hover:text-gray-500">Home</Link></li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><Link href="/models" className="text-sm font-bold hover:text-gray-500">AI Models</Link></li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </li>
        <li><Link href="/about" className="text-sm font-bold hover:text-gray-500">About Us</Link></li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </li> 
        <li><Link href="/contact" className="text-sm font-bold hover:text-gray-500">Contact</Link></li>
      </ul>
      {user ? (
        <div className='md:flex hidden items-center gap-4'>
          <span className="block text-white text-sm text-center my-4">{user.email}</span>
          <Button onClick={logout} className="w-full text-center py-2 text-sm font-semibold">Logout</Button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
