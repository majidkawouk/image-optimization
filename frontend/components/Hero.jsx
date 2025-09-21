"use client";

import { FileUpIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4 mt-20">
        Optimize Your Images Effortlessly
      </h1>
      <p className="text-xl font-semibold text-gray-400 dark:text-gray-400 mb-6">
        Start by dragging, dropping, and watching your images shrink without losing quality.
      </p>
      <div className="inline-flex items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer">
        <FileUpIcon className="w-5 h-5" />
        <Link className="font-medium" href="/editor">
          Optimize
        </Link>
      </div>
      
    </div>
  );
}
