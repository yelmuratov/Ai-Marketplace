'use client';

import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  description: string;
  zip_file: File | null;
  input_types: string;
  output_types: string;
}

const UploadModelForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    zip_file: null,
    input_types: '',
    output_types: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isJsonString(formData.input_types) || !isJsonString(formData.output_types)) {
      toast.error('Input and Output types should be valid JSON.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('zip_file', formData.zip_file as File);
    data.append('input_types', formData.input_types);
    data.append('output_types', formData.output_types);

    try {
      await axios.post('https://marketplace.araltech.tech/api/models/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Model uploaded successfully!');
      setFormData({
        name: '',
        description: '',
        zip_file: null,
        input_types: '',
        output_types: ''
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading model:', error);
      toast.error('Failed to upload model');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          maxLength={255}
          minLength={1}
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          required
          minLength={1}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="zip_file" className="block text-sm font-medium text-gray-700">
          Zip File
        </label>
        <input
          type="file"
          name="zip_file"
          id="zip_file"
          accept=".zip"
          required
          ref={fileInputRef}
          onChange={handleChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
      <div>
        <label htmlFor="input_types" className="block text-sm font-medium text-gray-700">
          Input Types (JSON format)
        </label>
        <input
          type="text"
          name="input_types"
          id="input_types"
          required
          value={formData.input_types}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="output_types" className="block text-sm font-medium text-gray-700">
          Output Types (JSON format)
        </label>
        <input
          type="text"
          name="output_types"
          id="output_types"
          required
          value={formData.output_types}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <Button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Upload Model
      </Button>
    </form>
  );
};

export default UploadModelForm;
