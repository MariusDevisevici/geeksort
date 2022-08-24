import Image from "next/image";
import {} from "react";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
function MainPageItem({
  image,
  id,
  category,
  title,
  status,
}: {
  image: string;
  category: string;
  title: string;
  id: string;
  status: string;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {
      id: id,
      sts: status,
      category: category,
      title: title,
      image: image,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <motion.div
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
    </motion.div>
  );
}

export default MainPageItem;
