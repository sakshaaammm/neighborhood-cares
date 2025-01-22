import { useEffect, useState } from "react";
import { IssueCard, type Issue } from "@/components/IssueCard";
import { Navbar } from "@/components/Navbar";
import { MOCK_ISSUES } from "@/data/mockData";

export default function Index() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    // This will now always get the latest issues including newly added ones
    setIssues(MOCK_ISSUES.slice(0, 6)); // Show only the 6 most recent issues
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-lg mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Neighborhood Watch</h1>
          <p className="text-muted-foreground">Help make your community better</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Recent Issues</h2>
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </section>
      </main>
      <Navbar />
    </div>
  );
}