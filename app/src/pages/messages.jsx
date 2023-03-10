import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from "../components/message";
import Button from "../components/custom/Button";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/userSlice";
import { api } from "../core/api";

const Messages = () => {
  const userList = useSelector((state) => state.users.userList);
  const messageList = useSelector((state) => state.users.messageList);
  const [msgRecipient, setMsgRecipient] = useState();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const currentUser = userList.find((el) => el.id === Number(id));
  const dispatch = useDispatch();

  const sendMessage = async () => {
    const postReqPayload = {
      senderID: Number(id),
      recipientID: msgRecipient.id,
      message,
      image,
    };

    await api
      .post("/messages", postReqPayload)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(`Post req - ${err}`));

    api
      .get("/messages")
      .then((res) => dispatch(userActions.setMessageList(res.data)))
      .catch((err) => console.log(`Get req - ${err}`));

    setMessage("");
    setImage("");
  };

  return (
    <div className="w-[40rem] min-h-[40rem] grid grid-cols-[1fr,2fr] mt-10 bg-black bg-opacity-50 p-4 justify-items-center">
      <div>
        {userList.map((el) => {
          if (!el.admin) {
            const filteredMessages = messageList.find(
              (msg) =>
                (currentUser.id === msg.senderID && el.id === msg.recipientID) ||
                (currentUser.id === msg.recipientID && el.id === msg.senderID)
            );
            return (
              <div
                key={el.id}
                className={`col-start-1 col-end-2 mb-2 flex items-center w-full border border-white p-2 hover:cursor-pointer ${
                  !filteredMessages && "opacity-50 text-gray-600"
                } ${msgRecipient === el && "border-yellow-500 text-yellow-500 border-2"}`}
                onClick={() => setMsgRecipient(el)}>
                <img
                  src={el.profilePicture}
                  alt="profilePic"
                  className="w-auto h-auto max-w-[3rem] max-h-[3rem]"
                />
                <p className="text-[0.8rem] ml-2">
                  {el.firstName} {el.lastName}
                </p>
              </div>
            );
          }
        })}
      </div>
      {msgRecipient && (
        <div className="flex flex-col self-start w-full items-center min-h-[80rem]">
          <img
            src={msgRecipient.profilePicture}
            alt="Recipient"
            className="w-auto h-auto max-w-[10rem] max-h-[5rem] mb-5"
          />
          <div className="flex flex-col w-full overflow-auto">
            {msgRecipient ? (
              messageList.map((el) => {
                if (
                  (currentUser.id === el.senderID && msgRecipient.id === el.recipientID) ||
                  (currentUser.id === el.recipientID && msgRecipient.id === el.senderID)
                )
                  return (
                    <Message
                      key={el.id}
                      id={el.id}
                      profilePicture={
                        currentUser.id === el.senderID
                          ? currentUser.profilePicture
                          : msgRecipient.profilePicture
                      }
                      message={el.message !== "NULL" && el.message !== "" && el.message}
                      image={el.image !== "NULL" && el.image !== "" && el.image}
                      sender={currentUser.id === el.senderID ? true : false}
                    />
                  );
              })
            ) : (
              <p>
                You have no messages with {msgRecipient.firstName} {msgRecipient.lastName}
              </p>
            )}
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                className="w-[80%] h-20 justify-self-end self-start ml-2 bg-transparent border border-white rounded-lg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <input
                type="file"
                name="image"
                id="image"
                className="w-[80%]"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <Button
              title="&#8677;"
              submit
              classes={`text-[2rem] max-w-[4rem] max-h-[4rem] self-center ${
                !message && !image && "pointer-events-none opacity-50"
              }`}
              onClick={sendMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
