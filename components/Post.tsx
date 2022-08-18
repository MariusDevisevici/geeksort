import Image from "next/image";
import {} from "react";

function Post({
  title,
  rating,
  image,
}: {
  title: string;
  rating: number;
  image: any;
}) {
  return (
    <div>
      {title} {rating}
      <Image src={image} width={50} height={50}></Image>
    </div>
  );
}

export default Post;
