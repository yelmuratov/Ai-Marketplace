"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from 'react-hot-toast';

type UserType = "business" | "developer";

const FormComponent: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("business");
  const [otherDescription, setOtherDescription] = useState<string>("");
  const [aiSolution, setAiSolution] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company_website: "",
    github: "",
    productDescription: "",
    productLinks: "",
    looking_for:"",
    what_you_can: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtherDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOtherDescription(e.target.value);
  };


  const handleAiSolutionChange = (value: string) => {
    setAiSolution(value);
    setFormData({ ...formData, looking_for: value });
  };

  const resetForm = () => {
    setUserType("business");
    setOtherDescription("");
    setAiSolution("");
    setFormData({
      email: "",
      name: "",
      company_website: "",
      github: "",
      productDescription: "",
      productLinks: "",
      looking_for:"", 
      what_you_can: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form submitted"); // Added console.log
    try {
      if (userType === "business") {
        const response = await axios.post("https://marketplace.araltech.tech/api/whitelist/business/", {
          email: formData.email,
          company_name: formData.name,
          company_website: formData.company_website,
          looking_for: aiSolution,
          otherDescription: aiSolution === "other" ? otherDescription : undefined,
        });
        console.log(response.data); // Added console.log
        toast.success("Application submitted successfully!");
      } else if (userType === "developer") {
        const response = await axios.post("https://marketplace.araltech.tech/api/whitelist/dev/", {
          "email": formData.email,
          "name": formData.name,
          "github": formData.github,
          "product_description": formData.productDescription,
          "product_link": formData.productLinks,
          "what_you_can": formData.what_you_can,
        });
        console.log(response.data); // Added console.log
        toast.success("Application submitted successfully!");
      }
      resetForm();
    } catch (error) {
      console.log("Error:", error); // Added console.log
      if (axios.isAxiosError(error) && error.response) {
        const errorMsg = error.response.data;
        for (const [key, value] of Object.entries(errorMsg)) {
          toast.error(`${key}: ${value}`);
        }
      } else {
        toast.error("Failed to submit the application. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Join our AI Marketplace</CardTitle>
        <CardDescription>Sign up as a Business or Developer to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <RadioGroup value={userType} onValueChange={handleUserTypeChange} className="flex items-center gap-4">
              <Label htmlFor="business" className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem id="business" value="business" />
                Business
              </Label>
              <Label htmlFor="developer" className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem id="developer" value="developer" />
                Developer
              </Label>
            </RadioGroup>
            {userType === "business" && (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_website">Company website</Label>
                  <Input id="company_website" name="company_website" type="url" value={formData.company_website} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessNeed">What kind of AI solution are you looking for?</Label>
                  <Select value={aiSolution} onValueChange={handleAiSolutionChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales process automation</SelectItem>
                      <SelectItem value="customer-service">Customer service</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {aiSolution === "other" && (
                    <div className="space-y-2">
                      <Label htmlFor="otherDescription">Describe your needs</Label>
                      <Textarea
                        id="otherDescription"
                        name="otherDescription"
                        value={otherDescription}
                        onChange={handleOtherDescriptionChange}
                        className="min-h-[100px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            {userType === "developer" && (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input id="github" name="github" type="url" value={formData.github} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productDescription">Product Description</Label>
                  <Textarea
                    id="productDescription"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    className="min-h-[100px]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productLinks">Product Links</Label>
                  <Input
                    id="productLinks"
                    name="productLinks"
                    type="url"
                    value={formData.productLinks}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="services">Services Offered</Label>
                  <Textarea
                    id="services"
                    name="what_you_can"
                    value={formData.what_you_can}
                    onChange={handleChange}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}
          </div>
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              Submit application
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default FormComponent;
