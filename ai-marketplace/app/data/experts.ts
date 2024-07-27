export interface Expert {
    id: number;
    name: string;
    role: string;
    description: string;
    salary: string;  // Monthly salary
    service: string;
    cv: string;
    img: string;
    createdAt: string;
    updatedAt: string;
    available: boolean;
    location: string;
    contact: string;
    linkedin: string;
    github: string;
    leetcode: string;
  }
  
  export const experts: Expert[] = [
    {
      id: 1,
      name: "Stepan Romanov",
      role: "Marketing Data Scientist",
      description: "Stepan is a results-driven data scientist with a robust marketing background based in Uzbekistan. His expertise spans across various industries, including wholesale trade, entertainment, trading, and more. He is skilled in Python, SQL, R, and other tools for data analysis.",
      salary: "$1500+/month",
      service: "Data Analysis and Marketing Analytics",
      cv: "/path/to/Stepan_Romanov_Data_Scientist_072024.pdf",
      img: "/stepan.png",
      createdAt: "2023-07-27T00:00:00Z",
      updatedAt: "2023-07-27T00:00:00Z",
      available: true,
      location: "Uzbekistan",
      contact: "stepanaromanov@gmail.com",
      linkedin: "https://www.linkedin.com/in/stepanromanov",
      github: "https://github.com/stepanaromanov",
      leetcode: "https://www.leetcode.com/stepanromanov"
    },
    {
      id: 2,
      name: "Alice Johnson",
      role: "Machine Learning Engineer",
      description: "Alice is a highly skilled machine learning engineer with expertise in developing predictive models and deploying machine learning systems.",
      salary: "$1100+/month",
      service: "Predictive Modeling and System Deployment",
      cv: "/path/to/Alice_Johnson_CV.pdf",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
      createdAt: "2023-06-15T00:00:00Z",
      updatedAt: "2023-07-15T00:00:00Z",
      available: true,
      location: "USA",
      contact: "alice.johnson@example.com",
      linkedin: "https://www.linkedin.com/in/alicejohnson",
      github: "https://github.com/alicejohnson",
      leetcode: "https://www.leetcode.com/alicejohnson"
    },
    {
      id: 3,
      name: "John Doe",
      role: "Data Analyst",
      description: "John is a data analyst with extensive experience in data visualization and business intelligence.",
      salary: "$2,000/month",
      service: "Data Visualization and Business Intelligence",
      cv: "/path/to/John_Doe_CV.pdf",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
      createdAt: "2023-05-10T00:00:00Z",
      updatedAt: "2023-06-10T00:00:00Z",
      available: false,
      location: "Canada",
      contact: "john.doe@example.com",
      linkedin: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      leetcode: "https://www.leetcode.com/johndoe"
    },
    {
      id: 4,
      name: "Michael Smith",
      role: "AI Researcher",
      description: "Michael is an AI researcher focused on developing innovative AI algorithms and conducting cutting-edge research.",
      salary: "$2,000/month",
      service: "AI Research and Algorithm Development",
      cv: "/path/to/Michael_Smith_CV.pdf",
      img: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
      createdAt: "2023-04-01T00:00:00Z",
      updatedAt: "2023-05-01T00:00:00Z",
      available: true,
      location: "UK",
      contact: "michael.smith@example.com",
      linkedin: "https://www.linkedin.com/in/michaelsmith",
      github: "https://github.com/michaelsmith",
      leetcode: "https://www.leetcode.com/michaelsmith"
    }
    // Add more experts as needed
  ];
  