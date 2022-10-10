import { useState } from "react";
import { trpc } from "../../src/utils/trpc";
function DisplayUsers({ user }: { user: string }) {
  const test = trpc.useQuery([
    "getOnlineUsers",
    {
      userId: user,
    },
  ]);
  console.log(test.data);

  return <div>asad</div>;
}

export default DisplayUsers;
