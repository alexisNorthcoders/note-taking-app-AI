import Image from "next/image";
import logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";


export default function Home() {
  

 // if(userId) redirect("/notes")

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-5">
     <div className="flex items-center gap-4">
    <Image src={logo} alt="chat logo" width={100} height={100}/>
    <span className="font-extrabold tracking-tight text-4xl lg:text-5xl">Notes with AI</span>
     </div>
     <span className="text-center max-w-prose">
      Note App using AI to read and interpret the notes. Built using:
      <ul className="font-bold text-xl">
        <li>Next.js</li>
        <li>TailwindCSS</li>
        <li>TypeScript</li>
        <li>MongoDB</li>
        <li>Shadcn UI</li>
        <li>Pinecone</li>
        <li>OpenAI</li>
        </ul> 
     </span>
     <Button size="lg" asChild>
      <Link href="/notes">Open</Link>
      </Button>
    </main>
  );
}
