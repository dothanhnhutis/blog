import { User } from "@/schema/user";
import { redisClient } from "./connection";

export async function getUserCacheById(userId: string) {
  try {
    const userCache = await redisClient.get(`user:${userId}`);
    if (!userCache) return;
    const user = JSON.parse(userCache) as User;
    return user;
  } catch (error) {
    console.log(`getUserCacheById() method error: `, error);
    return;
  }
}

export async function getUserCacheByEmail(email: string) {
  try {
    const userCache = await redisClient.get(`user:*:${email}`);
    if (!userCache) return;
    const user = JSON.parse(userCache) as User;
    return user;
  } catch (error) {
    console.log(`getUserCacheByEmail() method error: `, error);
    return;
  }
}

export async function setUserCache(user: User) {
  try {
    await redisClient.set(
      `user:${user.id}:${user.email}`,
      JSON.stringify(user)
    );
  } catch (error) {
    console.log(`setUserCache() method error: `, error);
  }
}
