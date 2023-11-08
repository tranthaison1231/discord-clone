import { useParams } from "@/router";

export default function Channel() {
  const { channelID } = useParams('/orgs/:orgID/channels/:channelID')
  return <div className='p-4'>{channelID}</div>;
}
