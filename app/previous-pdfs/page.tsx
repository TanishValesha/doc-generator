"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  FileText,
  Clock,
  Target,
  BookOpen,
  Users,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
  topic: string;
  filename: string;
  type: "pre-class" | "in-class" | "post-class";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  url: string;
  createdAt?: Date;
}

const DocsList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    const fetchDocuments = async () => {
      const fetchDocs = async () => {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/generated-docs`
        );
        const data = await res.json();
        if (data.success) {
          setDocuments(data.docs);
          setLoading(false);
        }
      };

      fetchDocs();
    };

    fetchDocuments();
  }, []);

  const getDocumentTypeLabel = (type: Document["type"]) => {
    switch (type) {
      case "pre-class":
        return "Pre-Class";
      case "in-class":
        return "In-Class";
      case "post-class":
        return "Post-Class";
      default:
        return "Document";
    }
  };

  const getDocumentTypeColor = (type: Document["type"]) => {
    switch (type) {
      case "pre-class":
        return "bg-blue-100 text-blue-700";
      case "in-class":
        return "bg-green-100 text-green-700";
      case "post-class":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDownload = (doc: Document) => {
    // Implement download functionality
    console.log("Downloading:", doc.filename);
    const link = document.createElement("a");
    link.href = doc.url;
    link.download = doc.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // window.open(doc.url, '_blank');
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="animate-pulse">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded w-48"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Generated Documents
        </h1>
        <p className="text-gray-600">
          View and manage your previously generated educational documents.
        </p>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <Clock className="text-gray-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">
              Document History
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {documents.length} document{documents.length !== 1 ? "s" : ""}{" "}
            generated
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-400 mb-4\" size={48} />
              <p className="text-gray-500 font-medium text-lg">
                No documents generated yet
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Generate your first document to see it here
              </p>
            </div>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="sm:flex sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {doc.filename}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentTypeColor(
                              doc.type
                            )}`}
                          >
                            {getDocumentTypeLabel(doc.type)}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                              doc.difficulty
                            )}`}
                          >
                            {doc.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Target size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {doc.topic}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        {doc.createdAt && (
                          <>
                            <span>
                              {new Date(doc.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                            <span>
                              at{" "}
                              {new Date(doc.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button onClick={() => handleDownload(doc)}>
                      <Download size={16} />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Summary Stats */}
      {documents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Pre-Class Documents
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {documents.filter((doc) => doc.type === "pre-class").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">
                  In-Class Documents
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {documents.filter((doc) => doc.type === "in-class").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileCheck className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">
                  Post-Class Documents
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {documents.filter((doc) => doc.type === "post-class").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocsList;
