"use client";

import React, { useRef, useState } from "react";

interface FileUploadProps {
  onFilesUploaded: (files: FileData[]) => void;
}

export interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status?: "uploaded" | "processing" | "done" | "error";
}

export default function FileUpload({ onFilesUploaded }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploaded" as const,
    }));
    onFilesUploaded(filesArray);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    const filesArray = Array.from(e.dataTransfer.files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploaded" as const,
    }));
    onFilesUploaded(filesArray);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer hover:border-black transition-colors"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.bmp,.tiff"
      />
      <p className="text-gray-600">Drag and drop files here, or click to select files</p>
      {uploading && (
        <progress className="w-full mt-4" value={progress} max={100}>
          {progress}%
        </progress>
      )}
    </div>
  );
}
