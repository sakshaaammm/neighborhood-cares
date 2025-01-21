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
  {
    id: "4",
    title: "Graffiti on Public Building",
    description: "New graffiti appeared on the community center wall",
    status: "pending",
    type: "vandalism",
    location: "Community Center",
    createdAt: new Date().toISOString(),
    points: 45,
  },
  {
    id: "5",
    title: "Clogged Storm Drain",
    description: "Storm drain is blocked causing water accumulation",
    status: "in-progress",
    type: "drainage",
    location: "Maple St & 2nd Ave",
    createdAt: new Date().toISOString(),
    points: 60,
  },
  {
    id: "6",
    title: "Fallen Tree Branch",
    description: "Large branch blocking sidewalk after storm",
    status: "pending",
    type: "hazard",
    location: "Pine Street Park",
    createdAt: new Date().toISOString(),
    points: 55,
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