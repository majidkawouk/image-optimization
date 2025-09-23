"use client";

import { useState, useEffect } from "react";
import { ImageUpIcon, X, CopyIcon, Loader2 } from "lucide-react";

export default function Editor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [format, setFormat] = useState("Auto (f_auto)");
  const [quality, setQuality] = useState("Best");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [cropMode, setCropMode] = useState("Fill");
  const [autoCrop, setAutoCrop] = useState(false);
  const [dpr, setDpr] = useState(false);
  const [chromaSub, setChromaSub] = useState(false);

  const [mb, setMb] = useState(null);
  const [newmb, setNewmb] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [optimizedUrl, setOptimizedUrl] = useState(null);

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedImage);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setOptimizedUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setOptimizedUrl(null);
    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    const filesize = (event.dataTransfer.files[0].size / 1024 / 1024).toFixed(
      2
    );
    setMb(filesize);

    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setOptimizedUrl(null);
    }
  };

  const handleDownload = async () => {
    if (!optimizedUrl) return;
    try {
      const response = await fetch(optimizedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "optimized-image.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const handleOptimize = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;
    setIsLoading(true);
    setOptimizedUrl(null);

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("format", format);
    formData.append("quality", quality);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("cropMode", cropMode);
    formData.append("autoCrop", autoCrop);
    formData.append("dpr", dpr);
    formData.append("chromaSub", chromaSub);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      setOptimizedUrl(data.url);
      setNewmb((data.size / 1024 / 1024).toFixed(2));
      console.log("Uploaded Image URL:", data.url);
    } catch (error) {
      console.error("Error optimizing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!optimizedUrl) return;
    try {
      await navigator.clipboard.writeText(optimizedUrl);
      console.log("Copied to clipboard:", optimizedUrl);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 p-8 font-[Inter] min-h-screen bg-gray-50 text-slate-800">
      <div className="space-y-8 rounded-2xl bg-white p-8 shadow-2xl shadow-slate-200/50 w-full max-w-xl">
        {previewUrl ? (
          <div className="relative h-96 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center p-4">
            <img
              src={previewUrl}
              alt={selectedImage?.name || "Preview"}
              className="w-full h-full object-contain rounded-md"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 transition"
              aria-label="Remove image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div
            className={`text-center bg-gray-50 flex-col border-dashed border-2 h-96 flex items-center justify-center p-4 rounded-md space-y-2 transition-colors ${
              isDragging ? "border-cyan-500 bg-gray-100" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center p-4 cursor-pointer"
            >
              <ImageUpIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-500">
                Upload a file or drag and drop
              </p>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
              />
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG, GIF up to 10MB
              </p>
            </label>
          </div>
        )}
        {optimizedUrl && (
          <div className="mt-8 space-y-4">
            <h4 className="text-base font-semibold text-slate-900">
              Optimized Image
            </h4>
            <div className="relative">
              <img
                src={optimizedUrl}
                alt="Optimized Preview"
                className="w-full h-auto rounded-md shadow-lg border border-gray-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm border">
                <p className="font-medium text-slate-900">Original Size</p>
                <p className="text-cyan-600 font-semibold">{mb} MB</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm border">
                <p className="font-medium text-slate-900">Optimized Size</p>
                <p className="text-emerald-600 font-semibold">{newmb} MB</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md text-sm truncate">
              <span className="truncate">{optimizedUrl}</span>
              <button
                onClick={handleCopy}
                className="p-1 rounded-full bg-white text-cyan-600 shadow-md hover:bg-gray-200 transition"
                aria-label="Copy URL"
              >
                <CopyIcon className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleDownload}
              className="inline-block px-4 py-2 text-sm font-semibold text-white bg-cyan-600 rounded-md shadow hover:bg-cyan-500 transition"
            >
              Download
            </button>
          </div>
        )}
      </div>
      <div className="space-y-8 rounded-2xl bg-white p-8 shadow-2xl shadow-slate-200/50 w-full max-w-xl ring-1 ring-cyan-400">
        <h3 className="text-base font-semibold leading-7 text-slate-900">
          Optimization Settings
        </h3>
        <form onSubmit={handleOptimize} className="space-y-6">
          <div>
            <p className="block text-sm font-medium leading-6 text-slate-900">
              Format (f_auto)
            </p>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="form-select mt-2 block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6 transition"
            >
              <option>Auto</option>
              <option>WebP</option>
              <option>AVIF</option>
              <option>JPG</option>
              <option>PNG</option>
            </select>
          </div>
          <div>
            <p className="block text-sm font-medium leading-6 text-slate-900">
              Quality
            </p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {["Eco", "Good", "Best", "Auto"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setQuality(opt)}
                  className={`text-xs font-medium text-slate-600 rounded-md py-1.5 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition ${
                    quality === opt ? "ring-2 ring-cyan-500" : "bg-slate-100"
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
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="form-input mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6 transition"
                />
              </div>
              <div>
                <p className="block text-xs font-medium leading-6 text-slate-600">
                  Height
                </p>
                <input
                  type="number"
                  placeholder="e.g., 768"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="form-input mt-1 block w-full rounded-md border-0 py-1 pl-3 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6 transition"
                />
              </div>
            </div>
            <div>
              <p className="block text-xs font-medium leading-6 text-slate-600">
                Crop Mode
              </p>
              <select
                value={cropMode}
                onChange={(e) => setCropMode(e.target.value)}
                className="form-select mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6 transition"
              >
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
                  type="checkbox"
                  checked={autoCrop}
                  onChange={() => setAutoCrop(!autoCrop)}
                  className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-600"
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
                  type="checkbox"
                  checked={dpr}
                  onChange={() => setDpr(!dpr)}
                  className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label className="font-medium text-slate-900">
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
                  id="chromaSub"
                  type="checkbox"
                  checked={chromaSub}
                  onChange={() => setChromaSub(!chromaSub)}
                  className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label className="font-medium text-slate-900">
                  Chroma Subsampling
                </label>
                <p className="text-slate-500">
                  Reduces color information for smaller file sizes.
                </p>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={!selectedImage || isLoading}
              className="flex w-full justify-center items-center gap-2 rounded-md px-4 py-3 text-sm font-bold shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 bg-cyan-700 text-white hover:bg-cyan-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                "Optimize"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
