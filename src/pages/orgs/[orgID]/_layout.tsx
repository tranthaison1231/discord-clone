import { cn } from '@/lib/utils';
import { useParams } from '@/router';
import { Calendar, ChevronDown, Grip, Home, Plus, Users } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

const HEADERS = [
  {
    id: 1,
    name: 'Events',
    icon: Calendar,
  },
  {
    id: 2,
    name: 'Browse Channels',
    icon: Grip,
  },
  {
    id: 3,
    name: 'Members',
    icon: Users,
  },
];

const CATEGORIES = [
  {
    id: 1,
    name: 'Class',
    channels: [
      {
        id: '1',
        name: 'Class 1',
      },
      {
        id: '2',
        name: 'Class 2',
      },
    ],
  },
];

export default function Org() {
  const { channelID, orgID } = useParams('/orgs/:orgID/channels/:channelID');
  const navigate = useNavigate();

  const navigateToChannel = (id: string) => {
    navigate(`/orgs/${orgID}/channels/${id}`);
  };

  return (
    <div className="w-full flex">
      <div className="bg-primary/10 w-1/5">
        <div className="border-b border-primary/10 p-3 flex items-center justify-between">
          <div className="flex gap-2 text-2xl items-center">
            <Home />
            <h1 className="font-bold"> Enouvo </h1>
          </div>
          <ChevronDown />
        </div>
        <div className="text-xl text-primary/60">
          {HEADERS.map((header) => (
            <div className="px-3 py-2 flex gap-2 cursor-pointer hover:bg-primary/20" key={header.id}>
              <header.icon />
              <p> {header.name} </p>
            </div>
          ))}
        </div>
        <div className="px-2 text-primary/60">
          <hr className="h-2 my-4 border-primary/60" />
          {CATEGORIES.map((category) => (
            <div key={category.id}>
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <ChevronDown className="w-4" />
                  <h1 className="uppercase"> {category.name} </h1>
                </div>
                <Plus />
              </div>
              <div className="py-4 space-y-2">
                {category.channels.map((channel) => (
                  <div
                    className={cn('px-6 py-3', {
                      'bg-primary/20 text-primary/80': channel.id === channelID,
                    })}
                    key={channel.id}
                    onClick={() => navigateToChannel(channel.id)}
                  >
                    {channel.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-primary/20 w-5/6">
        <Outlet />
      </div>
    </div>
  );
}
