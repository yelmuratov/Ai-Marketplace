'use client';

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface ChatResponse {
  data: string;
}

export function Chat() {
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");

  const handleSend = async () => {
    if (!message && !image) return;

    const formData = new FormData();
    if (message) formData.append("text", message);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post<ChatResponse>("/api/chat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data.data);
      setMessage("");
      setImage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white px-60 pt-24">
      <main className="flex-1 flex flex-col px-24 pb-4">
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image src="/logo.png" width={100} height={100} alt="ChatGPT" />
          {response && <div className="mt-4">{response}</div>}
        </div>
        <footer className="flex items-center p-4 border-t border-gray-700">
          <label htmlFor="file-upload" className="cursor-pointer">
            <PaperclipIcon className="w-6 h-6" />
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Input
            type="text"
            placeholder="Message ChatGPT"
            className="flex-1 mx-4 text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendIcon className="w-6 h-6 cursor-pointer" onClick={handleSend} />
        </footer>
      </main>
    </div>
  );
}

function PaperclipIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SendIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
