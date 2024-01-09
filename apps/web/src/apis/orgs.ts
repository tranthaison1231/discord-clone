import { request } from "@/lib/request";
import * as z from "zod";

const orgSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
});

export type Org = z.infer<typeof orgSchema>;

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
  const res = await request.get(`/orgs/${orgID}/members`);
  return memberSchema.array().parse(res.data.data);
};

export const getOrg = async (orgID: string) => {
  const res = await request.get(`/orgs/${orgID}`);
  return orgSchema
    .extend({
      categories: z.array(
        z.object({
          id: z.string(),
          isPrivate: z.boolean(),
          name: z.string(),
          channels: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              isPrivate: z.boolean(),
              type: z.string(),
            }),
          ),
        }),
      ),
    })
    .parse(res.data.data);
};
