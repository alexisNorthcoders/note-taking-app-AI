import Image from "next/image";
import logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default function Home() {
  const {userId} = auth()

  if(userId) redirect("/notes")

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-5">
     <div className="flex items-center gap-4">
    <Image src={logo} alt="chat logo" width={100} height={100}/>
    <span className="font-extrabold tracking-tight text-4xl lg:text-5xl">Chat AI</span>
     </div>
     <p className="text-center max-w-prose">
      Chat AI Assistant built in Next.js, with TailwindCSS, TypeScript, Zod, OpenAI, Pinecone, Shadcn UI, Clerk, MongoDB and Langchain 
     </p>
     <Button size="lg" asChild>
      <Link href="/notes">Open</Link>
      </Button>
    </main>
  );
}
