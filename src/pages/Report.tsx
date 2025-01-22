import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addNewIssue } from "@/data/mockData";

export default function Report() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: "",
    location: "Unknown Location", // Default location
    type: "general" // Default type
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newIssue = addNewIssue(formData);
      console.log("Form submitted:", newIssue);
      toast.success("Issue reported successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        media: "",
        location: "Unknown Location",
        type: "general"
      });
    } catch (error) {
      toast.error("Failed to submit report");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-lg mx-auto p-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Report an Issue</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter issue title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue"
                required
              />
            </div>

            <div>
              <label htmlFor="media" className="block text-sm font-medium mb-2">
                Media URL (Optional)
              </label>
              <Input
                id="media"
                value={formData.media}
                onChange={(e) => setFormData(prev => ({ ...prev, media: e.target.value }))}
                placeholder="Enter media URL"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}