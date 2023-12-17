import { getChannels } from "@/apis/channels";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@/router";
import { groupBy } from "lodash-es";
import {
  ChevronDown,
  Grip,
  Headphones,
  Home,
  Mic,
  Plus,
  Users,
} from "lucide-react";
import { useQuery } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";
import SettingModal from "./_components/SettingModal";
import EventsModal from "./_components/EventsModal";
import { getOrg } from "@/apis/orgs";

export default function Component() {
  const { channelID, orgID } = useParams("/channels/:orgID/:channelID");
  const navigate = useNavigate();

  const navigateToChannel = (id: string) => {
    navigate(`/channels/${orgID}/${id}`);
  };

  const { data: channelsData } = useQuery(["channels", orgID], () =>
    getChannels(orgID),
  );

  const { data: orgData } = useQuery(["orgs", orgID], () => getOrg(orgID));

  const channels = channelsData?.data;

  console.log(orgData?.data);
  return (
    <div className="w-full flex">
      <div className="relative bg-primary-foreground/10 text-primary-foreground 0 w-[16rem] flex flex-col">
        <div className="border-b h-14 border-primary-foreground/10 p-3 flex items-center justify-between">
          <div className="flex gap-2 text-2xl items-center">
            <Home />
            <h1 className="font-bold"> Enouvo </h1>
          </div>
          <ChevronDown />
        </div>
        <div className="h-3/4 overflow-scroll">
          <div className="text-xl text-primary-foreground/60 pl-2 pt-2">
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
              className="px-3 py-2 flex gap-2 w-full hover:bg-primary-foreground/20"
            >
              <Users />
              <p> Members </p>
            </Link>
          </div>
          <div className="px-2 text-primary-foreground/60">
            <hr className="h-2 my-4 border-primary-foreground/60" />
            {Object.entries(groupBy(channels, "category.name"))?.map(
              ([category, channels]) => (
                <div key={category}>
                  <div className="flex gap-2 justify-between">
                    <div className="flex gap-2">
                      <ChevronDown className="w-4" />
                      <h1 className="uppercase"> {category} </h1>
                    </div>
                    <Plus />
                  </div>
                  <div className="py-4 space-y-2">
                    {channels.map((channel) => (
                      <div
                        className={cn("px-6 py-3 cursor-pointer", {
                          "bg-primary-foreground/20 text-primary-foreground/80":
                            channel.id === channelID,
                        })}
                        key={channel.id}
                        onClick={() => navigateToChannel(channel.id)}
                      >
                        {channel.name}
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
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
