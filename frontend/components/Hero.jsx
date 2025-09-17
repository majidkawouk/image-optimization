"use client";

import { FileUpIcon } from "lucide-react";

export default function Hero() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">
        Optimize Your Images Effortlessly
      </h1>
      <p className="text-xl font-semibold text-gray-400 dark:text-gray-400 mb-6">
        Drag, drop, and watch your images shrink without losing quality.
      </p>

      <div className="border-2 border-dashed flex flex-col gap-4 bg-gray-100 border-gray-300 dark:border-gray-300 rounded-lg p-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-200 transition w-[40%] mx-auto min-h-60">
        <FileUpIcon className="mx-auto mb-2 w-14 h-14 text-gray-500" />
        <div className="text-gray-500 text-lg font-bold">Drag & drop your images here</div> <span className="text-cyan-400">or</span>
        <button className="bg-cyan-500 font-semibold ml-2 w-fit self-center text-white px-4 py-2 rounded-lg">
          browse files
        </button>
        <input type="file" className="hidden" />
      </div>
    </div>
  );
}
