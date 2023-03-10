import React from "react";
import coffee from "../imgs/tealc-coffee.gif";

const Loading = () => {
  return (
    <div className="min-h-screen min-w-full flex flex-col items-center mt-8">
      <h1>Well, that's gonna take some time... In the meantime, coffee?</h1>
      <img src={coffee} alt="ANO, to je ON" className="w-[30rem] h-[15rem] rounded-[1rem]" />
    </div>
  );
};

export default Loading;
