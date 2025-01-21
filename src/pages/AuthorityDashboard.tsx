import { IssueCard, Issue } from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { MOCK_ISSUES } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthorityDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIssues(MOCK_ISSUES);
  }, []);

  const updateIssueStatus = (id: string, status: Issue["status"]) => {
    setIssues(prev => 
      prev.map(issue => 
        issue.id === id ? { ...issue, status } : issue
      )
    );
    toast.success(`Issue status updated to ${status}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-4xl mx-auto p-4">
        <header className="mb-8 animate-fade-in flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Authority Dashboard</h1>
            <p className="text-muted-foreground">Manage reported neighborhood issues</p>
          </div>
          <Button 
            variant="ghost" 
            className="hover-scale"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        <div className="grid gap-6 perspective-container">
          {issues.map((issue, index) => (
            <Card 
              key={issue.id} 
              className="glass-card p-4 hover-scale card-3d"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: `translateY(${index * 2}px)`
              }}
            >
              <IssueCard issue={issue} />
              <div className="mt-4 flex gap-2 justify-end">
                <Button
                  variant={issue.status === "pending" ? "default" : "outline"}
                  onClick={() => updateIssueStatus(issue.id, "pending")}
                  className="hover-scale"
                >
                  Pending
                </Button>
                <Button
                  variant={issue.status === "in-progress" ? "default" : "outline"}
                  onClick={() => updateIssueStatus(issue.id, "in-progress")}
                  className="hover-scale"
                >
                  In Progress
                </Button>
                <Button
                  variant={issue.status === "resolved" ? "default" : "outline"}
                  onClick={() => updateIssueStatus(issue.id, "resolved")}
                  className="hover-scale"
                >
                  Resolved
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}