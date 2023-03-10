import React from "react";
import Post from "../components/post";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/posts";

const Posts = (props) => {
  const userList = useSelector((state) => state.users.userList);
  const postList = useSelector((state) => state.users.postList);
  const { id } = useParams();
  const currentUser = userList.find((el) => el.id === Number(id));
  const { data: posts } = usePosts();

  return props.profile ? (
    <div className="w-[40rem]">
      {posts?.map((el) => {
        if (el.userID === Number(id))
          return (
            <Post
              key={el.id}
              image={el.image}
              message={el.message}
              createdAt={el.createdAt}
              postID={el.id}
              profilePicture={currentUser.profilePicture}
              firstName={currentUser.firstName}
              lastName={currentUser.lastName}
              profile
            />
          );
      })}
    </div>
  ) : (
    <div className="w-[40rem]">
      {posts?.map((el) => {
        const userMatch = userList.find((user) => user.id === el.userID);
        return (
          <Post
            key={el.id}
            image={el.image}
            message={el.message}
            createdAt={el.createdAt}
            postID={el.id}
            profilePicture={userMatch.profilePicture}
            firstName={userMatch.firstName}
            lastName={userMatch.lastName}
          />
        );
      })}
    </div>
  );
};

export default Posts;
