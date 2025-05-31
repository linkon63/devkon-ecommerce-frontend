/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { priceRanges } from "@/constants/priceRange";
import { Dispatch, RefObject, SetStateAction } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type TProps = {
  priceDropdownRef: RefObject<HTMLDivElement | null>;
  setIsPriceDropdownOpen: Dispatch<SetStateAction<boolean>>;
  isPriceDropdownOpen: boolean;
  selectedPriceRange: any[];
  setSelectedPriceRange: Dispatch<SetStateAction<any[]>>;
};

const PriceFilter = ({
  priceDropdownRef,
  setIsPriceDropdownOpen,
  isPriceDropdownOpen,
  //   priceRanges,
  selectedPriceRange,
  setSelectedPriceRange,
}: TProps) => {
  const togglePriceDropdown = () =>
    setIsPriceDropdownOpen(!isPriceDropdownOpen);

  const handlePriceChange = (min: number, max: number | null) => {
    setSelectedPriceRange((prev) => {
      // If the clicked range is already selected, reset it (deselect)
      return prev[0] && prev[0][0] === min && prev[0][0] === max
        ? []
        : [[min, max]]; // If not, set it as the only selected range
    });
  };
  return (
    <div className="relative inline-block mr-5" ref={priceDropdownRef}>
      <button
        onClick={togglePriceDropdown}
        className="flex items-center space-x-2 font-semibold text-darkGray hover:text-black"
      >
        <span>PRICE</span>
        {isPriceDropdownOpen ? (
          <IoIosArrowUp className="text-xl" />
        ) : (
          <IoIosArrowDown className="text-xl" />
        )}
      </button>

      {isPriceDropdownOpen && (
        <div className="absolute left-0 mt-2 bg-white border border-gray-400 shadow-lg rounded-md z-10 w-36">
          {priceRanges.map(({ label, min, max }) => (
            <label
              key={label}
              className="flex items-center px-4 py-2 border-b last:border-b-0 cursor-pointer"
              onClick={() => handlePriceChange(min, max)} // Handle click on the price range
            >
              <span
                className={`${
                  selectedPriceRange[0] &&
                  selectedPriceRange[0][0] === min &&
                  selectedPriceRange[0][1] === max
                    ? "text-coral font-semibold" // Selected range text color
                    : "text-darkGray"
                }`}
              >
                {label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
