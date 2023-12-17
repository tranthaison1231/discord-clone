import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { BadRequestException } from "@/utils/exceptions";

export class OrgsService {
  static async getAll(userId: string, { page = 1, limit = 10, search = "" }) {
    const orgs = await db.org.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        userId: userId,
        name: {
          contains: search,
        },
      },
    });
    const total = await db.org.count({
      where: {
        userId: userId,
        name: {
          contains: search,
        },
      },
    });

    return {
      data: orgs,
      total: total,
      totalPage: Math.ceil(total / limit),
    };
  }

  static async getBy(orgId: string) {
    const org = await db.org.findFirst({
      where: {
        id: orgId,
      },
    });
    if (!org) {
      throw new BadRequestException("Org not found!");
    }

    return org;
  }

  static async create(org: Prisma.OrgCreateInput) {
    const createdOrg = await db.org.create({
      data: org,
    });

    return createdOrg;
  }
}
