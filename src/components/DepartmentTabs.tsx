import { useState } from "react";
import { 
  Truck, 
  Droplets, 
  Zap, 
  TreePine, 
  Building2, 
  Heart, 
  GraduationCap, 
  Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const departments = [
  { id: "transport", name: "Transport", icon: Truck, color: "bg-primary" },
  { id: "water", name: "Water Resources", icon: Droplets, color: "bg-blue-500" },
  { id: "power", name: "Power", icon: Zap, color: "bg-yellow-500" },
  { id: "environment", name: "Environment", icon: TreePine, color: "bg-accent" },
  { id: "urban", name: "Urban Development", icon: Building2, color: "bg-gray-500" },
  { id: "health", name: "Health", icon: Heart, color: "bg-red-500" },
  { id: "education", name: "Education", icon: GraduationCap, color: "bg-purple-500" },
  { id: "police", name: "Police", icon: Shield, color: "bg-government" },
];

interface DepartmentTabsProps {
  selectedDepartment: string;
  onDepartmentChange: (departmentId: string) => void;
}

export const DepartmentTabs = ({ selectedDepartment, onDepartmentChange }: DepartmentTabsProps) => {
  return (
    <div className="bg-card card-government rounded-lg p-6 animate-slide-up">
      <h2 className="text-lg font-semibold text-foreground mb-4">Select Department</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {departments.map((dept) => {
          const Icon = dept.icon;
          const isSelected = selectedDepartment === dept.id;
          
          return (
            <Button
              key={dept.id}
              variant={isSelected ? "default" : "outline"}
              className={`h-20 flex flex-col items-center justify-center space-y-2 transition-government ${
                isSelected 
                  ? "btn-primary scale-105" 
                  : "hover:bg-primary/5 hover:border-primary hover:scale-102"
              }`}
              onClick={() => onDepartmentChange(dept.id)}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium text-center leading-tight">
                {dept.name}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};