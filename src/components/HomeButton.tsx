"use client";

import { useRouter } from "next/navigation";
import React from "react";

const HomeButton = () => {
  const router = useRouter();
  const handleClick = () => {
    console.log("첫페이지로");
    router.push("/");
  };
  return (
    <div>
      <button onClick={() => handleClick()}>이전으로</button>
    </div>
  );
};

export default HomeButton;
