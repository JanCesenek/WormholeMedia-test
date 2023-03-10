import React, { useState } from "react";
import classes from "./post.module.scss";
import Comment from "./comment";
import Button from "../components/custom/Button";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../core/api";
import { userActions } from "../redux/userSlice";
import { Form, useParams } from "react-router-dom";
import { usePosts } from "../hooks/posts";

const Post = (props) => {
  const { refetch } = usePosts();

  const [comments, setComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const userList = useSelector((state) => state.users.userList);
  const commentList = useSelector((state) => state.users.commentList);
  const likeList = useSelector((state) => state.users.likeList);
  const dislikeList = useSelector((state) => state.users.dislikeList);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "short" });
  };

  const commentCount = () => {
    let count = 0;
    commentList.map((el) => {
      if (el.postID === props.postID) count++;
    });
    return count;
  };

  const likeCount = () => {
    let count = 0;
    likeList.map((el) => {
      if (el.postID === props.postID) count++;
    });
    return count;
  };

  const dislikeCount = () => {
    let count = 0;
    dislikeList.map((el) => {
      if (el.postID === props.postID) count++;
    });
    return count;
  };

  const deleteReq = async () => {
    if (window.confirm("Really wanna delete the post?")) {
      await api
        .delete(`/posts/${props.postID}`)
        .then(async () => await refetch())
        .catch((err) => console.log(`Delete req err - ${err}`));
    }
  };

  const alreadyLiked = likeList.find(
    (el) => el.postID === props.postID && el.userID === Number(id)
  );
  const alreadyDisliked = dislikeList.find(
    (el) => el.postID === props.postID && el.userID === Number(id)
  );

  const toggleLike = async () => {
    const postReqPayload = {
      postID: props.id,
      userID: Number(id),
    };

    if (alreadyLiked) {
      await api
        .delete(`/likes/${alreadyLiked.id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(`Delete req err - ${err}`));

      api
        .get("/likes")
        .then((res) => dispatch(userActions.setLikeList(res.data)))
        .catch((err) => console.log(`Get req err - ${err}`));
    } else if (alreadyDisliked) {
      await api
        .delete(`/dislikes/${alreadyDisliked.id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(`Delete req err - ${err}`));

      await api
        .post("/likes", postReqPayload)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(`Post req err - ${err}`));

      api
        .get("/likes")
        .then((res) => dispatch(userActions.setLikeList(res.data)))
        .catch((err) => console.log(`Get req err - ${err}`));

      api
        .get("/dislikes")
        .then((res) => dispatch(userActions.setDislikeList(res.data)))
        .catch((err) => console.log(`Get req err - ${err}`));
    } else {
      await api
        .post("/likes", postReqPayload)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(`Post req err - ${err}`));

      api
        .get("/likes")
        .then((res) => dispatch(userActions.setLikeList(res.data)))
        .catch((err) => console.log(`Get req err - ${err}`));
    }
  };

  const toggleDislike = async () => {
    const postReqPayload = {
      postID: props.id,
      userID: Number(id),
    };

    if (alreadyDisliked) {
      await api
        .delete(`/dislikes/${alreadyDisliked.id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(`Delete req err - ${err}`));

      api
        .get("/dislikes")
        .then((res) => dispatch(userActions.setLikeList(res.data)))
        .catch((err) => console.log(`Get req err - ${err}`));
    } else if (alreadyLiked) {
      await api
        .delete(`/likes/${alreadyLiked.id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(`Delete req err - ${err}`));

      await api
        .post("/dislikes", postReqPayload)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(`Post req err - ${err}`));

      api
        .get("/likes")
        .then((res) => dispatch(userActions.setLikeList(res.data)))
        .catch((err) => console.log(`Get req err - ${err}`));

      api
        .get("/dislikes")
        .then((res) => dispatch(userActions.setDislikeList(res.data)))
        .catch((err) => console.log(`Get req err - ${err}`));
    } else {
      await api
        .post("/dislikes", postReqPayload)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(`Post req err - ${err}`));

      api
        .get("/dislikes")
        .then((res) => dispatch(userActions.setDislikeList(res.data)))
        .catch((err) => console.log(`Get req err - ${err}`));
    }
  };

  const createComment = async () => {
    const postReqPayload = {
      postID: props.postID,
      userID: Number(id),
      image,
      message,
    };

    await api
      .post("/comments", postReqPayload)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(`Post req err - ${err}`));

    api
      .get("/comments")
      .then((res) => dispatch(userActions.setCommentList(res.data)))
      .catch((err) => console.log(`Get req err - ${err}`));

    setImage("");
    setMessage("");
    setAddComment(false);
    setComments(true);
  };

  return (
    <div className={classes.post}>
      {props.profile && (
        <div className="absolute top-5 right-5 hover:cursor-pointer" onClick={deleteReq}>
          &#10008;
        </div>
      )}
      <div className="col-span-full w-full h-full text-[0.5rem] flex justify-center">
        <img src="/src/imgs/postCreated.svg" alt="postCreated" className="w-2 h-2" />{" "}
        <div>
          {props.createdAt.slice(0, 4)} {getMonthName(props.createdAt.slice(5, 7))}{" "}
          {props.createdAt.slice(8, 10)} {props.createdAt.slice(11, 19)}
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center border-b border-white">
        <img
          src={props.profilePicture}
          alt="profilePic"
          className="w-auto h-auto max-w-full max-h-full rounded-lg"
        />
      </div>
      <div className="text-3xl col-start-2 col-end-4 border-b border-white w-full h-full flex justify-center items-center">
        <h1>
          {props.firstName} {props.lastName}
        </h1>
      </div>
      {props.image !== "NULL" && props.image !== "" && (
        <img
          src={props.image}
          alt="some img"
          className="col-span-full w-auto h-auto max-w-full max-h-full rounded-sm"
        />
      )}
      {props.message !== "NULL" && props.message !== "" && (
        <p className="col-span-full">{props.message}</p>
      )}
      <div className="flex items-center justify-center w-full h-full border-t border-white pt-2">
        {likeCount()}{" "}
        <img
          src="/src/imgs/LikeLogo.svg"
          alt="like"
          className="w-10 h-10 ml-2 hover:cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-center w-full h-full border-t border-white pt-2">
        {dislikeCount()}{" "}
        <img
          src="/src/imgs/LikeLogo.svg"
          alt="dislike"
          className="w-10 h-10 rotate-180 ml-2 hover:cursor-pointer"
          onClick={toggleLike}
        />
      </div>
      <div className="flex items-center justify-center w-full h-full border-t border-white pt-2 hover:cursor-pointer">
        <p className="mr-2" onClick={() => setComments(!comments)}>
          Comments{commentCount() > 0 && ` : ${commentCount()}`}
        </p>{" "}
        <img
          src="/src/imgs/Comment.svg"
          alt="comment"
          className="w-10 h-10"
          onClick={toggleDislike}
        />
      </div>
      <div className="col-span-full w-full flex flex-col">
        {comments &&
          commentList.map((el) => {
            const userMatch = userList.find((user) => user.id === el.userID);
            if (el.postID === props.postID)
              return (
                <Comment
                  key={el.id}
                  id={el.id}
                  firstName={userMatch.firstName}
                  lastName={userMatch.lastName}
                  profilePicture={userMatch.profilePicture}
                  image={el.image}
                  message={el.message}
                  userID={el.userID}
                />
              );
          })}
        <div className="self-center mt-2 flex flex-col items-center">
          <div onClick={() => setAddComment(!addComment)}>
            <Button title={addComment ? "Hide" : "Add new comment"} />
          </div>
          {addComment && (
            <Form className="flex flex-col mt-2 border border-white rounded-lg p-2 [&>*]:mt-2">
              <div className="flex items-center">
                <label htmlFor="message">Message:</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  className="max-w-[20rem] max-h-[3rem] bg-transparent border border-white rounded-lg ml-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="ml-2"
                />
              </div>
              <div className="self-center" onClick={createComment}>
                <Button title="Submit" submit />
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
