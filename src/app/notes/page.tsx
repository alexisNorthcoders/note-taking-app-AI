"use client";
import React, { useState, useEffect } from "react";
import Note from "@/components/Note";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from 'next/navigation';

export default function NotesPage() {
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const cookies = parseCookies();
    const parsedCookie = JSON.parse(cookies.userId);
    const userId = parsedCookie.userId

    if (!userId) {
      setIsLoading(false);
      router.push('/sign-in'); 
      return;
    }

    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/prisma/${userId}`);

        if (!response.ok) {
          throw new Error("Network error");
        }

        const { allNotes } = await response.json();

        setAllNotes(allNotes);
       
      } catch (error) {
        throw Error();
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allNotes.map((note, index) => (
        <Note note={note} key={index} />
      ))}
      {allNotes.length === 0 && (
        <div className="col-span-full text-center">
          {"Your notes are empty. Click on Add Note button to create a note"}
        </div>
      )}
    </div>
  );
}
