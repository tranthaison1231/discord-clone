import TooltipIcon from '@/components/TooltipIcon';
import ChatList from '@/pages/orgs/[orgID]/channels/_components/ChatList';
import { useParams } from '@/router';
import { Frame, HelpCircle, Users2 } from 'lucide-react';
import MemberList from './_components/MemberList';
import { useState } from 'react';

export default function Channel() {
  const [isHideMemberList, setIsHideMemberList] = useState(false);
  const { channelID } = useParams('/orgs/:orgID/channels/:channelID');
  return (
    <div>
      <header className="p-3 h-14 border-b bg-primary/20 text-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Frame />
          {channelID}
        </div>
        <div className="flex items-center gap-4">
          <TooltipIcon
            icon={<Users2 onClick={() => setIsHideMemberList(!isHideMemberList)} />}
            content={isHideMemberList ? 'Show member list' : 'Hide member list'}
          />
          <HelpCircle className="cursor-pointer" />
        </div>
      </header>
      <div className="flex h-[calc(100vh-3.5rem)]">
        <div className={`${isHideMemberList ? 'w-full' : 'w-3/4'} bg-primary/20 px-6`}>
          <ChatList />
        </div>
        {isHideMemberList ? null : (
          <div className="w-1/4 bg-primary/10 p-4">
            <MemberList />
          </div>
        )}
      </div>
    </div>
  );
}
