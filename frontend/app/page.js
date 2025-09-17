import Header from "@/components/Header";
import Image from "next/image";
import Hero from "@/components/Hero";
import HowSection from "@/components/HowSection";
import LastSection from "@/components/LastSection";
export default function Home() {
  return (
    <div className="w-full">
     <Header/>
     <main className="flex flex-col w-full min-h-screen">
       <Hero/>
       <HowSection/>
       <LastSection/>
     </main>
    </div>
  );
}
