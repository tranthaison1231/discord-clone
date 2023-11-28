import { serve } from "@hono/node-server";
import app from "./src/app";

serve(app, () => {
  console.log("Server is running on http://localhost:3000");
});
