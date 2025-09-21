import { Shield, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-gradient-government text-government-foreground shadow-government sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold">India Seva</h1>
              <p className="text-sm text-white/80">National Grievance Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};