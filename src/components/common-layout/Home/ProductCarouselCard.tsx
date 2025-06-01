/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

export default function ProductCarouselCard({ products }: any) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full product-swiper"
      >
        {products.map((product: any) => {
          const discountedPrice =
            product.discount_rate > 0
              ? product.original_price * (1 - product.discount_rate / 100)
              : product.original_price;

          return (
            <SwiperSlide key={product.id}>
              <Link href={`/products/${product.sku.toLowerCase()}`}>
                <div className="flex flex-col relative">
                  {product.discount_rate > 0 && (
                    <span className="text-sm absolute px-3 py-1 ml-2 mt-2 bg-coral rounded-lg text-white z-10">
                      {product.discount_rate}% Off
                    </span>
                  )}
                  <div className="relative w-full h-80 mb-4 overflow-hidden">
                    <Image
                      src={product.cover_image.url}
                      alt={product.title ?? "product image"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between text-center">
                    <h2 className="text-lg font-semibold text-wrap">
                      {product.name}
                    </h2>
                    <div>
                      <span className="text-xl font-bold text-coral">
                        BDT:{discountedPrice.toFixed(2)}
                      </span>
                      {product.discount_rate > 0 && (
                        <span className="text-xl font-medium line-through mx-4">
                          BDT:{product.original_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
        <div className="swiper-button-prev !text-white !left-5 !after:text-lg z-10"></div>
        <div className="swiper-button-next !text-white !right-5 !after:text-lg z-10"></div>
      </Swiper>
      <div className="swiper-pagination mt-6 flex justify-center gap-2">
        <style jsx>{`
          :global(.swiper-pagination-bullet) {
            width: 10px;
            height: 10px;
            background: #ccc;
            opacity: 0.7;
            margin: 0 4px;
          }
          :global(.swiper-pagination-bullet-active) {
            background: #666;
            opacity: 1;
          }
        `}</style>
      </div>
    </div>
  );
}
