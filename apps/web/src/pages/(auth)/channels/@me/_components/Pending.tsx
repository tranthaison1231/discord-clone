import { type Friend } from "@/apis/friends";
import { Input } from "@/components/ui/input";

interface PendingProps {
  friends: Friend[];
}

export default function Pending({ friends }: PendingProps) {
  return (
    <div className="ml-8">
      <Input placeholder="Search" />
      <p className="py-4 border-b-2 border-gray-500">
        {" "}
        Pending - {friends.length}
      </p>
      {friends?.map((friend) => (
        <div key={friend.id}>
          <p>{friend.user.username}</p>
        </div>
      ))}
    </div>
  );
}
