import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addNewIssue } from "@/data/mockData";
import { Upload } from "lucide-react";

export default function Report() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "Unknown Location",
    type: "general"
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert file to data URL
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newIssue = addNewIssue({
            ...formData,
            media: reader.result as string
          });
          console.log("Form submitted:", newIssue);
          toast.success("Issue reported successfully!");
          
          // Reset form
          setFormData({
            title: "",
            description: "",
            location: "Unknown Location",
            type: "general"
          });
          setSelectedFile(null);
          setPreviewUrl("");
        };
        reader.readAsDataURL(selectedFile);
      } else {
        const newIssue = addNewIssue(formData);
        console.log("Form submitted:", newIssue);
        toast.success("Issue reported successfully!");
        
        // Reset form
        setFormData({
          title: "",
          description: "",
          location: "Unknown Location",
          type: "general"
        });
      }
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
                Upload Image (Optional)
              </label>
              <div className="flex items-center gap-4">
                <Input
                  id="media"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              {previewUrl && (
                <div className="mt-4">
                  <img src={previewUrl} alt="Preview" className="max-h-48 rounded-lg object-cover" />
                </div>
              )}
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