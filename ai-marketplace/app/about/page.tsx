// pages/about.tsx

'use client';
import React, { useEffect } from "react";
import Head from 'next/head';
import Image from 'next/image';
import ThreeScene from "../components/Threescene";
import { useWindowSize } from "@/hooks/useWindowsize";

const About1: React.FC = () => {
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
                <title>About Us | NeuroMark</title>
                <meta name="description" content="Learn about NeuroMark's journey and how we're transforming the AI landscape with cutting-edge technology." />
            </Head>
            <div className="fixed inset-0 z-0">
                <ThreeScene />
            </div>
            <div className="relative z-10 text-white lg:top-32 top-24 min-h-screen">
                <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                        <div className="w-full lg:w-5/12 flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-white pb-4">About Us</h1>
                            <p className="font-normal text-base leading-6 text-gray-200">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum. In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from.
                            </p>
                        </div>
                        <div className="w-full lg:w-8/12">
                            <Image
                                src="/team.jpg"
                                width={500}
                                height={500}
                                alt="Team"
                                className="object-cover object-center w-full h-96"
                            />
                        </div>
                    </div>

                    <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                        <div className="w-full lg:w-5/12 flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-white pb-4">Our Story</h1>
                            <p className="font-normal text-base leading-6 text-gray-200">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum. In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from.
                            </p>
                        </div>
                        <div className="w-full lg:w-8/12 lg:pt-8">
                            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                                {["Mirjalol", "Diyarbek", "Salimbay", "Sharyar"].map((name, index) => (
                                    <div key={index} className="p-4 pb-6 flex justify-center flex-col items-center bg-black bg-opacity-50 rounded-lg">
                                        <Image
                                            src={`/team${index + 1}.jpg`}
                                            width={300}
                                            height={400}
                                            objectFit="contain"
                                            alt="Team member"
                                            className="object-cover object-center w-full h-96"
                                        />
                                        <p className="font-medium text-xl leading-5 text-white mt-4">{name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About1;
