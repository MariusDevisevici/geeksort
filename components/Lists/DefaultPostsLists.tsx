import {} from "react";
import Post from "../Post";

function DefaultPostsLists({ userPosts }: { userPosts: any }) {
  return (
    <div>
      {userPosts.length > 0 ? (
        userPosts.map((post: any, i: number) => {
          return (
            <Post
              key={i}
              title={post.title}
              rating={post.rating}
              image={post.image}
            ></Post>
          );
        })
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
}

export default DefaultPostsLists;
