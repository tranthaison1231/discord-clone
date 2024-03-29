import { getChannels } from "@/apis/channels";
import { Link, useParams } from "@/router";
import { Grip, Headphones, Mic, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import SettingModal from "./_components/SettingModal";
import EventsModal from "./_components/EventsModal";
import { getOrg } from "@/apis/orgs";
import OrgMenuDropDown from "./_components/OrgMenuDropDown";
import CategorySection from "./_components/CategorySection";
import { cn } from "@/lib/utils";

export default function Component() {
  const { channelID, orgID } = useParams("/channels/:orgID/:channelID");

  const location = useLocation();

  const { data: channels } = useQuery({
    queryKey: ["channels", orgID],
    queryFn: () => getChannels(orgID),
  });

  const { data: org } = useQuery({
    queryKey: ["orgs", orgID],
    queryFn: () => getOrg(orgID),
  });

  return (
    <div className="w-full flex">
      <div className="relative bg-primary-foreground/10 text-primary-foreground 0 w-[16rem] flex flex-col">
        <OrgMenuDropDown org={org} />
        <div className="h-3/4 overflow-scroll">
          <div className="text-xl text-primary-foreground/60 p-2 pt-2">
            <EventsModal />
            <Link
              to="/channels/:orgID/channel-browser"
              params={{ orgID }}
              className="px-3 py-2 flex gap-2 w-full hover:bg-primary-foreground/20"
            >
              <Grip />
              <p> Browse Channels </p>
            </Link>
            <Link
              to="/channels/:orgID/member-safety"
              params={{ orgID }}
              state={{
                channel: channels?.find((channel) => channel.id === channelID),
              }}
              className={cn(
                "px-3 py-2 flex gap-2 w-full hover:bg-primary-foreground/20",
                {
                  "bg-primary-foreground/20":
                    location.pathname.split("/").pop() === "member-safety",
                },
              )}
            >
              <Users />
              <p> Members </p>
            </Link>
          </div>
          <div className="px-2 text-primary-foreground/60">
            <hr className="h-2 my-4 border-primary-foreground/60" />
            {org?.categories.map((category) => (
              <CategorySection category={category} key={category.id} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 p-3 flex justify-between items-center w-full">
          <div className="flex gap-2">
            <img
              src="https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg"
              width={40}
              className="rounded-full aspect-square object-cover"
            />
            <div>
              <p className="font-bold text-base">Son Tran</p>
              <p className="text-sm">sontran1711</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Mic className="cursor-pointer" />
            <Headphones className="cursor-pointer" />
            <SettingModal />
          </div>
        </div>
      </div>
      <div className="w-[calc(100%-16rem)]">
        <Outlet />
      </div>
    </div>
  );
}
