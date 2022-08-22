import { getSession } from "next-auth/react";
import React from "react";

function Games() {
  return <div>Games</div>;
}

export default Games;
export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/homepage/signin",
        permanent: false,
      },
    };
  }
  const { user } = session;

  return {
    props: { user },
  };
}
