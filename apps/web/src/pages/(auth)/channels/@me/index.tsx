import { FriendStatus, getFriends } from "@/apis/friends";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import Pending from "./_components/Pending";

export default function Me() {
  const friendsQuery = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(),
  });

  const pendingFriends = friendsQuery.data?.filter(
    (friend) => friend.status === FriendStatus.PENDING,
  );
  const friends = friendsQuery.data?.filter(
    (friend) => friend.status === FriendStatus.ACCEPTED,
  );

  return (
    <div className="w-full bg-primary-foreground/10">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex mx-4 py-2 gap-4">
          <div className="flex items-center pr-4 gap-2 border-r-2 border-gray-500">
            <User />
            Friends
          </div>
          <TabsList className="flex w-fit">
            <TabsTrigger className="w-fit" value="online">
              Online
            </TabsTrigger>
            <TabsTrigger className="w-fit" value="all">
              All
            </TabsTrigger>
            <TabsTrigger value="pending" className="w-fit">
              Pending
            </TabsTrigger>
            <TabsTrigger value="blocked" className="w-fit">
              Blocked
            </TabsTrigger>
          </TabsList>
          <Button variant="success">Add Friend</Button>
        </div>
        <TabsContent value="all">
          {friends?.map((friend) => (
            <div key={friend.id}>
              <p>{friend.user.username}</p>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="pending">
          <Pending friends={pendingFriends ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
