import { useState } from "react";
import { Header } from "@/components/Header";
import { DepartmentTabs } from "@/components/DepartmentTabs";
import { ImageUpload } from "@/components/ImageUpload";
import { IssueForm } from "@/components/IssueForm";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Plus, Home, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ViewMode = "dashboard" | "report";

interface Issue {
  id: string;
  title: string;
  department: string;
  status: "submitted" | "in-progress" | "completed";
  urgency: "low" | "medium" | "high";
  timestamp: string;
  location: string;
  description: string;
  images: File[];
}

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [selectedDepartment, setSelectedDepartment] = useState("transport");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [submittedIssues, setSubmittedIssues] = useState<Issue[]>([]);
  const { toast } = useToast();

  const handleIssueSubmit = (issueData: any) => {
    const newIssue: Issue = {
      ...issueData,
      status: "submitted" as const
    };
    
    setSubmittedIssues(prev => [newIssue, ...prev]);
    
    // Reset form
    setUploadedImages([]);
    setSelectedDepartment("transport");
    setViewMode("dashboard");
    
    toast({
      title: "Issue Submitted Successfully!",
      description: `Your issue has been registered with ID: ${newIssue.id}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle font-inter">
      <Header />
      
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            variant={viewMode === "dashboard" ? "default" : "outline"}
            className={viewMode === "dashboard" ? "btn-government" : "hover:bg-government/5"}
            onClick={() => setViewMode("dashboard")}
          >
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          
          <Button
            variant={viewMode === "report" ? "default" : "outline"}
            className={viewMode === "report" ? "btn-primary" : "hover:bg-primary/5"}
            onClick={() => setViewMode("report")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {viewMode === "dashboard" ? (
            <Dashboard issues={submittedIssues} />
          ) : (
            <div className="space-y-6">
              {/* Hero Section for Report */}
              <div className="text-center py-8">
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Report a Public Issue
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Help us improve India by reporting issues in your area. 
                  Our AI will help identify the problem and route it to the right department.
                </p>
              </div>

              {/* Department Selection */}
              <DepartmentTabs 
                selectedDepartment={selectedDepartment}
                onDepartmentChange={setSelectedDepartment}
              />

              {/* Image Upload */}
              <ImageUpload onImagesChange={setUploadedImages} />

              {/* Issue Form */}
              <IssueForm
                selectedDepartment={selectedDepartment}
                uploadedImages={uploadedImages}
                onSubmit={handleIssueSubmit}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-foreground">India Seva Portal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A digital initiative by Government of India for transparent public service delivery
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-xs text-muted-foreground">
            <span>© 2024 Government of India</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;