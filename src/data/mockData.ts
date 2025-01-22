import { Issue } from "@/components/IssueCard";

export const MOCK_ISSUES: Issue[] = [
  {
    id: "1",
    title: "Broken Streetlight on Main St",
    description: "The streetlight near 123 Main St has been out for 3 days",
    status: "pending",
    type: "streetlight",
    location: "123 Main St",
    createdAt: new Date().toISOString(),
    points: 50,
    media: "https://placehold.co/600x400",
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

// Function to add a new issue
export const addNewIssue = (issue: Omit<Issue, "id" | "status" | "points" | "createdAt">) => {
  const newIssue: Issue = {
    ...issue,
    id: (MOCK_ISSUES.length + 1).toString(),
    status: "pending",
    points: 50, // Default points for new issues
    createdAt: new Date().toISOString(),
  };
  
  MOCK_ISSUES.unshift(newIssue); // Add to beginning of array
  return newIssue;
};