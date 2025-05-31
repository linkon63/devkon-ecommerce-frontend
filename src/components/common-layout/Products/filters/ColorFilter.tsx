"use client";
import { Dispatch, RefObject, SetStateAction } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type TProps = {
  colorDropdownRef: RefObject<HTMLDivElement | null>;
  setIsColorDropdownOpen: Dispatch<SetStateAction<boolean>>;
  isColorDropdownOpen: boolean;
  allColor: string[];
  selectedColors: string[];
  setSelectedColors: Dispatch<SetStateAction<string[]>>;
};

const ColorFilter = ({
  colorDropdownRef,
  setIsColorDropdownOpen,
  isColorDropdownOpen,
  allColor,
  selectedColors,
  setSelectedColors,
}: TProps) => {
  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleColorDropdown = () =>
    setIsColorDropdownOpen(!isColorDropdownOpen);

  return (
    <div className="relative inline-block mr-5" ref={colorDropdownRef}>
      <button
        onClick={toggleColorDropdown}
        className="flex items-center space-x-2 font-semibold text-darkGray hover:text-black"
      >
        <span>COLOR</span>
        {isColorDropdownOpen ? (
          <IoIosArrowUp className="text-xl" />
        ) : (
          <IoIosArrowDown className="text-xl" />
        )}
      </button>

      {isColorDropdownOpen && (
        <div className="absolute left-0 mt-2 bg-white border border-gray-400 shadow-lg rounded-md z-10">
          {allColor.map((color: string) => (
            <label
              key={color}
              className="flex items-center px-4 py-2 border-b last:border-b-0 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
                className="mr-2"
              />
              <span>{color}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorFilter;
