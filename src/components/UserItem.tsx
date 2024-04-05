import { redirect } from 'next/navigation';
import Image from "next/image";

interface User {
    username: string;
    password: string;
    userId:string;
    imageUrl:string
}

interface UserItemProps {
    user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
    const handleUserSelection = () => {
        try {
            localStorage.setItem('selectedUser', JSON.stringify(user));
            redirect('/notes');
        } catch (error) {
            console.error('Failed to store user data:', error);
        }
    };

    return (
        <li onClick={handleUserSelection}>
            {user.username}
             <Image
          src={user.imageUrl}
          alt="user avatar image"
          width={40}
          height={40}
          className="ml-2 h-10 w-10 rounded-full object-cover"
        />
        </li>
    );
};

export default UserItem;