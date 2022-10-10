import { createRouter } from "./context";
import { z } from "zod";

export const Users = createRouter().query("getOnlineUsers", {
  input: z.object({
    userId: z.string(),
  }),
  async resolve({ input, ctx }) {
    const sessions = await ctx.prisma.session.findMany({
      where: {
        NOT: { userId: input.userId },
      },
    });
    if (sessions) {
      const onlineUsers = sessions.map((user: any) => user.userId);
      return onlineUsers;
    }
    return;
  },
});
