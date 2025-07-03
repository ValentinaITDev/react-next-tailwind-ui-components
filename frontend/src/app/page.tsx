"use client";

import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  // File type definition
  interface File {
    id: string;
    name: string;
    size: number;
    type: string;
    url?: string;
    status?: "uploaded" | "processing" | "done" | "error";
  }

  // Handle file upload
  const handleFilesUploaded = (uploadedFiles: File[]) => {
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  // Handle file processing status update
  const updateFileStatus = (id: string, status: File["status"]) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, status } : file))
    );
  };

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold text-center">I Love PDF Clone</h1>
      <FileUpload onFilesUploaded={handleFilesUploaded} />
      <FileList files={files} updateFileStatus={updateFileStatus} />
    </div>
  );
}
