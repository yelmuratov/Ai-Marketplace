export interface Problem {
    id: number;
    author: string;
    profilePic: string;
    date: string;
    content: string;
    title: string;  // Add title to give more context to each problem
  }
  
  export const problems: Problem[] = [
    {
      id: 1,
      author: "Michael Gough",
      profilePic: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
      date: "2022-02-08",
      title: "Enhancing Customer Experience with AI",
      content: "Exploring ways to use AI to improve customer service through chatbots and automated support systems. We aim to reduce response times and increase customer satisfaction."
    },
    {
      id: 2,
      author: "John Doe",
      profilePic: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      date: "2022-03-15",
      title: "Predictive Maintenance in Manufacturing",
      content: "Implementing AI models to predict equipment failures before they happen. This involves analyzing sensor data and historical maintenance records to forecast potential breakdowns."
    },
    {
      id: 3,
      author: "Jane Smith",
      profilePic: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
      date: "2023-05-12",
      title: "Anomaly Detection in Medical Images",
      content: "Developing an AI model to detect anomalies in medical images. This requires a deep understanding of convolutional neural networks and access to a labeled dataset."
    },
    {
      id: 4,
      author: "Alice Johnson",
      profilePic: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
      date: "2023-06-18",
      title: "AI in Financial Fraud Detection",
      content: "Creating machine learning algorithms to detect fraudulent transactions in real-time. The model will analyze transaction patterns and flag any suspicious activities for further investigation."
    },
  ];
  