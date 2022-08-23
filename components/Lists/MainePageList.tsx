import Image from "next/image";
import { useRouter } from "next/router";

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
              <div
                className={`flex items-center justify-around my-4 bg-gray-50 px-4 py-2 font-bold cursor-pointer`}
                key={i}
                onClick={() => {
                  router.push(`/${item.category}`);
                }}
              >
                <span className="text-ellipsis w-2/6 whitespace-nowrap overflow-hidden">
                  {item.title}
                </span>
                <span
                  className={
                    item.category === "Books"
                      ? "text-amber-500 w-2/6"
                      : item.category === "Movies"
                      ? "text-pink-600 w-2/6"
                      : "text-teal-500 w-2/6"
                  }
                >
                  {item.category}
                </span>
                {item.image ? (
                  <Image
                    className="rounded-full"
                    src={item.image}
                    width={50}
                    height={50}
                    objectFit="cover"
                  ></Image>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                )}
              </div>
            );
          }
        })}
    </div>
  );
}

export default MainePageList;
