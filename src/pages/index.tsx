import { useState, useEffect, forwardRef } from "react";
import { getSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal";
import { trpc } from "../utils/trpc";
import MainePageList from "../../components/Lists/MainePageList";
import DisplayUsers from "../../components/Lists/DisplayUsers";

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
    <div className="flex flex-col w-full ml-96 ">
      <DisplayUsers user={user.id}></DisplayUsers>
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
        className="mb-5 mt-10 w-fit m-auto font-bold relative z-10 text-purple-600 border-purple-600 border-2 hover:text-white  transition-all duration-300 ease-in-out px-4 py-2  cursor-pointer rounded-md before:z-minusOne  before:absolute before:bg-purple-600 hover:before:w-full  before:w-0   before:h-full before:top-0 before:left-0  before:transition-all before:duration-300 before:origin-left"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        + ADD THING
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
