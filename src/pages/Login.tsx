import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isAuthority, setIsAuthority] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  // Mock authority credentials for demo
  const MOCK_AUTHORITY = {
    username: "admin",
    password: "admin123"
  };

  const handleLogin = (role: "user" | "authority") => {
    if (role === "authority") {
      if (credentials.username === MOCK_AUTHORITY.username && 
          credentials.password === MOCK_AUTHORITY.password) {
        login(role);
        navigate("/authority");
        toast.success("Welcome back, Authority!");
      } else {
        toast.error("Invalid authority credentials!");
        return;
      }
    } else {
      login(role);
      navigate("/");
      toast.success("Welcome back!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 perspective-container">
      <div className="max-w-md w-full space-y-4">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Choose your login type to continue</p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button 
            variant={!isAuthority ? "default" : "outline"}
            className="w-1/2 hover-scale"
            onClick={() => setIsAuthority(false)}
          >
            Resident
          </Button>
          <Button 
            variant={isAuthority ? "default" : "outline"}
            className="w-1/2 hover-scale"
            onClick={() => setIsAuthority(true)}
          >
            Authority
          </Button>
        </div>

        <Card className="glass-card p-6 space-y-6 card-3d">
          {isAuthority ? (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Input
                  placeholder="Authority Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({...prev, username: e.target.value}))}
                  className="glass-card"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Authority Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({...prev, password: e.target.value}))}
                  className="glass-card"
                />
              </div>
              <Button 
                className="w-full hover-scale" 
                onClick={() => handleLogin("authority")}
              >
                Login as Authority
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Use username: admin, password: admin123 for demo
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <Button 
                className="w-full hover-scale" 
                onClick={() => handleLogin("user")}
              >
                Continue as Resident
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                No credentials needed for demo
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}