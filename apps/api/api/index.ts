import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { router as auth } from "../modules/auth/auth.controller";
import { router as orgs } from "../modules/orgs/orgs.controller";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["*"],
    credentials: true,
    allowHeaders: [
      "Content-Type",
      "Content-Length",
      "Accept-Encoding",
      "X-CSRF-Token",
      "Authorization",
      "accept",
      "origin",
      "Cache-Control",
      "X-Requested-With",
    ],
  })
);
app.route("/", auth);
app.route("/orgs", orgs);

export default handle(app);
