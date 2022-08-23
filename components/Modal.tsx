import { useState } from "react";
import { trpc } from "../src/utils/trpc";
import { motion } from "framer-motion";

function Modal({ setIsOpen, userId }: { setIsOpen: any; userId: string }) {
  const [image, setImage] = useState<any>();
  const [title, setTitle] = useState<string>();
  const [rating, setRating] = useState<any>();
  const [status, setStatus] = useState<string>();
  const [category, setCategory] = useState<string>();
  //// post && db
  const createPost = trpc.useMutation("createPost");
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const img = new FormData();

    if (image && title && userId && category && status) {
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
        rating: rating ? rating : null,
        userId: userId,
        image: cloudImage,
        category,
        status,
      });

      setImage(null);
      setTitle(undefined);
      setRating(undefined);
      setCategory(undefined);
      setStatus(undefined);
      setIsOpen(false);
    }
    if (!image && title && category && status && userId) {
      createPost.mutate({
        title,
        rating: rating ? rating : null,
        userId: userId,
        category,
        status,
      });
      setImage(null);
      setTitle(undefined);
      setRating(undefined);
      setCategory(undefined);
      setStatus(undefined);
      setIsOpen(false);
    }
  };

  return (
    <div
      className="fixed w-full h-full  z-10 bg-opacity-50 bg-black top-0 left-0 flex cursor-pointer overflow-hidden"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <motion.div
        initial={{ translateX: -2000 }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.6 }}
        exit={{ translateX: 2000 }}
        className="w-2/3 flex m-auto justify-center bg-white shadow-md rounded-md   p-2"
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <form
          className="mt-5 flex flex-col w-full px-5 py-10 items-center gap-6"
          onSubmit={(e: any) => {
            e.preventDefault();
            submitHandler(e);
          }}
        >
          <div className="flex flex-col w-2/3 ">
            <label
              htmlFor="floating_outlined"
              className="font-bold text-purple-600 "
            >
              Title
            </label>
            <input
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
              type="text"
              id="floating_outlined"
              placeholder=" "
              className="w-full block px-2.5 pb-2.5 pt-4  text-sm text-gray-900 bg-transparent rounded-md   bg-gray-50 border-gray-50 focus:outline-purple-500"
            />
          </div>
          <div className="flex flex-col w-2/3  ">
            <label htmlFor="category" className="font-bold text-purple-600 ">
              Category
            </label>
            <select
              className="w-full block px-2.5 pb-2.5 pt-4  text-sm text-gray-900 bg-transparent rounded-md   bg-gray-50 border-gray-50  focus:outline-purple-500"
              onChange={(e: any) => {
                setCategory(e.target.value);
              }}
              name="category"
              id="category"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled hidden>
                Choose here
              </option>
              <option value="Movies">Movies</option>
              <option value="Books">Books</option>
              <option value="Games">Games</option>
            </select>
          </div>
          <div className=" w-2/3 flex flex-col">
            <label htmlFor="status" className="font-bold text-purple-600 ">
              Status
            </label>
            <select
              defaultValue={"DEFAULT"}
              className=" block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-md   bg-gray-50 border-gray-50  focus:outline-purple-500"
              name="status"
              id="status"
              onChange={(e: any) => {
                setStatus(e.target.value);
              }}
            >
              <option value="DEFAULT" disabled hidden>
                Choose here
              </option>
              <option value="Want to Try">Want to Try</option>
              <option value="On Progress">On Progress </option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <div className="relative w-2/3  flex flex-col">
            <label
              htmlFor="floating_outlined_2"
              className="font-bold text-purple-600 relative"
            >
              Image
              <span className="absolute text-extraSmall text-red-500 scale-90">
                *OPTIONAL*
              </span>
            </label>
            <input
              onChange={(e) => {
                setImage(e.target.files);
              }}
              type="file"
              id="floating_outlined_2"
              placeholder=" "
              min="1"
              max="10"
              className="bg-gray-100 p-2 rounded-md  focus:outline-purple-500"
            />
          </div>
          <div className="relative w-2/3  flex flex-col">
            <label
              htmlFor="floating_outlined_3 "
              className="relative text-purple-600 font-bold"
            >
              Rating
              <span className="absolute text-extraSmall text-red-500 scale-90">
                *OPTIONAL*
              </span>
            </label>
            <input
              className="bg-gray-100 p-2 rounded-md"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const ratingToNumber = e.target.value;
                setRating(Number(ratingToNumber));
              }}
              type="number"
              id="floating_outlined_3"
              placeholder=" "
              min="1"
              max="10"
            />
          </div>
          <button
            className="mb-5 font-bold relative z-10 text-purple-600 border-purple-600 border-2 hover:text-white  transition-all duration-300 ease-in-out px-4 py-2  cursor-pointer rounded-md before:z-minusOne  before:absolute before:bg-purple-600 hover:before:w-full  before:w-0   before:h-full before:top-0 before:left-0  before:transition-all before:duration-300 before:origin-left"
            type="submit"
          >
            + ADD THING
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Modal;
