import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

function Nav({
  userAvatar,
  userName,
  userEmail,
  signOut,
}: {
  userAvatar: any;
  userName: any;
  userEmail: any;
  signOut: any;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-white items-center border-r border-gray-100  md:h-screen ">
      <h1 className="text-2xl lg:text-4xl font-bold select-none mt-10 border-b w-full text-center pb-10 border-gray-100  ">
        Geek<span className="text-purple-600">Sort</span>
      </h1>

      <div className="flex items-center px-4 md:px-6 lg:px-10 mt-10  gap-4 border-b w-full pb-10 border-gray-100 ">
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
          <li
            className={
              router.pathname === "/"
                ? "bg-purple-200 py-10 w-full border-b-8 text-purple-600 border-white bg-opacity-10"
                : "bg-purple-100 py-10 w-full border-b-8 border-white bg-opacity-10"
            }
          >
            <Link href={"/"}>
              <a> 🏠 Home</a>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/Books"
                ? "bg-purple-200 py-10 w-full border-b-8 text-purple-600 border-white bg-opacity-10"
                : "bg-purple-100 py-10 w-full border-b-8 border-white bg-opacity-10"
            }
          >
            <Link href={"/Books"}>
              <a> 📚 Books</a>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/Movies"
                ? "bg-purple-200 py-10 w-full border-b-8 text-purple-600 border-white bg-opacity-10"
                : "bg-purple-100 py-10 w-full border-b-8 border-white bg-opacity-10"
            }
          >
            <Link href={"/Movies"}>
              <a> 🎬 Movies</a>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/Games"
                ? "bg-purple-200 py-10 w-full border-b-8 text-purple-600 border-white bg-opacity-10"
                : "bg-purple-100 py-10 w-full border-b-8 border-white bg-opacity-10"
            }
          >
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
  );
}

export default Nav;
