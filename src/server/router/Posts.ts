import { createRouter } from "./context";
import { z } from "zod";
import { resolve } from "path";
export const Posts = createRouter()
  .mutation("createPost", {
    input: z
      .object({
        userId: z.string(),
        rating: z.number().nullish(),
        title: z.string(),
        image: z.string().nullish(),
        category: z.string(),
        status: z.string(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      if (input) {
        await ctx.prisma.item.create({
          data: {
            userId: input.userId,
            title: input.title,
            rating: input.rating,
            image: input.image,
            category: input.category,
            status: input.status,
          },
        });
      }
      return input;
    },
  })
  .query("getUserPosts", {
    input: z
      .object({
        userId: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      if (input?.userId) {
        const posts = await ctx.prisma.item.findMany({
          where: { userId: input.userId },
        });
        return posts;
      }
      return;
    },
  });
