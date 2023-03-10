import React from "react";
import Error from "../components/error";
import { Outlet, NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const { id } = useParams();
  const userList = useSelector((state) => state.users.userList);
  const userMatch = userList.find((el) => el.id === Number(id));

  return userMatch ? (
    <div className="flex flex-col items-center min-h-screen mx-80 bg-black bg-opacity-60">
      <nav className="flex justify-around w-full mt-4">
        <NavLink
          className={({ isActive }) => (isActive ? "underline text-yellow-500" : undefined)}
          to={`/${id}`}
          end>
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "underline text-yellow-500" : undefined)}
          to={`/${id}/news-feed`}>
          News Feed
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "underline text-yellow-500" : undefined)}
          to={`/${id}/messages`}>
          Messages
        </NavLink>
      </nav>
      <Outlet />
    </div>
  ) : (
    <Error />
  );
};

export default UserLayout;
