import { useState, useEffect } from "react";
import { trpc } from "../utils/trpc";
import { getSession } from "next-auth/react";
import List from "../../components/Lists/List";

type userType = {
  id: string;
  name: string;
  email: string;
  image: string;
};
function Books({ user }: { user: userType }) {
  const { data, isLoading } = trpc.useQuery(["getBooks", { userId: user.id }]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <div className="">{data && <List data={data}></List>}</div>;
}

export default Books;
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
