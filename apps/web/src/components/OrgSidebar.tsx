import { Org } from '@/lib/type';
import { cn } from '@/lib/utils';
import { useParams, useNavigate } from '@/router';
import { Plus } from 'lucide-react';


interface OrgSidebarProps {
  orgs: Org[];
}

export default function OrgSidebar({ orgs }: OrgSidebarProps) {
  const navigate = useNavigate();
  const { orgID } = useParams('/channels/:orgID/:channelID')
  return (
    <div className="space-y-4 p-4">
      {orgs.map((org) => (
        <div key={org.id}>
          <div className={cn({'fixed left-0 bg-primary-foreground/10 h-14 rounded-r w-1': org.id === orgID })} />
          <img
            onClick={() => navigate(`/channels/:orgID/:channelID`, { params: { orgID: org.id, channelID: '1' } })}
            src={org.icon}
            alt={org.name}
            className="w-14 h-14 cursor-pointer"
          />
        </div>
      ))}
      <div className="cursor-pointer rounded-full w-14 h-14 bg-primary-foreground/10 text-green-500 flex items-center justify-center">
        <Plus />
      </div>
    </div>
  );
}
