import { request } from "@/lib/request";
import * as z from "zod";

export enum FriendStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export const friendSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.nativeEnum(FriendStatus),
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    fullName: z.string().nullable(),
  }),
  userOf: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    fullName: z.string().nullable(),
  }),
});

export type Friend = z.infer<typeof friendSchema>;

export const getFriends = async () => {
  const res = await request.get(`/friends`);
  return friendSchema.array().parse(res.data.data);
};

export const deleteFriend = async (id: string) => {
  const res = await request.delete(`/friends/${id}`);
  return res;
}
export const addFriend = async(username:string ) => {
  return await request.post(`/friends` , {username:username}) ;
}