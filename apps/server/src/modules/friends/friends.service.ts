import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const FriendsService = {
  async getAllBy(userId: string) {
    const friends = await db.friend.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          {
            userOfId: userId,
          },
        ],
      },
      select: {
        id: true,
        status: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
          },
        },
        userOf: {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return friends;
  },
  async sendRequest(user: User, userOf: User) {
    return await db.friend.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        userOf: {
          connect: {
            id: userOf.id,
          },
        },
      },
    });
  },
};
