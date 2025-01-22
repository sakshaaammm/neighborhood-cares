import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  type: string;
  location: string;
  createdAt: string;
  points: number;
  media?: string; // Optional media URL
};

export function IssueCard({ issue }: { issue: Issue }) {
  const getStatusColor = (status: Issue["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "in-progress":
        return "bg-blue-500";
      case "resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{issue.title}</h3>
          <p className="text-sm text-muted-foreground">{issue.description}</p>
        </div>
        <Badge variant="outline" className={`${getStatusColor(issue.status)} text-white`}>
          {issue.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Location</p>
          <p>{issue.location}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Type</p>
          <p>{issue.type}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Points</p>
          <p>{issue.points}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Reported</p>
          <p>{formatDistanceToNow(new Date(issue.createdAt))} ago</p>
        </div>
      </div>
      
      {issue.media && (
        <div className="mt-4">
          <img 
            src={issue.media} 
            alt="Issue media" 
            className="rounded-lg max-h-48 object-cover"
          />
        </div>
      )}
    </div>
  );
}