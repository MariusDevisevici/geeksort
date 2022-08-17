import { createRouter } from "./context";
import { z } from "zod";
export const Posts = createRouter().mutation("createPost", {
  input: z
    .object({
      userId: z.string(),
      rating: z.number(),
      title: z.string(),
      image: z.string().nullish(),
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
        },
      });
    }
    return input;
  },
});
