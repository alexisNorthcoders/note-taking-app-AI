"use client"

import { Notes } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import AddEditNoteDialog from "./AddEditNoteDialog";

interface NoteProps{
    note: Notes
}

export default function Note({note}:NoteProps){
    
    const [showEditDialog,setShowEditDialog] = useState(false)
    const wasUpdated = new Date(note.updatedAt) > new Date(note.createdAt)

    const createdUpdatedAtTimestamp = (
        wasUpdated ? new Date(note.updatedAt) : new Date(note.createdAt)
    ).toDateString()

    return (
        <>
        <Card className="cursor-pointer transition-shadow hover:shadow-lg" onClick={() => setShowEditDialog(true)}>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>
                    {createdUpdatedAtTimestamp}
                    {wasUpdated&& " (updated)"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-line">
                    {note.content}
                </p>
            </CardContent>
        </Card>
        <AddEditNoteDialog open={showEditDialog} setOpen={setShowEditDialog} noteToEdit={note}/>
        </>
    )

}