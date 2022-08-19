import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion";
import Modal from "../../components/Modal";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import { NextPage } from "next";

const Home: NextPage = () => {
  ////
  const session = useSession();
  const router = useRouter();
  const [userPosts, setUserPosts] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>();
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

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/homepage/signin");
    }
  }, [session.status]);

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
    const userEmail = session.data.user?.email;
    const userId = session.data.user?.id;
    return (
      <div className="flex ">
        <div className="flex flex-col bg-white items-center border-r border-gray-100  h-screen">
          <h1 className="text-4xl font-bold select-none mt-10 border-b w-full text-center pb-10 border-gray-100  ">
            Geek<span className="text-purple-600">Sort</span>
          </h1>

          <div className="flex items-center px-10 mt-10  gap-4 border-b w-full pb-10 border-gray-100 ">
            {userAvatar ? (
              <div className="w-12 h-12">
                <Image
                  src={userAvatar}
                  width={50}
                  height={50}
                  className="rounded-full"
                ></Image>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full text-center">
                {userName?.charAt(0)}
              </div>
            )}
            <div className="flex flex-col ">
              <span className="text-xl font-bold">{userName}</span>
              <span className="text-gray-400 -mt-2">{userEmail}</span>
            </div>
          </div>

          <div className="mt-5 w-full text-center">
            <ul className="flex flex-col  w-full text-2xl font-bold">
              <li className="bg-purple-100 py-10 w-full border-b-8 border-white bg-opacity-10">
                <Link href={"/Books"}>
                  <a> 📚 Books</a>
                </Link>
              </li>
              <li className="bg-purple-100 py-10 w-full border-b-8 border-white  bg-opacity-10">
                <Link href={"/Movies"}>
                  <a> 🎬 Movies</a>
                </Link>
              </li>
              <li className="bg-purple-100 py-10 w-full border-b-8 border-white  bg-opacity-10">
                <Link href={"/Games"}>
                  <a> 🎮 Games</a>
                </Link>
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              signOut();
            }}
            className="mt-auto mb-10 font-bold relative z-10 text-red-600 border-red-600 border-2 hover:text-white  transition-all duration-300 ease-in-out px-4 py-2  cursor-pointer rounded-md before:z-minusOne  before:absolute before:bg-red-600 hover:before:w-full  before:w-0   before:h-full before:top-0 before:left-0  before:transition-all before:duration-300 before:origin-left"
          >
            Sign Out
          </button>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          open modal
        </button>
        {isOpen && <Modal setIsOpen={setIsOpen} userId={userId || ""}></Modal>}
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 flex justify-center">
        <BarLoader color="purple" width={250} height={5}></BarLoader>
      </div>
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
