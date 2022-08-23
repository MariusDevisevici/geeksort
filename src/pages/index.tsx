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
  const [inProgressPosts, setInProgressPosts] = useState<any>([]);
  const [wantToTryPosts, setWantToTryPosts] = useState<any>([]);
  const [completePosts, setCompletePosts] = useState<any>([]);
  const { data, isLoading, status } = trpc.useQuery([
    "getUserPosts",
    { userId: user.id },
  ]);

  const stsarr = ["progress", "try", "complete"];
  useEffect(() => {
    if (status === "success" && !isLoading && data) {
      ////in progress
      const filterProgress = data.filter(
        (item) => item.status === "On Progress"
      );
      setInProgressPosts(filterProgress);

      /// want to try
      const filterWantToTry = data.filter(
        (item) => item.status === "Want to Try"
      );

      setWantToTryPosts(filterWantToTry);

      ///complete

      const filterComplete = data.filter((item) => item.status === "Complete");
      setCompletePosts(filterComplete);
    }

    return;
  }, [status]);
  return (
    <div className="flex flex-col w-full">
      <div className="lg:flex   justify-between w-full gap-4 px-5">
        {status === "success" &&
          !isLoading &&
          data &&
          stsarr.map((el, i) => {
            return (
              <MainePageList
                key={i}
                data={
                  el === "progress"
                    ? inProgressPosts
                    : el === "complete"
                    ? completePosts
                    : el === "try"
                    ? wantToTryPosts
                    : []
                }
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
        {isOpen && <Modal setIsOpen={setIsOpen} userId={user.id || ""}></Modal>}
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
