import { useState, useEffect } from "react";
import { signOut, getSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal";
import Nav from "../../components/Nav";
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
  const [userPosts, setUserPosts] = useState<any>([]);
  const [inProgressPosts, setInProgressPosts] = useState<any>([]);
  const [wantToTryPosts, setWantToTryPosts] = useState<any>([]);
  const [completePosts, setCompletePosts] = useState<any>([]);
  const { data, isLoading, status } = trpc.useQuery([
    "getUserPosts",
    { userId: user.id },
  ]);

  const stsarr = ["On Progress", "Want to Try", "Complete"];
  useEffect(() => {
    if (status === "success" && !isLoading && data) {
      setUserPosts(data);
    }

    return;
  }, [status]);
  return (
    <div className="flex flex-col w-full">
      <div className="lg:flex  px-5  justify-between w-full gap-4 md:px-5 xl:px-20">
        {status === "success" &&
          !isLoading &&
          data &&
          stsarr.map((el, i) => {
            return (
              <MainePageList
                key={i}
                data={userPosts.filter((item: any) => item.status === el)}
                status={el}
                setIsOpen={setIsOpen}
              ></MainePageList>
            );
          })}
        {status === "loading" && <>Loading...</>}
        {status === "error" && <>Error</>}
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
