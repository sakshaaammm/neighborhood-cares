import { IssueCard, Issue } from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { MOCK_ISSUES } from "@/data/mockData";

export default function AuthorityDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    setIssues(MOCK_ISSUES);
  }, []);

  const updateIssueStatus = (id: string, status: Issue["status"]) => {
    setIssues(prev => 
      prev.map(issue => 
        issue.id === id ? { ...issue, status } : issue
      )
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-4xl mx-auto p-4">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Authority Dashboard</h1>
          <p className="text-muted-foreground">Manage reported neighborhood issues</p>
        </header>

        <div className="grid gap-6">
          {issues.map((issue) => (
            <Card key={issue.id} className="glass-card p-4 hover-scale">
              <IssueCard issue={issue} />
              <div className="mt-4 flex gap-2 justify-end">
                <Button
                  variant={issue.status === "pending" ? "default" : "outline"}
                  onClick={() => updateIssueStatus(issue.id, "pending")}
                >
                  Pending
                </Button>
                <Button
                  variant={issue.status === "in-progress" ? "default" : "outline"}
                  onClick={() => updateIssueStatus(issue.id, "in-progress")}
                >
                  In Progress
                </Button>
                <Button
                  variant={issue.status === "resolved" ? "default" : "outline"}
                  onClick={() => updateIssueStatus(issue.id, "resolved")}
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