import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { BadRequestException } from "@/utils/exceptions";

export const OrgsService = {
  getAll: async (userId: string, { page = 1, limit = 10, search = "" }) => {
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
  },
  getBy: async (orgId: string) => {
    const org = await db.org.findFirst({
      where: {
        id: orgId,
      },
      include: {
        categories: {
          include: {
            channels: true,
          },
        },
      },
    });
    if (!org) {
      throw new BadRequestException("Org not found!");
    }

    return org;
  },
  create: async (org: Prisma.OrgCreateInput) => {
    const createdOrg = await db.org.create({
      data: org,
    });

    return createdOrg;
  },
  getRoles: async (orgId: string) => {
    const roles = db.role.findMany({
      where: {
        orgId: orgId,
      },
    });
    return roles;
  },
  addMember: async (orgId:string , userId : string) => {
     await db.usersOnOrgs.create({
      data: {
        orgId: orgId,
        userId:userId
      },
    });
  },
  createRole: async (orgId: string, createRoleDto: Prisma.RoleCreateInput) => {
    const role = await db.role.create({
      data: {
        orgId: orgId,
        name: createRoleDto.name,
        color: createRoleDto.color,
      },
    });
    return role;
  },
};
