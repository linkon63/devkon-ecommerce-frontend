/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { BsCart3 } from "react-icons/bs";

type TProps = {
  totalItem: number;
  toggleCart: any;
};

const StickyCart = ({ totalItem, toggleCart }: TProps) => {
  return (
    <div className="fixed lg:bottom-[80px] bottom-[100px] rounded-full cursor-pointer border border-coral bg-lightCream lg:p-4 p-2 lg:right-[50px] right-[20px] z-50">
      <p className="relative">
        <span className="absolute lg:bg-coral lg:text-white text-coral lg:right-0 right-1 lg:bottom-8 bottom-5 font-bold  lg:px-2 rounded-full">{totalItem}</span>
        <BsCart3 className="lg:text-5xl text-4xl text-coral p-1" onClick={toggleCart} />
      </p>
    </div>
  );
};

export default StickyCart;
