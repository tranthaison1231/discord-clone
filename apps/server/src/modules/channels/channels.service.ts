import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const ChannelsService = {
  async getAllBy(orgId: string) {
    const channels = await db.channel.findMany({
      where: {
        orgId: orgId,
      },
    });

    return channels;
  },
  async create(orgId: string, createChannelDto: Prisma.ChannelCreateInput) {
    const channel = await db.channel.create({
      data: {
        orgId,
        ...createChannelDto,
      },
    });

    return channel;
  },
  async getBy(channelId: string) {
    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
      },
      include: {
        members: true,
      },
    });

    return channel;
  },
};
