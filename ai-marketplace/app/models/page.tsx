'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from '../components/card';

// Fake data for testing
const fakeData = [
  {
    created_at: "2023-01-01T00:00:00Z",
    description: "AI Chat is an AI chatbot that writes text. You can use it to write stories, messages, or programming code.",
    name: "Chatbot Model",
    owner: "NeuroMark",
    price: "free",
    updated_at: "2023-02-01T00:00:00Z",
    usable: true
  },
  {
    created_at: "2023-01-15T00:00:00Z",
    description: "Viggle is the new hottest AI Creative Tool That is forever changing Memes and the future of AI Video.",
    name: "Viggle ai",
    owner: "NeuroMark",
    price: "free",
    updated_at: "2023-02-10T00:00:00Z",
    usable: true
  },
  {
    created_at: "2023-01-20T00:00:00Z",
    description: "Predictive analytics is a branch of advanced analytics that makes predictions about future outcomes...",
    name: "Predictive Analytics Model",
    owner: "NeuroMark",
    price: "249.99",
    updated_at: "2023-02-15T00:00:00Z",
    usable: false
  },
  {
    created_at: "2023-02-01T00:00:00Z",
    description: "A comprehensive AI model for sentiment analysis.",
    name: "Sentiment Analysis Model",
    owner: "NeuroMark",
    price: "149.99",
    updated_at: "2023-03-01T00:00:00Z",
    usable: false
  },
  {
    created_at: "2023-02-05T00:00:00Z",
    description: "AI model for recommendation systems.",
    name: "Recommendation Model",
    owner: "NeuroMark",
    price: "199.99",
    updated_at: "2023-03-05T00:00:00Z",
    usable: false
  }
];

interface IModel {
  created_at: string;
  description: string;
  name: string;
  owner: string;
  price: number|string;
  updated_at: string;
  usable: boolean;
}

const ModelsPage: React.FC = () => {
  const [models, setModels] = useState<IModel[]>([]);

  useEffect(() => {
    // Using fake data for testing
    setModels(fakeData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>AI Models Marketplace | NeuroMark</title>
        <meta name="description" content="Explore and purchase AI models from the NeuroMark marketplace." />
      </Head>
      <div className="container mx-auto py-24">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">AI Models</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <Card usable={model.usable} key={index} src = {'/item'+(index+1) + '.jpg'} name={model.name} description={model.description} price={`${model.price}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;
