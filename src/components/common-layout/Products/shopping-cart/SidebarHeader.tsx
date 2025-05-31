/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaCartPlus, FaTimes } from "react-icons/fa";

type TProps = {
  toggleCart: any;
};

const SidebarHeader = ({ toggleCart }: TProps) => {
  return (
    <div className="flex justify-between p-5 border bg-coral">
      <h1 className="flex items-center text-lg font-bold text-white gap-x-3">
        Your Cart <FaCartPlus />
      </h1>
      {/* Close button */}
      <button className="text-xl text-white" onClick={toggleCart}>
        <FaTimes />
      </button>
    </div>
  );
};

export default SidebarHeader;
