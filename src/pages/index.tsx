import { useState, useEffect, forwardRef } from "react";
import { getSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal";
import { trpc } from "../utils/trpc";
import MainePageList from "../../components/Lists/MainePageList";

type userType = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const Home = ({ user }: { user: userType }) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const stsarr = ["On Progress", "Want to Try", "Complete"];
  const [userPosts, setUserPosts] = useState<any>([]);
  return (
    <div className="flex flex-col w-full">
      <div className="lg:flex  px-5  justify-between w-full gap-4 md:px-5 xl:px-28">
        {user &&
          stsarr.map((el, i) => {
            return (
              <MainePageList
                userPosts={userPosts}
                user={user}
                key={i}
                statusUp={el}
                setIsOpen={setIsOpen}
                setUserPosts={setUserPosts}
              ></MainePageList>
            );
          })}
      </div>

      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        open modal
      </button>
      <AnimatePresence>
        {isOpen && (
          <Modal
            setUserPosts={setUserPosts}
            setIsOpen={setIsOpen}
            userId={user.id || ""}
          ></Modal>
        )}
      </AnimatePresence>
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
