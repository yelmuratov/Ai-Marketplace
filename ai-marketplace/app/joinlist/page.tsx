'use client';
import React, { useEffect } from "react";
import Head from 'next/head';
import ThreeScene from "../components/Threescene";
import { useWindowSize } from "@/hooks/useWindowsize";// Adjust the import based on your file structure
import FormComponent from "../components/joinform";

const JoinPage: React.FC = () => {
    const { width, height } = useWindowSize();

    useEffect(() => {
        // Adjust Three.js canvas size on window resize
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        }
    }, [width, height]);

    return (    
        <div className="relative">
            <Head>
                <title>Join Us | NeuroMark</title>
                <meta name="description" content="Join NeuroMark's AI marketplace to explore and provide cutting-edge AI solutions." />
            </Head>
            <div className="fixed inset-0 z-0">
                <ThreeScene />
            </div>
            <div className="relative z-10 text-white lg:top-32 top-24 min-h-screen">
                <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                        <div className="w-full lg:w-5/12 flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-white pb-4">Join Our AI Marketplace</h1>
                            <p className="font-normal text-base leading-6 text-gray-200">
                                Sign up as a Business or Developer to get started. Whether youre looking for AI solutions or providing them, we're here to help you connect and grow.
                            </p>
                        </div>
                        <div className="w-full lg:w-7/12">
                            <FormComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinPage;
