import Editor from "@/components/Editor";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="w-full">
     <Header/>
     <main className="flex flex-col w-full">
       <Editor/>
     </main>
    </div>
  );
}
