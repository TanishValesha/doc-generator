import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                EduDoc Generator
              </h1>
              <p className="text-sm text-gray-500">
                Generate educational documents effortlessly
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm font-medium">
            Beta Version
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Header;
