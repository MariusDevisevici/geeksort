import { useState } from "react";
import { trpc } from "../src/utils/trpc";
import { motion } from "framer-motion";
function Modal({ setIsOpen, userId }: { setIsOpen: any; userId: string }) {
  const [image, setImage] = useState<any>();
  const [title, setTitle] = useState<string>();
  const [rating, setRating] = useState<number>();

  //// post && db
  const createPost = trpc.useMutation("createPost");
  const submitHandler = async () => {
    const img = new FormData();

    if (image && title && rating && userId) {
      img.append("image", image[0]);
      const cloudImage = await fetch(
        "https://api.imgbb.com/1/upload?&key=e35161a7abe965194cbe49a06165db5f",
        { method: "POST", body: img }
      )
        .then((res) => res.json())
        .then((data) => {
          return data.data.display_url;
        });
      console.log(cloudImage);
      createPost.mutate({
        title,
        rating,
        userId: userId,
        image: cloudImage,
      });

      setImage(null);
      setTitle(undefined);
      setRating(undefined);
      setIsOpen(false);
    }
    if (!image && title && rating && userId) {
      createPost.mutate({
        title,
        rating,
        userId: userId,
      });
      setImage(null);
      setTitle(undefined);
      setRating(undefined);
      setIsOpen(false);
    }
  };

  return (
    <div
      className="fixed w-full h-full  z-10 overflow-auto bg-opacity-50 bg-black top-0 left-0 flex cursor-pointer"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-2/3 flex m-auto justify-center bg-white shadow-brutalShadow border-2 border-black p-2"
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <form
          className="flex flex-col w-full p-5 items-center gap-6"
          onSubmit={(e: any) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <div className="relative w-2/3">
            <input
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
              type="text"
              id="floating_outlined"
              className="shadow-brutalShadow block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent   border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:shadow-blue-600"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Title
            </label>
          </div>
          <div className="relative w-2/3">
            <input
              onChange={(e: any) => {
                const ratingToNumber = e.target.value;
                setRating(Number(ratingToNumber));
              }}
              type="number"
              id="floating_outlined_2"
              className="shadow-brutalShadow block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent   border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:shadow-blue-600"
              placeholder=" "
              min="1"
              max="10"
            />
            <label
              htmlFor="floating_outlined_2"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Rating
            </label>
          </div>
          <div className="relative w-2/3">
            <input
              onChange={(e) => {
                setImage(e.target.files);
              }}
              type="file"
              id="floating_outlined_2"
              className="shadow-brutalShadow block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent   border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:shadow-blue-600"
              placeholder=" "
              min="1"
              max="10"
            />
            <label
              htmlFor="floating_outlined_2"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Image is OPTIONAL*
            </label>
          </div>
          <button
            type="submit"
            className="shadow-brutalShadow bg-white text-purple-500 p-3 text-xl font-bold border-2 border-black cursor-pointer hover:rotate-6 transition-all ease-in-out duration-300"
          >
            Add thing
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Modal;
