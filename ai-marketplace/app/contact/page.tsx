'use client';
import React, { useState } from "react";
import ThreeScene from "../components/Threescene";
import Head from 'next/head';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const validate = () => {
    let valid = true;
    let errors = {
      email: "",
      subject: "",
      message: "",
    };

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      valid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      
      console.log(formData);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>Contact Us | NeuroMark</title>
        <meta name="description" content="Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know." />
      </Head>
      <div className="fixed inset-0 z-0">
        <ThreeScene />
      </div>
      <section className="relative z-10 px-12 lg:py-32 px-4 top-24 md:top-12 mx-auto max-w-screen-md ">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-white sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`shadow-sm bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
              placeholder="name@neuromark.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className={`block p-3 w-full text-sm text-white bg-gray-800 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-600'} shadow-sm focus:ring-primary-500 focus:border-primary-500`}
              placeholder="Let us know how we can help you"
              required
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject}</p>}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className={`block p-2.5 w-full text-sm text-white bg-gray-800 rounded-lg shadow-sm border ${errors.message ? 'border-red-500' : 'border-gray-600'} focus:ring-primary-500 focus:border-primary-500`}
              placeholder="Leave a comment..."
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
