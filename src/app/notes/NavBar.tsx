"use client"

import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddEditNoteDialog from "@/components/AddEditNoteDialog";
import ThemeToggleButton from "@/components/ThemeToggleButton";

import ChatButton from "@/components/ChatButton";
import ChangeUserButton from "@/components/ChangeUserButton";


export default function NavBar() {

  
    const [showAddEditNoteDialog,setShowAddEditNoteDialog] = useState(false)
  return (
    <>
    <div className="p-4 shadow">
      <div className="item-center m-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <Link href="/notes" className="flex items-center gap-1">
          <Image src={logo} alt="chat logo" width={40} height={40} />
          <span className="font-bold">Notes AI</span>
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
        <ThemeToggleButton/>
           <ChangeUserButton/>
          
            <Button onClick={() => setShowAddEditNoteDialog(true)}>
                <Plus size={15} className="mr-2"/>
                Note
            </Button>
            <ChatButton/>
        </div>
      </div>
    </div>
    <AddEditNoteDialog open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog}/>
    </>
  );
}
