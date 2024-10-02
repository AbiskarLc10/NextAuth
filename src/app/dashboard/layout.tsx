import DashSideBar from "@/components/DashSideBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full flex md:flex-row flex-col md:min-h-screen ">
      <div className=" md:w-52  p-2">
        <DashSideBar />
      </div>
      {children}
    </div>
  );
};

export default layout;
