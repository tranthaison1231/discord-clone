import { type Friend } from "@/apis/friends";
import { Input } from "@/components/ui/input";
import useGetMeQuery from "@/hooks/useGetMeQuery";

interface PendingProps {
  friends: Friend[];
}

export default function Pending({ friends }: PendingProps) {
  const { data: me } = useGetMeQuery();
  return (
    <div className="ml-8">
      <Input placeholder="Search" />
      <p className="py-4 border-b-2 border-gray-500">
        Pending - {friends.length}
      </p>
      {friends?.map((friend) => {
        const isMeSendRequest = me.id === friend.user.id;
        return (
          <div key={friend.id} className="py-4 px-2 group hover:bg-gray-500">
            <div>
              <p>
                {isMeSendRequest
                  ? friend.userOf.fullName
                  : friend.user.fullName}
                <span className="hidden ml-4 group-hover:inline">
                  {isMeSendRequest
                    ? friend.userOf.username
                    : friend.user.username}
                </span>
              </p>
              <p>
                {isMeSendRequest
                  ? "Outgoing Friend Request"
                  : "Incoming Friend Request"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
