import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion";
import Modal from "../../components/Modal";
import { trpc } from "../utils/trpc";
import DefaultPostsLists from "../../components/Lists/DefaultPostsLists";

const Home: NextPage = () => {
  ////
  const session = useSession();
  const router = useRouter();
  const [userPosts, setUserPosts] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  ////

  const { data, status, isLoading } = trpc.useQuery([
    "getUserPosts",
    {
      userId: session.data?.user?.id,
    },
  ]);

  useEffect(() => {
    if (status === "success") {
      setUserPosts(data);
    }
  }, [isLoading]);

  if (session.status === "loading") {
    return (
      <div className="mt-10 flex justify-center">
        <BarLoader color="purple" width={250} height={5}></BarLoader>
      </div>
    );
  }

  if (session.status === "authenticated") {
    const userAvatar = session.data.user?.image;
    const userName = session.data.user?.name;
    return (
      <div className="container m-auto flex flex-col ">
        <div className="flex  items-center flex-wrap justify-center mt-10 gap-4 border-2 p-3 shadow-brutalShadow border-black">
          <button
            className="text-2xl  font-black shadow-brutalShadow border-2 p-2 border-black  bg-red-400   cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
          <ProfileCard imageUrl={userAvatar} userName={userName}></ProfileCard>
        </div>
        <button
          className="px-6 py-2 text-6xl font-black   shadow-brutalShadow border-2 border-black     bg-lime-300  mx-auto mt-10  hover:rotate-6 transition-all ease-in-out duration-300"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          +
        </button>

        {userPosts ? (
          <DefaultPostsLists userPosts={userPosts}></DefaultPostsLists>
        ) : (
          <BarLoader color="purple"></BarLoader>
        )}

        {isOpen && (
          <Modal
            userId={session.data.user?.id || ""}
            setIsOpen={setIsOpen}
          ></Modal>
        )}
      </div>
    );
  }

  return (
    <div className="relative ">
      <div className="container m-auto">
        <div className="absolute left-0 top-0 h-16 w-16">
          <div className="absolute transform -rotate-45 bg-red-500 text-center text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
            Beta Alpha +-
          </div>
        </div>
        <nav>
          <ul className="flex w-full">
            <li className="bg-neutral-900 px-20 text-teal-400 flex justify-center items-center text-center text-4xl font-bold select-none">
              GEESKORT
            </li>
            <li className="ml-auto">
              <button
                className="p-5 bg-teal-400 shadow-brutalShadow border-2 border-black  text-2xl font-black  mt-10 hover:scale-110 ease-in-out transition-all duration-300"
                onClick={() => {
                  signIn();
                }}
              >
                Sign In
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;

/////PROFILE CARD

export const ProfileCard = ({
  imageUrl,
  userName,
}: {
  imageUrl: any;
  userName: any;
}) => {
  return (
    <div className="flex flex-wrap md:ml-auto  w-fit items-center justify-center gap-4 text-center ">
      <h1 className="font-black text-2xl">Hi {userName}</h1>
      <Image
        src={imageUrl}
        width={"60px"}
        height={"60px"}
        className="rounded-full"
      ></Image>
    </div>
  );
};
