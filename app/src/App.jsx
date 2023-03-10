import React, { useEffect } from "react";
import DefaultPage from "./pages/defaultPage";
import Error from "./components/error";
import RootLayout from "./pages/root";
import NewUser from "./pages/newUser";
import UserLayout from "./pages/userLayout";
import User from "./pages/user";
import NewsFeed from "./pages/newsFeed";
import { api } from "./core/api";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./redux/userSlice";
import Messages from "./pages/messages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <DefaultPage /> },
      { path: "/new", element: <NewUser /> },
      {
        path: "/:id",
        element: <UserLayout />,
        children: [
          { index: true, element: <User /> },
          { path: "/:id/news-feed", element: <NewsFeed /> },
          { path: "/:id/messages", element: <Messages /> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.userList);
  const postList = useSelector((state) => state.users.postList);
  const commentList = useSelector((state) => state.users.commentList);
  const likeList = useSelector((state) => state.users.likeList);
  const dislikeList = useSelector((state) => state.users.dislikeList);
  const messageList = useSelector((state) => state.users.messageList);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        dispatch(userActions.setUserList(res.data));
        console.log(userList, res.data);
      })
      .catch((err) => console.log(`Get req err - ${err}`));
    api
      .get("/posts")
      .then((res) => {
        dispatch(userActions.setPostList(res.data));
        console.log(postList, res.data);
      })
      .catch((err) => console.log(`Get req err - ${err}`));
    api
      .get("/comments")
      .then((res) => {
        dispatch(userActions.setCommentList(res.data));
        console.log(commentList, res.data);
      })
      .catch((err) => console.log(`Get req err - ${err}`));
    api
      .get("/likes")
      .then((res) => {
        dispatch(userActions.setLikeList(res.data));
        console.log(likeList, res.data);
      })
      .catch((err) => console.log(`Get req err - ${err}`));
    api
      .get("/dislikes")
      .then((res) => {
        dispatch(userActions.setDislikeList(res.data));
        console.log(dislikeList, res.data);
      })
      .catch((err) => console.log(`Get req err - ${err}`));
    api
      .get("/messages")
      .then((res) => {
        dispatch(userActions.setMessageList(res.data));
        console.log(messageList, res.data);
      })
      .catch((err) => console.log(`Get req err - ${err}`));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
