import { FileText } from "lucide-react";
import React from "react";

const QuickTips = () => {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-blue-600" />
        Quick Tips
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
        <div className="space-y-2">
          <h4 className="font-medium text-blue-600">Pre-Class Documents</h4>
          <p>
            A short, informative document to help students prepare before the
            class. It should include a brief overview and key concepts (around
            1–2 pages).
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-green-600">In-Class Documents</h4>
          <p>
            A structured lesson plan or teaching script for a one-hour class,
            including flow of topics, examples, and key points.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-purple-600">Post-Class Documents</h4>
          <p>
            A short quiz (approximately 6-10 questions) and a summary to
            reinforce the key takeaways from the session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickTips;
