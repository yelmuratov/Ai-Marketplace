"use client";

import Head from "next/head";
import ThreeScene from "./components/Threescene";;
import Link from "next/link"; // Import Link component
import { Toaster } from "react-hot-toast";

const Home: React.FC = () => {

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Head>
        <title>Explore the AI World with NeuroMark</title>
        <meta
          name="description"
          content="Dive into the immersive 3D experience of the AI world with Aral Tech. Discover cutting-edge AI technologies and explore the future of artificial intelligence through interactive 3D graphics."
        />
        <meta
          name="keywords"
          content="AI, Artificial Intelligence, 3D Graphics, Three.js, Next.js, Aral Tech, Technology, Innovation"
        />
        <meta name="author" content="Aral Tech" />
        <meta
          property="og:title"
          content="Explore the AI World with Aral Tech"
        />
        <meta
          property="og:description"
          content="Dive into the immersive 3D experience of the AI world with Aral Tech. Discover cutting-edge AI technologies and explore the future of artificial intelligence through interactive 3D graphics."
        />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://www.araltech.tech" />
        <meta property="og:type" content="website" />
      </Head>
      <ThreeScene />
      <div className={`absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 pointer-events-none`}>
        <h1 className="text-3xl lg:w-[1000px] text-center sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-4">
          A marketplace for small businesses to easily use AI tools
        </h1>
        <p className="text-sm sm:text-lg md:text-xl lg:text-xl text-center max-w-2xl">
          Rent easy-to-use AI models to improve operations and customer service,
          while AI developers get paid for their creations
        </p>
      </div>
      <Link href="/joinlist" className="absolute z-40 top-1/2 mt-[140px] transform -translate-y-1/2 left-1/2 transform -translate-x-1/2 mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300">
        Get Started
      </Link>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
