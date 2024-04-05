import { useState } from "react";
import ChatBox from "./ChatBox";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

export default function ChatButton(){
    const [chatBoxOpen,setChatBoxOpen] = useState(false)

    return(
        <>
        <Button onClick={() => setChatBoxOpen(true)}>
            <Bot size={20} className="mr-1"/>
            Chat
        </Button>
        <ChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)}/></>
    )
}