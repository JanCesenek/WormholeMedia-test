import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Button from "../components/custom/Button";
import UseInput from "../hooks/use-input";
import { api } from "../core/api";
import { userActions } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const NewUser = () => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    changeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = UseInput((value) => /^[a-zA-Z]+$/.test(value) && value.length >= 2 && value.length <= 30);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    changeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = UseInput((value) => /^[a-zA-Z]+$/.test(value) && value.length >= 2 && value.length <= 30);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = UseInput(
    (value) =>
      value.length >= 8 &&
      value.length <= 16 &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[$&+,:;=?@#|'"<>.⌃*()%!-]/.test(value)
  );

  const {
    value: birthDateValue,
    isValid: birthDateIsValid,
    hasError: birthDateHasError,
    changeHandler: birthDateChangeHandler,
    blurHandler: birthDateBlurHandler,
    reset: birthDateReset,
  } = UseInput((value) => value);

  const {
    value: raceValue,
    isValid: raceIsValid,
    hasError: raceHasError,
    changeHandler: raceChangeHandler,
    blurHandler: raceBlurHandler,
    reset: raceReset,
  } = UseInput((value) => /^[a-zA-Z]+$/.test(value) && value.length >= 2 && value.length <= 30);

  const {
    value: occupationValue,
    isValid: occupationIsValid,
    hasError: occupationHasError,
    changeHandler: occupationChangeHandler,
    blurHandler: occupationBlurHandler,
    reset: occupationReset,
  } = UseInput((value) => /^[a-zA-Z]+$/.test(value) && value.length >= 2 && value.length <= 30);

  const {
    value: originValue,
    isValid: originIsValid,
    hasError: originHasError,
    changeHandler: originChangeHandler,
    blurHandler: originBlurHandler,
    reset: originReset,
  } = UseInput((value) => /^[a-zA-Z]+$/.test(value) && value.length >= 2 && value.length <= 30);

  const [profilePic, setProfilePic] = useState();
  const [gender, setGender] = useState("M");
  const [ID, setID] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validForm =
    firstNameIsValid &&
    lastNameIsValid &&
    passwordIsValid &&
    birthDateIsValid &&
    raceIsValid &&
    occupationIsValid &&
    originIsValid;

  const resetForm = () => {
    firstNameReset();
    lastNameReset();
    passwordReset();
    birthDateReset();
    raceReset();
    occupationReset();
    originReset();
    setProfilePic();
    setGender("M");
  };

  const createNewUser = () => {
    const firstName = firstNameValue[0]?.toUpperCase() + firstNameValue?.slice(1).toLowerCase();
    const lastName = lastNameValue[0]?.toUpperCase() + lastNameValue?.slice(1).toLowerCase();
    const username =
      firstName.slice(0, 2).toLowerCase() +
      lastName.slice(0, 2).toLowerCase() +
      Math.trunc(Math.random() * 1000);

    const getAge = (dateString) => {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const defaultPic =
      gender === "M" ? "/src/imgs/maleDefaultPic.jpg" : "/src/imgs/femaleDefaultPic.jfif";

    const postReqPayload = {
      firstName,
      lastName,
      username,
      password: passwordValue,
      age: getAge(birthDateValue),
      gender,
      race: raceValue,
      birthDate: new Date(birthDateValue),
      occupation: occupationValue,
      profilePicture: profilePic ? profilePic : defaultPic,
      origin: originValue,
    };

    api
      .post("/users", postReqPayload)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(`Post req err - ${err}`));

    api
      .get("/users")
      .then((res) => dispatch(userActions.setUserList(res.data)))
      .catch((err) => console.log(`Get req err - ${err}`));

    api
      .get("/lastUser")
      .then((res) => setID(Object.values(res.data)[0].id))
      .catch((err) => console.log(`Get req err - ${err}`));

    resetForm();
    alert("User successfully created! Click to log in with your existing details.");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center bg-black bg-opacity-50 mx-80 min-h-screen">
      <div className="flex text-[3rem] font-[Audiowide,cursive] border border-white rounded-2xl bg-black bg-opacity-40 p-2 mt-[1%]">
        <h1>New User Form</h1>
        <img src="/src/imgs/Ma'Tok.svg" alt="Jaffa weapon" className="w-20 h-20 rotate-45 ml-2" />
      </div>
      <div className="w-[40rem] text-[0.8rem] text-align-center text-center mt-5 bg-black bg-opacity-50 p-2 rounded-2xl border border-white">
        <h2 className="text-[1rem]">Rules:</h2>
        <p>First name, Last name, Occupation, Place of origin: 2-30 characters, letters only</p>
        <p>
          Password: 8-16 characters, must contain lower+uppercase, number and a special character
        </p>
        <p>Profile pic: voluntary, if none provided, default will be used based on gender</p>
      </div>
      <div className="w-[40rem] border rounded-md mt-5 bg-black bg-opacity-50">
        <Form method="post" className="flex flex-col items-start [&>*]:my-1 p-2">
          <div className="flex">
            <label htmlFor="firstName" className="min-w-[10rem] ml-2">
              First name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstNameValue}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              className={`bg-transparent border border-white ${
                firstNameHasError && "border-red-600"
              }`}
            />
          </div>
          <div className="flex">
            <label htmlFor="lastName" className="min-w-[10rem] ml-2">
              Last name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastNameValue}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              className={`bg-transparent border border-white ${
                lastNameHasError && "border-red-600"
              }`}
            />
          </div>
          <div className="flex">
            <label htmlFor="password" className="min-w-[10rem] ml-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              className={`bg-transparent border border-white ${
                passwordHasError && "border-red-600"
              }`}
            />
          </div>
          <div className="flex">
            <label htmlFor="birthDate" className="min-w-[10rem] ml-2">
              Birth date:
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={birthDateValue}
              onChange={birthDateChangeHandler}
              onBlur={birthDateBlurHandler}
              className={`bg-transparent border border-white ${
                birthDateHasError && "border-red-600"
              }`}
            />
          </div>
          <div className="flex">
            <label htmlFor="race" className="min-w-[10rem] ml-2">
              Race:
            </label>
            <input
              type="text"
              id="race"
              name="race"
              value={raceValue}
              onChange={raceChangeHandler}
              onBlur={raceBlurHandler}
              className={`bg-transparent border border-white ${raceHasError && "border-red-600"}`}
            />
          </div>
          <div className="flex">
            <label htmlFor="occupation" className="min-w-[10rem] ml-2">
              Occupation:
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={occupationValue}
              onChange={occupationChangeHandler}
              onBlur={occupationBlurHandler}
              className={`bg-transparent border border-white ${
                occupationHasError && "border-red-600"
              }`}
            />
          </div>
          <div className="flex">
            <label htmlFor="profilePic" className="min-w-[10rem] ml-2">
              Profile pic:
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/png, image/jpeg"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </div>
          <div className="flex">
            <label htmlFor="origin" className="min-w-[10rem] ml-2">
              Place of origin:
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={originValue}
              onChange={originChangeHandler}
              onBlur={originBlurHandler}
              className={`bg-transparent border border-white ${originHasError && "border-red-600"}`}
            />
          </div>
          <div className="flex">
            <label htmlFor="gender" className="min-w-[10rem] ml-2">
              Gender:
            </label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="text-black">
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>
          <div
            className={`self-center ${!validForm && "pointer-events-none opacity-50"}`}
            onClick={createNewUser}>
            <Button title="Create New User" />
          </div>
        </Form>
      </div>
      <Link to="/" className="mt-5 text-yellow-500 underline">
        Back
      </Link>
    </div>
  );
};

export default NewUser;
