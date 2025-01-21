import { useEffect, useState } from "react";
import { IssueCard, type Issue } from "@/components/IssueCard";
import { Navbar } from "@/components/Navbar";

// Temporary mock data
const MOCK_ISSUES: Issue[] = [
  {
    id: "1",
    title: "Broken Streetlight on Main St",
    description: "The streetlight near 123 Main St has been out for 3 days",
    status: "pending",
    type: "streetlight",
    location: "123 Main St",
    createdAt: new Date().toISOString(),
    points: 50,
  },
  {
    id: "2",
    title: "Pothole on Oak Avenue",
    description: "Large pothole causing traffic slowdown",
    status: "in-progress",
    type: "pothole",
    location: "Oak Ave & 5th St",
    createdAt: new Date().toISOString(),
    points: 75,
  },
  {
    id: "3",
    title: "Overflowing Garbage Bin",
    description: "Garbage bin hasn't been collected in a week",
    status: "resolved",
    type: "garbage",
    location: "Central Park",
    createdAt: new Date().toISOString(),
    points: 100,
  },
];

export default function Index() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setIssues(MOCK_ISSUES);
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