"use client";

import { Dispatch, RefObject, SetStateAction } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type TProps = {
  sizeDropdownRef: RefObject<HTMLDivElement | null>;
  setIsSizeDropdownOpen: Dispatch<SetStateAction<boolean>>;
  isSizeDropdownOpen: boolean;
  allSizes: string[];
  selectedSizes: string[];
  setSelectedSizes: Dispatch<SetStateAction<string[]>>;
};

const SizeFilter = ({
  sizeDropdownRef,
  setIsSizeDropdownOpen,
  isSizeDropdownOpen,
  allSizes,
  selectedSizes,
  setSelectedSizes,
}: TProps) => {
  const toggleSizeDropdown = () => setIsSizeDropdownOpen(!isSizeDropdownOpen);
  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  return (
    <div className="relative inline-block mr-5" ref={sizeDropdownRef}>
      <button
        onClick={toggleSizeDropdown}
        className="flex items-center space-x-2 font-semibold text-darkGray hover:text-black"
      >
        <span>SIZE</span>
        {isSizeDropdownOpen ? (
          <IoIosArrowUp className="text-xl" />
        ) : (
          <IoIosArrowDown className="text-xl" />
        )}
      </button>

      {isSizeDropdownOpen && (
        <div className="absolute left-0 mt-2 bg-white w-52 border border-gray-400 shadow-lg rounded-md z-10 grid grid-cols-2">
          {allSizes.map((size) => (
            <label
              key={size}
              className="flex items-center  px-4 py-2 border-b last:border-b-0 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="mr-2"
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeFilter;
