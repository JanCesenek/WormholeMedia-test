import React, { useState } from "react";
import { useParams, Form } from "react-router-dom";
import { useSelector } from "react-redux";
import Error from "../components/error";
import Profile from "../components/profile";
import Posts from "./posts";
import Button from "../components/custom/Button";
import { api } from "../core/api";
import { userActions } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { usePosts } from "../hooks/posts";

const User = () => {
  const userList = useSelector((state) => state.users.userList);
  const { id } = useParams();
  const [addPost, setAddPost] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const currentUser = userList.find((el) => el.id === Number(id));
  const dispatch = useDispatch();
  const { refetch } = usePosts();

  const createPost = async () => {
    const postReqPayload = {
      userID: Number(id),
      message,
      image,
    };

    await api
      .post("/posts", postReqPayload)
      .then(async () => await refetch())
      .catch((err) => console.log(`Post req err - ${err}`));

    setMessage("");
    setImage("");
    setAddPost(false);
  };

  return currentUser ? (
    <div className="flex flex-col items-center">
      <Profile
        firstName={currentUser.firstName}
        lastName={currentUser.lastName}
        username={currentUser.username}
        age={currentUser.age}
        gender={currentUser.gender}
        race={currentUser.race}
        birthDate={currentUser.birthDate}
        occupation={currentUser.occupation}
        profilePicture={currentUser.profilePicture}
        origin={currentUser.origin}
        admin={currentUser.admin}
      />
      <div className="mt-5 flex flex-col items-center">
        <div onClick={() => setAddPost(!addPost)}>
          <Button title={addPost ? "Hide" : "Add new post"} />
        </div>
        {addPost && (
          <Form className="border border-white rounded-lg p-2 flex flex-col items-center bg-black bg-opacity-50">
            <div className="flex">
              <label htmlFor="message">Message:</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-transparent border border-white rounded-lg p-2"
              />
            </div>
            <div className="flex">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                name="image"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div
              className={!message && !image ? "pointer-events-none opacity-50" : undefined}
              onClick={createPost}>
              <Button title="Submit" submit />
            </div>
          </Form>
        )}
      </div>
      <Posts profile />
    </div>
  ) : (
    <Error />
  );
};

export default User;
