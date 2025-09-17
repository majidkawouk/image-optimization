"use client";

import { CloudUpload, Download, Settings } from "lucide-react";

export default function HowSection() {
return (
    <div className="bg-gray-50 flex  items-center flex-col justify-center w-full py-10 mt-20 min-h-[500px]">
        <p className="text-sm bg-gray-200 p-1 rounded">How it works</p>
        <h1 className="text-3xl font-bold">A Simple 3-step Process</h1>
        <h2 className="text-center text-gray-500 font-semibold">  Our platform is designed to be intuitive and easy to use. Here's a quick rundown of how you can optimize your images in just a few clicks.</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-5 md:px-20">
            <div className="flex flex-col items-center text-center gap-4">
                <CloudUpload className="w-14 h-16 text-cyan-600 mb-4"/>
                <h1 className="text-xl font-bold">1. Upload Your Images</h1>
                <h2 className="text-gray-500">Drag and drop your images or select them from your computer. We support various formats like JPG, PNG, and GIF.</h2>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
                <Settings className="w-14 h-16 text-cyan-600 mb-4"/>
                <h1 className="text-xl font-bold">2. Optimize Automatically</h1>
                <h2 className="text-gray-500">Our intelligent algorithms reduce file size while preserving visual quality, ensuring your images look great.</h2>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
                <Download className="w-14 h-16 text-cyan-600 mb-4"/>
                <h1 className="text-xl font-bold">3. Download & Use</h1>
                <h2 className="text-gray-500">Once optimized, download your images instantly. Use them on your website, social media, or anywhere else.</h2>
            </div>
        </div>
    
    
    </div>
)
}
  

