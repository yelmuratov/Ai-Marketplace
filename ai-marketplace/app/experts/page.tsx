'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from '../components/expertCard';
import { experts, Expert } from '../data/experts';

const ExpertsPage: React.FC = () => {
  const [expertsList, setExpertsList] = useState<Expert[]>([]);

  useEffect(() => {
    // Using fake data for testing
    setExpertsList(experts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>AI Experts | NeuroMark</title>
        <meta name="description" content="Explore our team of AI experts at NeuroMark." />
      </Head>
      <div className="container mx-auto py-24">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">AI Experts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertsList.map((expert) => (
            <Card
              key={expert.id}
              img={expert.img}
              name={expert.name}
              role={expert.role}
              salary={expert.salary}
              service={expert.service}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertsPage;
