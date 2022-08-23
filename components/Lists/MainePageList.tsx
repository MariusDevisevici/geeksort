import { useState } from "react";

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
  if (data.length === 0 || !data) {
    return (
      <div
        className={`md:w-2/3 md:m-auto md:mt-10 lg:w-2/6 bg-white shadow-md mt-10 h-80 border-t-8 ${
          status === "complete"
            ? "border-green-500"
            : status === "try"
            ? "border-red-500"
            : "border-blue-500"
        } rounded-lg`}
      >
        <h1 className="text-center text-xl md:text-2xl">
          {status === "complete"
            ? "Complete"
            : status === "try"
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
      className={`w-2/6 bg-white shadow-md mt-10 h-80 border-t-8 ${
        status === "complete"
          ? "border-green-500"
          : status === "try"
          ? "border-red-500"
          : "border-blue-500"
      } rounded-lg`}
    >
      <h1 className="text-center text-xl md:text-2xl">
        {status === "complete"
          ? "Complete"
          : status === "try"
          ? "Want to Try"
          : "On Progress"}
      </h1>
    </div>
  );
}

export default MainePageList;
