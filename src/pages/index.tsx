import { useState } from "react";
import { signOut, getSession } from "next-auth/react";
import { motion } from "framer-motion";
import Modal from "../../components/Modal";

import Nav from "../../components/Nav";

type userType = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const Home = ({ user }: { user: userType }) => {
  const [userPosts, setUserPosts] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <div className="flex">
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        open modal
      </button>

      {isOpen && <Modal setIsOpen={setIsOpen} userId={user.id || ""}></Modal>}
    </div>
  );
};

export default Home;

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
