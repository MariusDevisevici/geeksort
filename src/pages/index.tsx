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
    <div className="flex   h-screen sm:flex-nowrap flex-wrap">
      <div className="w-full flex flex-col justify-center items-center">
        <div className=" bg-white w-3/4 py-20  flex flex-col items-center text-center justify-center shadow-sm">
          <p className="text-2xl font-bold">
            <span className="text-purple-600">Hi</span> there!
          </p>
          <button
            className="font-bold relative z-10 text-purple-600 border-purple-600 border-2 hover:text-white  transition-all duration-300 ease-in-out px-4 py-2 my-5 cursor-pointer rounded-md before:z-minusOne  before:absolute before:bg-purple-600 hover:before:w-full  before:w-0   before:h-full before:top-0 before:left-0  before:transition-all before:duration-300 before:origin-left"
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </button>
          <div className="flex gap-10">
            <Image src={"/github.png"} width={30} height={30}></Image>
            <Image src={"/discord.png"} width={30} height={30}></Image>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <Image src={"/bgk.jpg"} layout="fill" objectFit="cover"></Image>
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
