import { useEffect, useState } from "react";
import MainPageItem from "./MainPageItem";
import { useDrop } from "react-dnd";
import { trpc } from "../../src/utils/trpc";

function MainePageList({
  data,
  status,
  setIsOpen,
}: // posts,
{
  data: any;
  status: string;
  setIsOpen: any;
  // posts: any;
}) {
  const [dropZone, setDropZone] = useState<any>(status);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item: any) =>
      dragAndDrop(item.id, item.sts, item.category, item.title, item.image),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const updatePost = trpc.useMutation(["statusUpdate"]);

  useEffect(() => {
    if (isOver === true) {
      setDropZone(status);
    }
    return;
  }, [isOver]);

  const dragAndDrop = async (
    id: string,
    sts: string,
    title: string,
    category: string,
    image: string
  ) => {
    if (sts === status) return;

    updatePost.mutate({
      postId: id,
      updatedStatus: dropZone,
    });
  };

  if (data.length === 0 || !data) {
    return (
      <div
        className={`md:w-2/3  md:m-auto md:mt-10 lg:w-2/6 bg-white shadow-md mt-10 h-80 border-t-8 ${
          status === "complete"
            ? "border-green-500"
            : status === "Want to Try"
            ? "border-red-500"
            : "border-blue-500"
        } rounded-lg`}
      >
        <h1 className="text-center text-xl md:text-2xl">
          {status === "Complete"
            ? "Complete"
            : status === "Want to Try"
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
  return (
    <div
      ref={drop}
      className={`md:w-2/3  md:m-auto md:mt-10 lg:w-2/4 bg-white shadow-md mt-10  h-80 border-t-8 ${
        status === "Complete"
          ? "border-green-500"
          : status === "Want to Try"
          ? "border-red-500"
          : "border-blue-500"
      } rounded-lg`}
    >
      <h1 className="text-center text-xl md:text-2xl">
        {status === "Complete"
          ? "Complete"
          : status === "Want to Try"
          ? "Want to Try"
          : "On Progress"}
      </h1>
      {data &&
        data.map((item: any, i: number) => {
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

export default MainePageList;
