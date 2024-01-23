import TooltipIcon from "@/components/TooltipIcon";
import { cn } from "@/lib/utils";
import { useParams } from "@/router";
import { Frame, HelpCircle, Users2 } from "lucide-react";
import { useState } from "react";
import ChatList from "./_components/ChatList";
import MemberList from "./_components/MemberList";
import PopoverInbox from "./_components/PopoverInbox";

export default function Channel() {
  const [isHideMemberList, setIsHideMemberList] = useState(false);
  const { channelID } = useParams("/channels/:orgID/:channelID");
  return (
    <div>
      <header className="p-3 h-14 border-b bg-primary-foreground/20 text-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Frame />
          {channelID}
        </div>
        <div className="flex items-center gap-4">
          <TooltipIcon
            icon={
              <Users2
                className={cn("cursor-pointer text-gray-400 hover:text-white", {
                  "text-white": !isHideMemberList,
                })}
                onClick={() => setIsHideMemberList(!isHideMemberList)}
              />
            }
            content={isHideMemberList ? "Show member list" : "Hide member list"}
          />
          <PopoverInbox />
          <HelpCircle className="cursor-pointer text-gray-400 hover:text-white" />
        </div>
      </header>
      <div className="flex h-[calc(100vh-3.5rem)]">
        <div
          className={`${
            isHideMemberList ? "w-full" : "w-[calc(100%-16rem)]"
          } bg-primary-foreground/20 px-6`}
        >
          <ChatList />
        </div>
        {isHideMemberList ? null : (
          <div className="w-[16rem] bg-primary-foreground/10 p-4">
            <MemberList />
          </div>
        )}
      </div>
    </div>
  );
}
