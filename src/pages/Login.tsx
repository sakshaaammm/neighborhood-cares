import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "user" | "authority") => {
    login(role);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="glass-card w-full max-w-md p-6 space-y-8 animate-fade-in">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Choose your login type to continue</p>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full hover-scale" 
            onClick={() => handleLogin("user")}
          >
            Login as Resident
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full hover-scale"
            onClick={() => handleLogin("authority")}
          >
            Login as Authority
          </Button>
        </div>
      </Card>
    </div>
  );
}