
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
  Cat,
  AlertTriangle, 
  Heart, 
  Construction, 
  Lamp, 
  Trash2
} from "lucide-react";
import { 
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
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
    icon: Cat
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
    <div className="space-container min-h-screen pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-lg mx-auto p-4">
        <div className="cosmic-title">Report an Issue</div>
        
        <Tabs value={formData.type} onValueChange={handleProblemTypeChange} className="w-full mb-6">
          <TabsList className="cosmic-tabs w-full justify-start">
            {Object.entries(PROBLEM_TYPES).map(([key, { label, icon: Icon }]) => (
              <TabsTrigger 
                key={key} 
                value={key} 
                className={`cosmic-tab ${formData.type === key ? 'active' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <Card className="cosmic-card p-6 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#9b87f5]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#7E69AB]/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 h-20 w-20 flex items-center justify-center bg-[#1a1a3a]/70 text-[#9b87f5] rounded-lg border border-[#9b87f5]/30">
                <ProblemIcon className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2 golden-text">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter issue title"
                    required
                    className="cosmic-input"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2 golden-text">
                Description
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue"
                required
                className="min-h-[120px] cosmic-input"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="location" className="text-sm font-medium golden-text">Location</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="bg-[#1a1a3a]/70 border-[#9b87f5]/50 text-white hover:bg-[#1a1a3a]/90 hover:text-[#FFD700]"
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
                className="cosmic-input"
              />
            </div>

            <div>
              <label htmlFor="media" className="block text-sm font-medium mb-2 golden-text">
                Upload Image
              </label>
              <div className="flex items-center gap-4">
                <Input
                  id="media"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cosmic-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9b87f5] file:text-white hover:file:bg-[#7E69AB]"
                />
              </div>
              {previewUrl && (
                <div className="mt-4 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
                  <img src={previewUrl} alt="Preview" className="max-h-48 rounded-lg object-cover w-full" />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full cosmic-button">
              <span className="mr-2">Submit Report</span>
              <span className="animate-pulse">✨</span>
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
