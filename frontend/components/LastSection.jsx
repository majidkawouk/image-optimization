"use client";
import Link from "next/link";
export default function LastSection() {
  return (
    <div className=" flex  items-center flex-col justify-center w-full py-10 mt-20 min-h-[300px] space-y-2">
      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-slate-900">
        Ready to Optimize Your Images?
      </h2>
      <h2 className="text-center text-gray-500 font-semibold">
        {" "}
        Give our tool a try and see the difference it makes. No registration
        required for single image optimization.
      </h2>
      <Link className="bg-cyan-500 font-semibold  text-white px-4 py-2 hover:cursor-pointer rounded-lg mt-6" href="/editor">
        Start Optimizing Now
      </Link>
    </div>
  );
}
