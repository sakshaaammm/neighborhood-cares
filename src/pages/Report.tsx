
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addNewIssue } from "@/data/mockData";
import { 
  Upload, 
  MapPin, 
  Paw, 
  AlertTriangle, 
  Heart, 
  Construction, 
  Lamp, 
  Trash2
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const PROBLEM_TYPES = {
  general: {
    label: "General Issue",
    description: "Please describe the issue you've observed.",
    icon: AlertTriangle
  },
  stray_animals: {
    label: "Stray Animals",
    description: "I've spotted stray animals that need attention. They appear to be [breed/type] and are located near [specific location].",
    icon: Paw
  },
  suspicious_activity: {
    label: "Suspicious Activity",
    description: "I've noticed suspicious activity in the neighborhood. Someone was [description of activity] at approximately [time].",
    icon: AlertTriangle
  },
  domestic_violence: {
    label: "Domestic Violence",
    description: "I'm concerned about a potential domestic violence situation at [address/location]. I heard/saw [description of what was observed].",
    icon: Heart
  },
  pothole: {
    label: "Pothole",
    description: "There's a dangerous pothole on [street name] that needs repair. It's approximately [size estimate] and is causing traffic issues.",
    icon: Construction
  },
  streetlight: {
    label: "Streetlight Issue",
    description: "The streetlight at [location] is not functioning properly. It has been [flickering/out entirely] for [time period].",
    icon: Lamp
  },
  garbage: {
    label: "Garbage Collection",
    description: "There's uncollected garbage at [location] that has been there for [time period]. It's causing [sanitation issues/attracting pests].",
    icon: Trash2
  }
};

export default function Report() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "Unknown Location",
    type: "general"
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleProblemTypeChange = (value: string) => {
    const problem = PROBLEM_TYPES[value as keyof typeof PROBLEM_TYPES];
    setFormData(prev => ({
      ...prev,
      type: value,
      description: problem.description
    }));
  };

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`;
          
          // Attempt to get a readable address (would require a geocoding service in a real app)
          setFormData(prev => ({
            ...prev,
            location: locationString
          }));
          toast.success("Location fetched successfully!");
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get your location. Please check your permissions.");
          setIsGettingLocation(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
      setIsGettingLocation(false);
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

  const ProblemIcon = PROBLEM_TYPES[formData.type as keyof typeof PROBLEM_TYPES]?.icon || AlertTriangle;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-lg mx-auto p-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Report an Issue</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-2">
                Problem Type
              </label>
              <Select 
                value={formData.type} 
                onValueChange={handleProblemTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a problem type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROBLEM_TYPES).map(([key, { label, icon: Icon }]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-4 items-center">
              <ProblemIcon className="h-20 w-20 p-4 bg-primary/10 text-primary rounded-lg" />
              <div className="flex-1">
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
              </div>
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
                className="min-h-[120px]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  {isGettingLocation ? "Fetching..." : "Get My Location"}
                </Button>
              </div>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location details"
              />
            </div>

            <div>
              <label htmlFor="media" className="block text-sm font-medium mb-2">
                Upload Image
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
