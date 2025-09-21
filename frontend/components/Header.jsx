"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
export default function Header() {
  return (
    <div className="border-b p-5 border-gray-300 dark:border-gray-300 pb-4 w-full flex items-center justify-between ">
      <div className="flex items-center pl-5">
        <Sparkles className="text-cyan-400 w-8 h-8" />
        <span className="text-2xl font-bold ml-2">Image Optimization</span>
      </div>
      <Link className="font-medium" href="/editor">
        <div className="bg-[#06B6D4] font-semibold  text-white px-4 cursor-pointer py-2 rounded-lg">Get started</div>
      </Link>
    </div>
  );
}
