import React from 'react';
import UploadModelForm from '../components/UploadModelForm';

const UploadPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 py-32">
      <h1 className="text-3xl font-bold mb-6">Upload AI Model</h1>
      <UploadModelForm />
    </div>
  );
};

export default UploadPage;
