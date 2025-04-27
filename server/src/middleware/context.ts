import { randomUUIDv7 } from "bun";
import { MiddlewareHandler } from "hono";

export const generateId = (): MiddlewareHandler => {
  return async (c, next) => {
    const id = randomUUIDv7();
    c.set("requestId", id);
    console.log("generateId", id);
    await next();
  };
};

export const log = (): MiddlewareHandler => {
  return async (c, next) => {
    const requestId = c.get("requestId");
    console.log("log", requestId);
    await next();
  };
};
