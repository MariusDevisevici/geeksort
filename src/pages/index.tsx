import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";
import TestList from "../../components/Lists/TestList";
const Home: NextPage = () => {
  const session = useSession();
  const router = useRouter();

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
      <>
        <div className="flex px-20 p items-center flex-wrap justify-center mt-10 gap-4">
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
        <TestList></TestList>
      </>
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
    <div className="flex flex-wrap ml-auto  w-fit items-center justify-center gap-4 text-center">
      <h1 className="font-black text-2xl">Hi {userName}</h1>
      <Image
        src={imageUrl}
        width={"100%"}
        height={"100%"}
        className="rounded-full border"
      ></Image>
    </div>
  );
};
