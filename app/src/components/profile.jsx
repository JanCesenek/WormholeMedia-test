import React from "react";
import classes from "./profile.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/api";
import { userActions } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Profile = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const defaultPic =
    props.gender === "M" ? "/src/imgs/maleDefaultPic.jpg" : "/src/imgs/femaleDefaultPic.jfif";

  const deleteUser = async () => {
    if (window.confirm("Really wanna delete your account?")) {
      await api
        .delete(`/users/${id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(`Delete req err - ${err}`));

      api
        .get("/users")
        .then((res) => dispatch(userActions.setUserList(res.data)))
        .catch((err) => console.log(`Get req err - ${err}`));
      navigate("/");
    } else return;
  };

  return (
    <div className={`${classes.profile} ${props.admin && "!text-yellow-400 !border-yellow-400"}`}>
      <div
        className={`grid grid-cols-2 grid-rows-1 bg-gradient-to-b from-black/70 to-gray-500/70 justify-center items-center relative`}
        style={{
          "--tw-gradient-stops": `var(--tw-gradient-from) 35%, ${
            props.admin ? "yellow" : "white"
          }, var(--tw-gradient-to) 65%`,
        }}>
        <h1 className="self-end mb-10 text-3xl px-3 w-[120%] ml-5">
          {props.firstName} {props.lastName}
        </h1>
        <div className={classes.img}>
          <img src={props.profilePicture ? props.profilePicture : defaultPic} alt="Profile pic" />
        </div>
        {id > 11 && (
          <div
            className="absolute top-0 right-0 mr-5 mt-5 hover:cursor-pointer"
            onClick={deleteUser}>
            &#10008;
          </div>
        )}
      </div>
      <div className="bg-gradient-to-t from-black/70 to-gray-500/70 flex flex-col items-center">
        <p className="flex items-center justify-between w-3/5">
          <img src="src/imgs/race.svg" alt="race" className="w-10 h-10" /> {props.race}
        </p>
        <p className="flex items-center justify-between w-3/5">
          <img src="src/imgs/age.svg" alt="age" className="w-10 h-10" /> {props.age} y.o.
        </p>
        <p className="flex items-center justify-between w-3/5">
          <img src="src/imgs/occupation.svg" alt="occupation" className="w-10 h-10" />{" "}
          {props.occupation}
        </p>
        <p className="flex items-center justify-between w-3/5">
          <img src="src/imgs/origin.svg" alt="origin" className="w-10 h-10" /> {props.origin}
        </p>
        <p className="flex items-center justify-between w-3/5">
          <img src="src/imgs/birthDate.svg" alt="birthDate" className="w-10 h-10" />{" "}
          {props.birthDate.slice(0, 10)}
        </p>
        <p className="flex items-center justify-between w-3/5">
          <img src="src/imgs/gender.svg" alt="gender" className="w-10 h-10" />{" "}
          {props.gender === "M" ? "Male" : "Female"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
