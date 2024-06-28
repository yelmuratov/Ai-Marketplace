'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

const ModelsPage: React.FC = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('https://marketplace.araltech.tech/ai_models'); // Replace with your backend API endpoint
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>AI Models Marketplace | NeuroMark</title>
        <meta name="description" content="Explore and purchase AI models from the NeuroMark marketplace." />
      </Head>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">AI Models Marketplace</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div key={index} className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 mx-auto">
              <div
                className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                  alt="model-image" />
              </div>
              <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Chat gpt-4
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  Description
                </p>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  Price: $100
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button">
                  Try it now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;
