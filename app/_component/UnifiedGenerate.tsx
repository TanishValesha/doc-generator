import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UnifiedForm {
  topic: string;
  baseFilename: string;
  difficulty?: "Easy" | "Medium" | "Hard";
}

const UnifiedGenerate = () => {
  const [unifiedForm, setUnifiedForm] = useState<UnifiedForm>({
    topic: "",
    baseFilename: "",
    difficulty: "Easy",
  });
  const [unifiedGenerating, setUnifiedGenerating] = useState(false);

  const handleUnifiedGenerate = async () => {
    if (!unifiedForm.topic || !unifiedForm.baseFilename) {
      toast.error("Please fill in both fields.");
      return;
    }
    setUnifiedGenerating(true);
    const res1 = await fetch("/api/generate/pre-class", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: unifiedForm.topic,
        filename: unifiedForm.baseFilename,
        difficulty: unifiedForm.difficulty,
      }),
    });
    // Pre-Class document
    if (res1.ok) {
      toast.success("Document generated successfully");
      const blob = await res1.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${unifiedForm.baseFilename}_${
        unifiedForm.topic
      }_Pre_Class_File_${new Date()
        .toLocaleString()
        .replace(/[/,: ]/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } else {
      const errorText = await res1.text();
      toast.error(`Error generating document: ${errorText}`);
      console.error("Error response:", errorText);
    }
    // In-Class document
    const res2 = await fetch("/api/generate/in-class", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: unifiedForm.topic,
        filename: unifiedForm.baseFilename,
        difficulty: unifiedForm.difficulty,
      }),
    });
    if (res2.ok) {
      toast.success("Document generated successfully");
      const blob = await res2.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${unifiedForm.baseFilename}_${
        unifiedForm.topic
      }_In_Class_File_${new Date()
        .toLocaleString()
        .replace(/[/,: ]/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } else {
      const errorText = await res2.text();
      toast.error(`Error generating document: ${errorText}`);
      console.error("Error response:", errorText);
    }
    // Post-Class document
    const res3 = await fetch("/api/generate/post-class", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: unifiedForm.topic,
        filename: unifiedForm.baseFilename,
        difficulty: unifiedForm.difficulty,
      }),
    });
    if (res3.ok) {
      toast.success("Document generated successfully");
      const blob = await res3.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${unifiedForm.baseFilename}_${
        unifiedForm.topic
      }_Post_Class_File_${new Date()
        .toLocaleString()
        .replace(/[/,: ]/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } else {
      const errorText = await res3.text();
      toast.error(`Error generating document: ${errorText}`);
      console.error("Error response:", errorText);
    }
    if (res1.ok && res2.ok && res3.ok) {
      toast.success("All documents generated successfully");
    } else {
      toast.error(
        "Some documents failed to generate. Try regenerating later or contact support."
      );
    }
    setUnifiedGenerating(false);
    setUnifiedForm({ topic: "", baseFilename: "", difficulty: "Easy" });
  };

  return (
    <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-3 rounded-lg bg-white shadow-sm">
            <Zap className="w-7 h-7 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Generate Complete Document Set
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Create all three document types (Pre-Class, In-Class, Post-Class)
              with one click
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="unified-topic"
              className="text-sm font-medium text-gray-700"
            >
              Topic
            </Label>
            <Input
              id="unified-topic"
              placeholder="Enter the main topic or subject"
              value={unifiedForm.topic}
              onChange={(e) =>
                setUnifiedForm({ ...unifiedForm, topic: e.target.value })
              }
              className="bg-white border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="unified-filename"
              className="text-sm font-medium text-gray-700"
            >
              Base Filename
            </Label>
            <Input
              id="unified-filename"
              placeholder="Enter the base document name"
              value={unifiedForm.baseFilename}
              onChange={(e) =>
                setUnifiedForm({ ...unifiedForm, baseFilename: e.target.value })
              }
              className="bg-white border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor={`unified-difficulty`}
              className="text-sm font-medium text-gray-700"
            >
              Difficulty Level
            </Label>
            <Select
              onValueChange={(value) =>
                setUnifiedForm({
                  ...unifiedForm,
                  difficulty: value as "Easy" | "Medium" | "Hard",
                })
              }
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder={unifiedForm.difficulty} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200"
          onClick={handleUnifiedGenerate}
          disabled={unifiedGenerating}
        >
          {unifiedGenerating ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Documents...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Generate All Documents</span>
            </div>
          )}
        </Button>
        {unifiedGenerating && (
          <div className="text-sm text-gray-500 mt-2">
            Please wait while we generate all documents. This may take a few
            moments depending on the content.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnifiedGenerate;
