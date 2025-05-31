import React, { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type TProps = {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  totalPage: number;
};

const Pagination = ({ setPage, page, totalPage }: TProps) => {
  console.log({ page, totalPage });
  return (
    <div className="flex justify-end mt-6 space-x-4 mr-3">
      <button
        className="px-4 py-2 bg-coral text-white rounded hover:bg-lightCream hover:text-black"
        onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        <IoIosArrowBack />
      </button>
      <span className="px-4 py-2 bg-coral text-white rounded ">
        {page} / {totalPage}
      </span>
      <button
        className="px-4 py-2 bg-coral text-white rounded hover:bg-lightCream hover:text-black"
        onClick={() => setPage((prev: number) => prev + 1)}
        disabled={totalPage === page}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
