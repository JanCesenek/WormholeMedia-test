import React from "react";
import { Link } from "react-router-dom";
import classes from "./defaultPage.module.scss";
import Button from "../components/custom/Button";
import { useSelector } from "react-redux";

const DefaultPage = () => {
  const userList = useSelector((state) => state.users.userList);
  return (
    <div className="flex flex-col min-h-screen justify-start items-center bg-black bg-opacity-50 mx-80">
      <div className={classes.Headline}>
        <h1>Wormhole Media</h1>
        <img src="/src/imgs/Ma'Tok.svg" alt="Jaffa weapon" className="w-20 h-20 rotate-45 ml-2" />
      </div>
      <div className={classes.Form}>
        <div className="w-full flex justify-between">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-transparent border border-white"
          />
        </div>
        <div className="w-full flex justify-between">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            className="bg-transparent border border-white"
          />
        </div>
        <div className="w-full flex justify-around">
          <Button title="Log in" />
        </div>
      </div>
      <p className="mt-5">
        <Link to="/new" className="text-yellow-400 underline">
          New user? Click here to create an account.
        </Link>
      </p>
      <div className="flex flex-col justify-center items-center mt-10">
        List of test users:
        {userList.map((el) => {
          if (el.id <= 10)
            return (
              <p key={el.id} className="font-bold">
                {el.username}
              </p>
            );
        })}
        <p>Password is 'test123' for all of them.</p>
        <p className="mx-60">
          Default users can't be deleted, nor any of their default data. They can only create posts
          (also like/dislike), comments and messages. To delete anything, you have to create it
          yourself.
        </p>
      </div>
    </div>
  );
};

export default DefaultPage;
