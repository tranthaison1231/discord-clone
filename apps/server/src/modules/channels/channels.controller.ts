import { Hono } from "hono";
import { ChannelsService } from "./channels.service";

export const router = new Hono();

router.get("/:channelId", async (c) => {
  const channelId = c.req.param("channelId");
  const channel = await ChannelsService.getBy(channelId);

  return c.json({
    data: channel,
    status: 200,
  });
});
// .delete("/:channelId", async (c) => {}
// .post("/:channelId/members", (c) => {}
// .get("/:channelId/messages", )
//
