"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, ClipboardCheck, Download } from "lucide-react";
import { toast } from "sonner";
import QuickTips from "./_component/QuickTips";

interface DocumentForm {
  topic: string;
  filename: string;
}

export default function Dashboard() {
  const [preClassForm, setPreClassForm] = useState<DocumentForm>({
    topic: "",
    filename: "",
  });
  const [inClassForm, setInClassForm] = useState<DocumentForm>({
    topic: "",
    filename: "",
  });
  const [postClassForm, setPostClassForm] = useState<DocumentForm>({
    topic: "",
    filename: "",
  });
  const [generatingStates, setGeneratingStates] = useState({
    preClass: false,
    inClass: false,
    postClass: false,
  });

  const handleGenerate = async (
    type: "preClass" | "inClass" | "postClass",
    form: DocumentForm
  ) => {
    if (!form.topic.trim() || !form.filename.trim()) {
      toast.error("Please fill in both topic and filename");
      return;
    }

    setGeneratingStates((prev) => ({ ...prev, [type]: true }));

    // Simulate document generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setGeneratingStates((prev) => ({ ...prev, [type]: false }));

    // Here you would typically call an API to generate the document
    console.log(`Generating ${type} document:`, form);
    alert(
      `${type} document "${form.filename}" for topic "${form.topic}" has been generated!`
    );
  };

  const documentTypes = [
    {
      id: "preClass",
      title: "Pre-Class Document",
      description:
        "Preparation materials and reading assignments for students before class",
      icon: BookOpen,
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      form: preClassForm,
      setForm: setPreClassForm,
      generating: generatingStates.preClass,
    },
    {
      id: "inClass",
      title: "In-Class Document",
      description:
        "Interactive activities and materials for classroom engagement",
      icon: Users,
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
      form: inClassForm,
      setForm: setInClassForm,
      generating: generatingStates.inClass,
    },
    {
      id: "postClass",
      title: "Post-Class Document",
      description:
        "Review materials and assessments for after class completion",
      icon: ClipboardCheck,
      color: "purple",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      form: postClassForm,
      setForm: setPostClassForm,
      generating: generatingStates.postClass,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Document Generator
          </h2>
          <p className="text-gray-600">
            Generate comprehensive educational documents for different phases of
            your teaching process.
          </p>
        </div>

        {/* Document Generation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentTypes.map((docType) => {
            const IconComponent = docType.icon;
            return (
              <Card
                key={docType.id}
                className={`${docType.bgColor} ${docType.borderColor} border-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                      <IconComponent
                        className={`w-6 h-6 ${docType.iconColor}`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {docType.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-600 leading-relaxed">
                    {docType.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${docType.id}-topic`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Topic
                    </Label>
                    <Input
                      id={`${docType.id}-topic`}
                      placeholder="Enter the topic or subject"
                      value={docType.form.topic}
                      onChange={(e) =>
                        docType.setForm({
                          ...docType.form,
                          topic: e.target.value,
                        })
                      }
                      className="bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`${docType.id}-filename`}
                      className="text-sm font-medium text-gray-700"
                    >
                      File Name
                    </Label>
                    <Input
                      id={`${docType.id}-filename`}
                      placeholder="Enter the document name"
                      value={docType.form.filename}
                      onChange={(e) =>
                        docType.setForm({
                          ...docType.form,
                          filename: e.target.value,
                        })
                      }
                      className="bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>

                  <Button
                    className={`w-full ${docType.buttonColor} text-white font-medium transition-all duration-200`}
                    onClick={() =>
                      handleGenerate(
                        docType.id as "preClass" | "inClass" | "postClass",
                        docType.form
                      )
                    }
                    disabled={docType.generating}
                  >
                    {docType.generating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Generate Document</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <QuickTips />
      </div>
    </div>
  );
}
