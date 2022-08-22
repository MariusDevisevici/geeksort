import { useState, useEffect } from "react";
import { trpc } from "../utils/trpc";
import { signOut, getSession } from "next-auth/react";
import Nav from "../../components/Nav";
type userType = {
  id: string;
  name: string;
  email: string;
  image: string;
};
function Books({ user }: { user: userType }) {
  const [userPosts, setUserPosts] = useState<any>();
  const [books, setBooks] = useState<any>();
  const { data, status, isLoading } = trpc.useQuery([
    "getUserPosts",
    {
      userId: user.id,
    },
  ]);

  if (isLoading) {
    return <>loading...</>;
  }

  return <div className="flex"></div>;
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
