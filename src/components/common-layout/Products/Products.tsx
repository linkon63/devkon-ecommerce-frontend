/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ProductSize, TProduct } from "@/types/ProductsType";
import Loader from "@/components/ui/Loader";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import ColorFilter from "./filters/ColorFilter";
import SizeFilter from "./filters/SizeFilter";
import PriceFilter from "./filters/PriceFilter";
import Link from "next/link";
import NoProductFountImage from "./NoProductFountImage";

type TProps = {
  departmentId?: string;
  categoryId?: string;
  subCategoryId?: string;
};

type TProductParams = {
  page?: number;
  limit?: number;
  filter_color?: string;
  filter_size?: string;
  min_price?: string;
  max_price?: string;
  departmentId?: string;
  categoryId?: string;
  sub_categoryId?: string;
};

const Products = ({ departmentId, categoryId, subCategoryId }: TProps) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit, setLimit] = useState(8);
  const [error, setError] = useState(null);
  const totalPage = Math.ceil(totalProducts / limit);

  const colorDropdownRef = useRef<HTMLDivElement>(null);
  const sizeDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);

  // filtering logic

  const [allColor, setAllColor] = useState<string[] | []>([]);
  const [allSizes, setAllSizes] = useState<any[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[] | []>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<any[]>([]);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  // Prepare the min and max price if a price range is selected
  const minPrice = selectedPriceRange[0] ? selectedPriceRange[0][0] : null;
  const maxPrice = selectedPriceRange[0] ? selectedPriceRange[0][0] : null;

  const params: TProductParams = {};

  if (!!page) {
    params["page"] = page;
  }
  if (!!limit) {
    params["limit"] = limit;
  }
  if (selectedColors.length > 0) {
    params["filter_color"] = selectedColors.join(",");
  }
  if (selectedSizes.length > 0) {
    params["filter_size"] = selectedSizes.join(",");
  }
  if (!!minPrice) {
    params["min_price"] = minPrice;
  }
  if (!!maxPrice) {
    params["max_price"] = maxPrice;
  }
  if (!!departmentId) {
    params["departmentId"] = departmentId;
  }
  if (!!categoryId) {
    params["categoryId"] = categoryId;
  }
  if (!!subCategoryId) {
    params["sub_categoryId"] = subCategoryId;
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/v1/product/public`, {
        params,
      })
      .then((response) => {
        setProducts(response.data.data.data);
        setTotalProducts(response.data.data.meta.total);
        const products: TProduct[] = response?.data?.data?.data;

        // Set unique colors only once
        if (allColor.length === 0) {
          const uniqueColors = [
            ...new Set(
              products.map((product) =>
                product?.color ? product?.color : "N/A"
              )
            ),
          ];
          setAllColor(uniqueColors);
        }

        // Set unique sizes only once
        if (allSizes.length === 0) {
          const uniqueSizes = [
            ...new Set(
              products
                .map((product) => product.productSizes)
                .flat()
                .map((size: ProductSize) => size.title)
            ),
          ];
          setAllSizes(uniqueSizes);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    limit,
    selectedColors,
    selectedSizes,
    minPrice,
    maxPrice,
    departmentId,
    categoryId,
    subCategoryId,
  ]);

  useEffect(() => {
    // Function to handle click outside of the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorDropdownRef.current &&
        !colorDropdownRef.current.contains(event.target as Node)
      ) {
        setIsColorDropdownOpen(false);
      }
      if (
        sizeDropdownRef.current &&
        !sizeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSizeDropdownOpen(false);
      }
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPriceDropdownOpen(false);
      }
    };

    // Add event listener for mouse click
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="min-h-[40vh]">
      <div>
        {totalProducts > 0 && <h1 className="text-2xl font-semibold mb-6">
          {totalProducts} Products Found
        </h1>}
        {/* filtering options */}
        {
          totalProducts > 0 &&
          <div className="lg:flex justify-between items-center mb-6 p-4">
            <div className="flex">
              {/* Color Filter Dropdown */}
              <ColorFilter
                allColor={allColor}
                colorDropdownRef={colorDropdownRef}
                setSelectedColors={setSelectedColors}
                selectedColors={selectedColors}
                setIsColorDropdownOpen={setIsColorDropdownOpen}
                isColorDropdownOpen={isColorDropdownOpen}
              />

              {/* Size Filter Dropdown */}
              <SizeFilter
                allSizes={allSizes}
                sizeDropdownRef={sizeDropdownRef}
                setSelectedSizes={setSelectedSizes}
                selectedSizes={selectedSizes}
                setIsSizeDropdownOpen={setIsSizeDropdownOpen}
                isSizeDropdownOpen={isSizeDropdownOpen}
              />

              {/* Price Filter Dropdown */}
              <PriceFilter
                // priceRanges={priceRanges}
                priceDropdownRef={priceDropdownRef}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedPriceRange={selectedPriceRange}
                setIsPriceDropdownOpen={setIsPriceDropdownOpen}
                isPriceDropdownOpen={isPriceDropdownOpen}
              />
            </div>

            {/* Dropdown for Selecting Products Per Page */}
            <div className="text-lg font-semibold lg:mt-0 mt-3">
              <span>show : </span>
              <select
                className="bg-coral text-white p-2 rounded-lg text-lg ml-3"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
            </div>
          </div>
        }
      </div>
      {totalProducts !== 0 ? (
        <div className="text-darkGray">
          {/* Products List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: TProduct) => (
              <ProductCard key={product?.sku} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPage > 1 && (
            <Pagination page={page} setPage={setPage} totalPage={totalPage} />
          )}
        </div>
      ) : (
        <div className="">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-coral text-center">
              No Product Found!
            </h1>
            <Link
              href="/products"            >
              <button className="px-6 mt-2 py-2 border border-coral transition-all duration-200 rounded text-darkGray hover:bg-coral hover:border-none hover:text-white">
                Continue Shopping
              </button>
            </Link>
          </div>


          <div>
            <NoProductFountImage />
          </div>

        </div>
      )}
    </section>
  );
};

export default Products;