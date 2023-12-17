import { request } from "@/lib/request";

interface Channel {
  id: string;
  name: string;
}

export const getChannels = async (orgID: string) => {
  const res = await request.get<Channel[]>(`/orgs/${orgID}/channels`);
  return res.data;
};

export const getChannelMembers = async (orgID: string, channelID: string) => {
  return request.get(`/orgs/${orgID}/channels/${channelID}/members`);
};
