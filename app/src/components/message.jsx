import React from "react";
import classes from "./message.module.scss";
import { api } from "../core/api";
import { userActions } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Message = (props) => {
  const dispatch = useDispatch();

  const deleteReq = async () => {
    await api
      .delete(`/messages/${props.id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(`Delete req - ${err}`));

    api
      .get("/messages")
      .then((res) => dispatch(userActions.setMessageList(res.data)))
      .catch((err) => console.log(`Get req - ${err} `));
  };

  return (
    <div className={`flex items-center mb-2 ${props.sender ? "justify-end" : "justify-start"}`}>
      {props.sender && (
        <div className="hover:cursor-pointer" onClick={deleteReq}>
          &#10008;
        </div>
      )}
      <img
        src={props.profilePicture}
        alt=""
        className={`w-auto h-auto max-w-[5rem] max-h-[5rem] ${
          props.sender ? "order-2 mr-2" : "ml-2"
        }`}
      />
      <div
        className={`bg-white text-black max-w-[20rem] h-min min-w-[10rem] min-h-[5rem] flex flex-col justify-center items-center p-2 text-[0.7rem] ${
          props.sender
            ? `${classes.bubbleSender} pr-10 ml-2`
            : `${classes.bubbleRecipient} pl-10 mr-2`
        }`}>
        {props.message && <p>{props.message}</p>}
        {props.image && (
          <img
            src={props.image}
            alt="Image"
            className="w-auto h-auto max-w-[10rem] max-h-[10rem]"
          />
        )}
      </div>
    </div>
  );
};

export default Message;
