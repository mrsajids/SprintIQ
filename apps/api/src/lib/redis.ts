import redis from "redis";

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  RESP: 2,
  socket: {
    reconnectStrategy: false,
  },
});

client.on("error", (error) => {
  if (client.isOpen) {
    console.error("Redis error:", error);
  }
});

export async function connectRedis() {
  try {
    if (!client.isOpen) {
      await client.connect();
    }

    console.log("[startup] Redis: connected");
  } catch (error) {
    console.error(
      "[startup] Redis: failed",
      error instanceof Error ? error.message : error
    );

    throw error;
  }
}

export default client;