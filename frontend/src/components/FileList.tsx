"use client";

import React from "react";
import { FileData } from "./FileUpload";

interface FileListProps {
  files: FileData[];
  updateFileStatus: (id: string, status: FileData["status"]) => void;
}

export default function FileList({ files, updateFileStatus }: FileListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">File Name</th>
            <th className="px-4 py-2 text-left">Size</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="border-t border-gray-300">
              <td className="px-4 py-2">{file.name}</td>
              <td className="px-4 py-2">{(file.size / 1024).toFixed(2)} KB</td>
              <td className="px-4 py-2">{file.type}</td>
              <td className="px-4 py-2 capitalize">{file.status || "uploaded"}</td>
              <td className="px-4 py-2 space-x-2">
                {/* Placeholder buttons for actions */}
                <button
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={file.status === "processing"}
                  onClick={() => updateFileStatus(file.id, "processing")}
                >
                  Process
                </button>
                <button
                  className="px-2 py-1 bg-red-200 rounded hover:bg-red-300"
                  disabled={file.status === "processing"}
                  onClick={() => updateFileStatus(file.id, "error")}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {files.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No files uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
