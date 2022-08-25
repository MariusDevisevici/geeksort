import { useEffect, useState } from "react";
import MainPageItem from "./MainPageItem";
import { useDrop } from "react-dnd";
import { trpc } from "../../src/utils/trpc";

type userType = {
  id: string;
  name: string;
  email: string;
  image: string;
};

function MainePageList({
  statusUp,
  setIsOpen,
  setUserPosts,
  user,
  userPosts,
}: {
  statusUp: string;
  setIsOpen: any;
  user: userType;
  setUserPosts: any;
  userPosts: any;
}) {
  const [dropZone, setDropZone] = useState<any>(statusUp);
  const [test, setTest] = useState(false);

  const { data, isLoading, status } = trpc.useQuery([
    "getUserPosts",
    { userId: user.id },
  ]);
  const updatePost = trpc.useMutation(["statusUpdate"]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item: any) =>
      dragAndDrop(item.id, item.sts, item.title, item.category, item.image),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dragAndDrop = async (
    id: string,
    sts: string,
    title: string,
    category: string,
    image: string
  ) => {
    if (sts === statusUp) return;

    updatePost.mutate({
      postId: id,
      updatedStatus: dropZone,
    });
    setUserPosts((prev: any) => [
      ...prev.filter((el: any) => el.id !== id),
      {
        id,
        status: dropZone,
        title,
        category,
        image,
      },
    ]);
  };

  ////effects
  useEffect(() => {
    if (isOver === true) {
      setDropZone(statusUp);
    }
    return;
  }, [isOver]);

  useEffect(() => {
    if (status === "success") {
      setUserPosts(data);
    }
  }, [status]);

  useEffect(() => {
    if (userPosts.length > 0) {
      console.log("test");
      setTest(true);
    }
  }, [userPosts]);

  if (isLoading) {
    return <>Loading..</>;
  }

  if (test) {
    return (
      <div
        ref={drop}
        className={`md:w-2/3  md:m-auto md:mt-10 lg:w-2/4 bg-white shadow-md mt-10  h-80 border-t-8 ${
          statusUp === "Complete"
            ? "border-green-500"
            : statusUp === "Want to Try"
            ? "border-red-500"
            : "border-blue-500"
        } rounded-lg`}
      >
        <h1 className="text-center text-xl md:text-2xl">
          {statusUp === "Complete"
            ? "Complete"
            : statusUp === "Want to Try"
            ? "Want to Try"
            : "On Progress"}
        </h1>
        {userPosts
          .filter((el: any) => el.status === statusUp)
          .sort(
            (objA: any, objB: any) =>
              Number(objB.updatedAt) - Number(objA.updatedAt)
          )
          .map((item: any, i: number) => {
            if (i < 3) {
              return (
                <MainPageItem
                  status={item.status}
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  category={item.category}
                ></MainPageItem>
              );
            }
          })}
      </div>
    );
  }

  return (
    <div
      className={`md:w-2/3  md:m-auto md:mt-10 lg:w-2/6 bg-white shadow-md mt-10 h-80 border-t-8 ${
        statusUp === "complete"
          ? "border-green-500"
          : statusUp === "Want to Try"
          ? "border-red-500"
          : "border-blue-500"
      } rounded-lg`}
    >
      <h1 className="text-center text-xl md:text-2xl">
        {statusUp === "Complete"
          ? "Complete"
          : statusUp === "Want to Try"
          ? "Want to Try"
          : "On Progress"}
      </h1>
      <button
        className="flex gap-2 w-fit mx-auto mt-20 font-bold  md:text-xl"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span className="border rounded-full w-6 h-6 flex justify-center items-center border-purple-600 text-purple-600 font-bold">
          +
        </span>
        Add
      </button>
    </div>
  );
}

export default MainePageList;
