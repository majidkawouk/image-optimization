"use client";

import { Image, ImageUpIcon } from "lucide-react";

export default function Editor() {
  return (
    <div className="flex-col flex md:flex-row justify-center gap-8 p-8">
  
      <div className="space-y-8 rounded-2xl bg-white p-8 shadow-2xl shadow-slate-200/50 w-full max-w-xl">
        <div className="space-y-6">
          <div className="h-64 border-2 border-gray-300 rounded-md flex items-center justify-center text-center text-gray-400">
            <div className="space-y-2">
             <ImageUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-4H24m0-4h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <p>
                Add an image to get started
              </p>
            </div>
          </div>
          <div className="text-center bg-gray-50 flex-col border-dashed border-2 h-60 flex items-center justify-center p-4 rounded-md space-y-2">
            <Image className="text-gray-400 w-12 h-12"/>
            <p className="text-sm text-gray-500">
              Upload a file or drag and drop
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>

   
      <div className="space-y-8 rounded-2xl bg-white p-8 shadow-2xl shadow-slate-200/50 w-full max-w-xl">
        <div className="space-y-6 ">
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold leading-7 text-slate-900">
            Optimization Settings
          </h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="output-format" className="block text-sm font-medium leading-6 text-slate-900">
                Format (f_auto)
              </label>
              <select
                id="output-format"
                name="output-format"
                className="form-select mt-2 block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary-color sm:text-sm sm:leading-6 transition"
              >
                <option defaultValue>Auto (f_auto)</option>
                <option>WebP</option>
                <option>AVIF</option>
                <option>JPG</option>
                <option>PNG</option>
              </select>
            </div>
            <div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {["Eco", "Good", "Best", "Auto"].map((opt, i) => (
                  <button
                    key={i}
                    className={`text-xs font-medium text-slate-600 bg-slate-100 rounded-md py-1.5 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color transition ${
                      opt === "Best" ? "ring-2 ring-primary-color" : ""
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium leading-6 text-slate-900">
                Resize & Crop
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="block text-xs font-medium leading-6 text-slate-600">
                    Width
                  </p>
                  <input
                    type="number"
                    placeholder="e.g., 1024"
                    className="form-input mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary-color sm:text-sm sm:leading-6 transition"
                  />
                </div>
                <div>
                  <p className="block text-xs font-medium leading-6 text-slate-600">
                    Height
                  </p>
                  <input
                    type="number"
                    placeholder="e.g., 768"
                    className="form-input mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary-color sm:text-sm sm:leading-6 transition"
                  />
                </div>
              </div>
              <div>
                <p className="block text-xs font-medium leading-6 text-slate-600">
                  Crop Mode
                </p>
                <select className="form-select mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary-color sm:text-sm sm:leading-6 transition">
                  <option>Fill</option>
                  <option>Fit</option>
                  <option>Scale</option>
                  <option>Thumbnail</option>
                </select>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="auto-crop"
                    name="auto-crop"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-primary-color focus:ring-primary-color"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="auto-crop"
                    className="font-medium text-slate-900"
                  >
                    Auto-crop
                  </label>
                  <p className="text-slate-500">
                    Automatically crop to the most interesting area.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium leading-6 text-slate-900">
                Advanced Options
              </h4>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="dpr"
                    name="dpr"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-primary-color focus:ring-primary-color"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="dpr" className="font-medium text-slate-900">
                    DPR (Device Pixel Ratio)
                  </label>
                  <p className="text-slate-500">
                    Optimize images for high-resolution displays.
                  </p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-primary-color focus:ring-primary-color"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <p className="font-medium text-slate-900">
                    Chroma Subsampling
                  </p>
                  <p className="text-slate-500">
                    Reduces color information for smaller file sizes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="flex w-full justify-center items-center gap-2 rounded-md bg-primary-color px-4 py-3 text-sm font-bold bg-gray-100 text-cyan-800 shadow-sm transition-transform active:scale-95"
          >
            Optimize
          </button>
        </div>
      </div>
    </div>
  );
}