import { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle, BarChart3, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Issue {
  id: string;
  title: string;
  department: string;
  status: "submitted" | "in-progress" | "completed";
  urgency: "low" | "medium" | "high";
  timestamp: string;
  location: string;
}

interface DashboardProps {
  issues: Issue[];
}

export const Dashboard = ({ issues }: DashboardProps) => {
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    inProgress: 0,
    completed: 0
  });

  useEffect(() => {
    const submitted = issues.filter(issue => issue.status === "submitted").length;
    const inProgress = issues.filter(issue => issue.status === "in-progress").length;
    const completed = issues.filter(issue => issue.status === "completed").length;
    
    setStats({
      total: issues.length,
      submitted,
      inProgress,
      completed
    });
  }, [issues]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="status-submitted">Submitted</Badge>;
      case "in-progress":
        return <Badge className="status-progress">In Progress</Badge>;
      case "completed":
        return <Badge className="status-completed">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-elevated rounded-lg p-4 text-center">
          <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Issues</div>
        </div>
        
        <div className="card-elevated rounded-lg p-4 text-center">
          <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.submitted}</div>
          <div className="text-sm text-muted-foreground">Submitted</div>
        </div>
        
        <div className="card-elevated rounded-lg p-4 text-center">
          <BarChart3 className="h-8 w-8 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
        
        <div className="card-elevated rounded-lg p-4 text-center">
          <CheckCircle className="h-8 w-8 text-government mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.completed}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="card-government rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Recent Issues</h2>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>

        {issues.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No issues reported yet</p>
            <p className="text-sm text-muted-foreground">Start by reporting your first issue above</p>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.slice(0, 5).map((issue) => (
              <div key={issue.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-foreground">{issue.title}</h3>
                      <div className={`w-2 h-2 rounded-full ${getUrgencyColor(issue.urgency)}`} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {issue.location} • {issue.department}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ID: {issue.id} • {new Date(issue.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(issue.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};