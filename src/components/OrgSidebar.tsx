import { Org } from '@/lib/type';
import { cn } from '@/lib/utils';
import { useParams } from '@/router';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface OrgSidebarProps {
  orgs: Org[];
}

export default function OrgSidebar({ orgs }: OrgSidebarProps) {
  const navigate = useNavigate();
  const { orgID } = useParams('/orgs/:orgID/channels/:channelID')
  return (
    <div className="space-y-4 p-4">
      {orgs.map((org) => (
        <div key={org.id}>
          <div className={cn({'fixed left-0 bg-primary h-14 rounded-r w-1': org.id === orgID })} />
          <img
            onClick={() => navigate(`/orgs/${org.id}`)}
            src={org.icon}
            alt={org.name}
            className="w-14 h-14 cursor-pointer"
          />
        </div>
      ))}
      <div className="cursor-pointer rounded-full w-14 h-14 bg-primary/10 text-green-500 flex items-center justify-center">
        <Plus />
      </div>
    </div>
  );
}
