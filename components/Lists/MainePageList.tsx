import { useRouter } from "next/router";
import MainPageItem from "./MainPageItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
type arrayOfPostsType = {
  id: string;
  image?: string;
  title: string;
  createdAt: object;
  userId: string;
  status: string;
  rating?: number;
  category: string;
}[];

function MainePageList({
  data,
  status,
  setIsOpen,
}: {
  data: arrayOfPostsType;
  status: string;
  setIsOpen: any;
}) {
  const router = useRouter();
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
    <DndProvider backend={HTML5Backend}>
      <div
        className={`md:w-2/3  md:m-auto md:mt-10 lg:w-2/5 bg-white shadow-md mt-10 h-80 border-t-8 ${
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
                  title={item.title}
                  image={item.image}
                  category={item.category}
                ></MainPageItem>
              );
            }
          })}
      </div>
    </DndProvider>
  );
}

export default MainePageList;
