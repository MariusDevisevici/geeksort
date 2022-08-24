import Image from "next/image";
import {} from "react";
import { useDrag } from "react-dnd";
function MainPageItem({
  image,
  category,
  title,
}: {
  image: string;
  category: string;
  title: string;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={`flex items-center justify-around my-4 bg-gray-50 px-4 py-2 font-bold cursor-pointer `}
    >
      <span className="text-ellipsis w-2/6 whitespace-nowrap overflow-hidden">
        {title}
      </span>
      <span
        className={
          category === "Books"
            ? "text-amber-500 w-2/6"
            : category === "Movies"
            ? "text-pink-600 w-2/6"
            : "text-teal-500 w-2/6"
        }
      >
        {category}
      </span>
      {image ? (
        <Image
          className="rounded-full"
          src={image}
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

export default MainPageItem;
