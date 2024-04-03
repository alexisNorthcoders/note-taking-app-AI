import prisma from "@/lib/db/prisma"
import { auth } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Chat AI - Your Notes"
}

export default async function NotesPage(){
    const {userId} = auth()

    if (!userId) throw Error("userId undefined")

    const allNotes = await prisma.notes.findMany({where: {userId}})


    return <div>{JSON.stringify(allNotes)}</div>
}