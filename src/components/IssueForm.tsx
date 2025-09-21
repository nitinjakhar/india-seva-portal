import { useState } from "react";
import { MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface IssueFormProps {
  selectedDepartment: string;
  uploadedImages: File[];
  onSubmit: (issueData: any) => void;
}

export const IssueForm = ({ selectedDepartment, uploadedImages, onSubmit }: IssueFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    urgency: "medium",
    contactPhone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const issueData = {
      ...formData,
      department: selectedDepartment,
      images: uploadedImages,
      timestamp: new Date().toISOString(),
      status: "submitted",
      id: `JH${Date.now().toString().slice(-6)}`
    };
    
    onSubmit(issueData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-card card-government rounded-lg p-6 animate-scale-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Report Issue Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Issue Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-foreground">
            Issue Title *
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Brief description of the issue"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="input-government"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-foreground">
            Detailed Description *
          </Label>
          <Textarea
            id="description"
            placeholder="Provide detailed information about the issue"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="input-government min-h-[100px]"
            required
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-foreground">
            Location *
          </Label>
          <div className="relative">
            <Input
              id="location"
              type="text"
              placeholder="Enter address or landmark"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="input-government pl-10"
              required
            />
            <MapPin className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Urgency Level */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Urgency Level
          </Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "low", label: "Low", color: "bg-green-500" },
              { value: "medium", label: "Medium", color: "bg-yellow-500" },
              { value: "high", label: "High", color: "bg-red-500" }
            ].map((urgency) => (
              <Button
                key={urgency.value}
                type="button"
                variant={formData.urgency === urgency.value ? "default" : "outline"}
                className={`h-12 ${
                  formData.urgency === urgency.value 
                    ? "btn-primary" 
                    : "hover:bg-primary/5"
                }`}
                onClick={() => handleInputChange("urgency", urgency.value)}
              >
                <div className={`w-3 h-3 rounded-full ${urgency.color} mr-2`} />
                {urgency.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Contact Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Contact Phone (Optional)
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Your phone number for updates"
            value={formData.contactPhone}
            onChange={(e) => handleInputChange("contactPhone", e.target.value)}
            className="input-government"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full btn-government h-12 text-base font-semibold"
            disabled={!formData.title || !formData.description || !formData.location}
          >
            <Send className="h-5 w-5 mr-2" />
            Submit Issue Report
          </Button>
        </div>
      </form>
    </div>
  );
};