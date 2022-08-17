import type { NextPage } from "next";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";
import { trpc } from "../utils/trpc";
import { motion } from "framer-motion";
import Modal from "../../components/Modal";

const Home: NextPage = () => {
  ////
  const session = useSession();
  const router = useRouter();
  const createPost = trpc.useMutation("createPost");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  ////

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
      <div className="container m-auto  ">
        <div className="flex  items-center flex-wrap justify-center mt-10 gap-4">
          <button
            className="text-2xl  font-black shadow-brutalShadow border-2 p-2 border-black  bg-lime-400 cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
          <ProfileCard imageUrl={userAvatar} userName={userName}></ProfileCard>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          as
        </button>
        {isOpen && <Modal setIsOpen={setIsOpen}></Modal>}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </button>
    </>
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
