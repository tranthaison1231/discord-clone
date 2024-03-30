import { deleteFriend, type Friend } from "@/apis/friends";
import { Input } from "@/components/ui/input";
import useGetMeQuery from "@/hooks/useGetMeQuery";
import { useQueryClient } from "@tanstack/react-query";
import { X, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PendingProps {
  friends: Friend[];
}

export default function Pending({ friends }: PendingProps) {
  const { data: me } = useGetMeQuery();
  const queryClient = useQueryClient();
  const handleDeleteFriend = async (id: string) => {
    await deleteFriend(id);
    queryClient.invalidateQueries({
      queryKey: ["friends"],
    });
  };
  return (
    <div className="ml-8">
      <Input placeholder="Search" />
      <p className="py-4 border-b-2 border-gray-500">
        Pending - {friends.length}
      </p>
      {friends?.map((friend) => {
        const isMeSendRequest = me.id === friend.user.id;
        return (
          <div
            key={friend.id}
            className=" flex justify-between px-2 py-4 group hover:bg-gray-500"
          >
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
            <div className="flex gap-2">
              {!isMeSendRequest && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Check className="p-2 w-10 h-10 bg-gray-800 rounded-full cursor-pointer hover:text-green-500 hover:bg-gray-900 " />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Accecpt</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <X
                      onClick={() => handleDeleteFriend(friend?.id)}
                      className="p-2 w-10 h-10 bg-gray-800 rounded-full cursor-pointer hover:text-red-500 hover:bg-gray-900 "
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ignore</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        );
      })}
    </div>
  );
}
