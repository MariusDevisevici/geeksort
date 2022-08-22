import { getSession } from "next-auth/react";
import React from "react";

function Movies() {
  return <div>Movies</div>;
}

export default Movies;
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
