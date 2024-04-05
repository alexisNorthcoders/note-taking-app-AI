import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import { Users } from "lucide-react";

export default function ChangeUserButton() {
  
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={()=>{
              
        router.push('/sign-in'); 

      }}
    >
     
      <Users className="absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all"/>
      <span className="sr-only">Change user</span>
    </Button>
  );
}
