import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  type: string;
  location: string;
  createdAt: string;
  points: number;
};

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Card className="glass-card hover-scale overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{issue.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
          </div>
          <StatusBadge status={issue.status} />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{issue.location}</span>
          <span className="text-accent font-medium">+{issue.points} points</span>
        </div>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: Issue["status"] }) {
  const statusConfig = {
    pending: {
      icon: AlertCircle,
      text: "Pending",
      className: "bg-yellow-500/10 text-yellow-500",
    },
    "in-progress": {
      icon: Clock,
      text: "In Progress",
      className: "bg-blue-500/10 text-blue-500",
    },
    resolved: {
      icon: CheckCircle2,
      text: "Resolved",
      className: "bg-green-500/10 text-green-500",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn("flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium", config.className)}>
      <Icon className="w-3.5 h-3.5" />
      <span>{config.text}</span>
    </div>
  );
}