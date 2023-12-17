import { db } from "@/lib/db";
import { paginationSchema } from "@/utils/schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { OrgsService } from "./orgs.service";

export const router = new Hono();

router
  .get("/", zValidator("query", paginationSchema), async (c) => {
    const user = c.get("user");
    const search = c.req.query("search");
    const page = +c.req.query("page");
    const limit = +c.req.query("limit");

    const data = await OrgsService.getAll(user?.id, {
      page,
      limit,
      search,
    });

    return c.json(data);
  })
  .get("/:orgId", async (c) => {
    const orgId = c.req.param("orgId");

    const org = await OrgsService.getBy(orgId);

    return c.json(org);
  })
  .post("/", async (c) => {
    const user = c.get("user");

    const { name, icon } = await c.req.json<{ name: string; icon: string }>();

    const org = await OrgsService.create({
      userId: user.id,
      name,
      icon,
    });

    return c.json(org);
  })
  .get("/:orgId/channels", (c) =>
    c.json([
      {
        id: "1",
        name: "Class 1",
        category: {
          id: 1,
          name: "Class",
        },
      },
      {
        id: "2",
        name: "Class 2",
        category: {
          id: 1,
          name: "Class",
        },
      },
      {
        id: "3",
        name: "Class 1",
        category: {
          id: 2,
          name: "Class Audio",
        },
      },
      {
        id: "4",
        name: "Class 2",
        category: {
          id: 2,
          name: "Class Audio",
        },
      },
    ]),
  )
  .get("/:orgId/members", async (c) => {
    const orgId = c.req.param("orgId");

    const members = await db.usersOnOrgs.findMany({
      where: {
        orgId: orgId,
      },
    });

    console.log(members);

    c.json([
      {
        id: "001",
        displayName: "John Doe",
        username: "john_doe",
        avatar: "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        memberSince: "2022-01-01",
        joinedDiscord: "2022-01-01",
        joinMethod: "Discord",
        roles: ["Admin"],
      },
    ]);
  })
  .post("/:orgId/members", async (c) => {
    const orgId = c.req.param("orgId");

    const members = await db.usersOnOrgs.findMany({
      where: {
        orgId: orgId,
      },
    });

    console.log(members);

    c.json([
      {
        id: "001",
        displayName: "John Doe",
        username: "john_doe",
        avatar: "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        memberSince: "2022-01-01",
        joinedDiscord: "2022-01-01",
        joinMethod: "Discord",
        roles: ["Admin"],
      },
    ]);
  })
  .get("/:orgId/channels/:channelId/messages", (c) =>
    c.json([
      {
        id: 1,
        sender: {
          id: 1,
          name: "John Doe",
          avatar:
            "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        },
        createdAt: "2022-01-01T00:00:00.000Z",
        message: "Hey, how are you?",
      },
    ]),
  )
  .get("/:orgId/channels/:channelId/members", (c) =>
    c.json([
      {
        id: 1,
        name: "John",
        avatar: "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        roles: ["Admin", "F0"],
        backgroundColor: "#d40000",
        category: {
          id: 1,
          name: "Đà Nẵng",
        },
      },
      {
        id: 2,
        name: "Tin Nguyen",
        avatar: "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        roles: ["Học viên"],
        backgroundColor: "#d40000",
        category: {
          id: 2,
          name: "Online",
        },
      },
      {
        id: 3,
        name: "Son Tran",
        avatar: "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        roles: ["Học viên"],
        backgroundColor: "#d40000",
        category: {
          id: 2,
          name: "Online",
        },
      },
    ]),
  );
