"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useUserContext } from "@/context/UserContext";
import { setCookie ,parseCookies} from 'nookies';

interface User {
  username: string;
  password: string;
  userId: string;
  imageUrl: string;
}

const templateUsers: User[] = [
  {
    username: "John",
    password: "password1",
    userId: "1",
    imageUrl: "/assets/avatar1.jpeg",
  },
  {
    username: "Alice",
    password: "password2",
    userId: "2",
    imageUrl: "/assets/avatar2.jpeg",
  },
  {
    username: "Arthur",
    password: "password3",
    userId: "3",
    imageUrl: "/assets/avatar3.jpeg",
  },
  {
    username: "Jane",
    password: "password4",
    userId: "4",
    imageUrl: "/assets/avatar4.jpeg",
  },
];


const SignInPage: React.FC = () => {
    const router = useRouter();
    const { user,setUser } = useUserContext();
    const handleUserSelection = (newUser:User) => {
        try {
          setUser(newUser);
          setCookie(null, 'userId', JSON.stringify(newUser), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
          router.refresh()
          router.push('/notes'); 
            
            
        } catch (error) {
            console.error('Failed to store user data:', error);
        }
    };

  return (
    <div className="flex h-auto flex-col items-center justify-start mt-10">
      <span className="text-xl font-bold">Choose template user:</span>
      <ul>
        {templateUsers.map((user) => (
          <button className="hover:shadow-lg mx-1 border rounded-sm my-1"key={user.userId} onClick={() => handleUserSelection(user)}>
            {user.username}
            <Image
              src={user.imageUrl}
              alt="user avatar image"
              width={80}
              height={80}
              className="mx-2 h-15 w-15 rounded-full object-cover"
            />
          </button>
        ))}
      </ul>
    </div>
  );
};

export default SignInPage;
