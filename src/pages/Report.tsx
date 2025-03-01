
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
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";

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
    <div className="min-h-screen relative pb-20 md:pb-0 md:pt-20" 
         style={{ 
           backgroundImage: "url('/lovable-uploads/dbd7d788-725f-4a8c-a3c7-cdb0875e9140.png')", 
           backgroundSize: "cover", 
           backgroundPosition: "center", 
           backgroundAttachment: "fixed" 
         }}>
      <Navbar />
      
      {/* Header Section with Tabs for Problem Types */}
      <div className="container max-w-5xl mx-auto pt-6 px-4">
        <div className="glass-card rounded-lg p-4 mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Report an Issue</h1>
          <p className="text-white/80 mb-6">Help make our community better by reporting issues you observe</p>
          
          <Tabs defaultValue="general" onValueChange={handleProblemTypeChange} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 bg-white/10 p-1">
              {Object.entries(PROBLEM_TYPES).map(([key, { label, icon: Icon }]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium line-clamp-1">{label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Main Form Section */}
      <main className="container max-w-lg mx-auto px-4 pb-16">
        <Card className="glass-card p-6 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="bg-background/30 backdrop-blur-sm p-4 rounded-lg">
                <ProblemIcon className="h-16 w-16 text-white" />
              </div>
              <div className="flex-1">
                <Label htmlFor="title" className="block text-sm font-medium mb-2 text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter issue title"
                  required
                  className="bg-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="block text-sm font-medium mb-2 text-white">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue"
                required
                className="min-h-[120px] bg-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="location" className="text-sm font-medium text-white">Location</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
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
                className="bg-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <Label htmlFor="media" className="block text-sm font-medium mb-2 text-white">
                Upload Image
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="media"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white bg-white/20 text-white"
                />
              </div>
              {previewUrl && (
                <div className="mt-4 bg-white/10 p-2 rounded-lg">
                  <img src={previewUrl} alt="Preview" className="h-48 w-full rounded-lg object-cover" />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
              Submit Report
            </Button>
          </form>
        </Card>

        {/* Visual elements */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="glass-card rounded-lg p-3 hover-scale">
            <img 
              src="https://images.unsplash.com/photo-1615812214207-34e3be6812df?w=500&h=300&fit=crop" 
              alt="Community cleanup" 
              className="w-full h-32 object-cover rounded mb-2" 
            />
            <p className="text-xs text-white/80">Recent community cleanup event</p>
          </div>
          <div className="glass-card rounded-lg p-3 hover-scale">
            <img 
              src="https://images.unsplash.com/photo-1469571486292-b53601010b89?w=500&h=300&fit=crop" 
              alt="Fixed street light" 
              className="w-full h-32 object-cover rounded mb-2" 
            />
            <p className="text-xs text-white/80">Recently fixed streetlight</p>
          </div>
        </div>
      </main>
    </div>
  );
}
