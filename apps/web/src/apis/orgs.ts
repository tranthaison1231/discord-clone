import { request } from "@/lib/request";
import * as z from "zod";

const orgSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
});

export const getOrgs = async () => {
  const res = await request.get("/orgs");
  return orgSchema.array().parse(res.data.data);
};

const memberSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  username: z.string(),
  avatar: z.string(),
  memberSince: z.string(),
  joinedDiscord: z.string(),
  joinMethod: z.string(),
  roles: z.array(z.string()),
});

export const getOrgMembers = async (orgID: string) => {
  const rest = await request.get(`/orgs/${orgID}/members`);
  return memberSchema.array().parse(rest.data);
};

export const getOrg = async (orgID: string) => {
  const res = await request.get(`/orgs/${orgID}`);
  return orgSchema.parse(res.data);
};
