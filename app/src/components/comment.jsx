import React from "react";
import { useParams } from "react-router-dom";
import { api } from "../core/api";
import { userActions } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Comment = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const deleteReq = async () => {
    await api
      .delete(`/comments/${props.id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(`Delete req err - ${err}`));

    api
      .get("/comments")
      .then((res) => dispatch(userActions.setCommentList(res.data)))
      .catch((err) => console.log(`Get req err - ${err}`));
  };

  return (
    <div className="flex justify-start items-center mt-2 border-t border-gray-700 text-xs py-2 min-w-[30rem]">
      <div className="flex items-center">
        <img
          src={props.profilePicture}
          alt="profilePic"
          className="w-auto h-auto max-w-[3rem] max-h-[3rem] mr-2"
        />
        <div>
          {props.firstName} {props.lastName}
        </div>
      </div>
      <div className="ml-10 flex flex-col">
        {props.image !== "NULL" && props.image !== "" && (
          <img
            src={props.image}
            className="w-auto h-auto max-w-[10rem] max-h-[10rem] col-span-full"
          />
        )}
        {props.message !== "NULL" && props.message !== "" && (
          <div className="col-span-full">{props.message}</div>
        )}
      </div>
      {props.userID === Number(id) && (
        <div className="ml-5 justify-self-end hover:cursor-pointer" onClick={deleteReq}>
          &#10008;
        </div>
      )}
    </div>
  );
};

export default Comment;
