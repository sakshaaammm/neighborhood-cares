import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapboxToken) {
      toast.error("Please enter your Mapbox token");
      return;
    }

    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-74.5, 40],
        zoom: 9,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      setIsMapInitialized(true);
      toast.success("Map initialized successfully!");
    } catch (error) {
      console.error("Error initializing map:", error);
      toast.error("Failed to initialize map. Please check your token.");
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Issue Map</h1>
          <p className="text-muted-foreground">View issues in your area</p>
        </header>

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            {!isMapInitialized && (
              <div className="glass-card p-6 rounded-lg mb-4">
                <h2 className="text-xl font-semibold mb-4">Initialize Map</h2>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter your Mapbox public token"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                  />
                  <Button onClick={initializeMap}>Initialize Map</Button>
                  <p className="text-sm text-muted-foreground">
                    Get your token from{" "}
                    <a
                      href="https://www.mapbox.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Mapbox
                    </a>
                  </p>
                </div>
              </div>
            )}
            <div
              ref={mapContainer}
              className={`w-full h-[600px] rounded-lg ${
                !isMapInitialized ? "hidden" : ""
              }`}
            />
          </TabsContent>

          <TabsContent value="list">
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">List View</h2>
              <p className="text-muted-foreground">
                A list view of issues will be implemented here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Map Settings</h2>
              <p className="text-muted-foreground">
                Map settings will be implemented here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}