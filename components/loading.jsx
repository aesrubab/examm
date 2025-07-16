import React from "react";
import loading from "@/public/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-fit h-fit flex flex-col items-center justify-center">
      <Image className="size-10" src={loading} alt="loading.gif" />
      <p className="text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;
