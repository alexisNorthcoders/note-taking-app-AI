import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Chat AI - SignUp"
}

export default function SignUpPage(){
    return <div className="flex h-screen items-center justify-center">
        <SignUp appearance={{variables: {colorPrimary:"#2C2A4A"}}}/>
    </div>
}