import { Context } from "hono";

export const errorFilter = async (error: Error, c: Context) => {
  return c.json(
    {
      status: 500,
      message: error.message,
    },
    500
  );
};
