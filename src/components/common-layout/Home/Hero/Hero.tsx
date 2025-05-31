"use client";
/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useGetHeroSectionQuery } from "@/redux/api/hero-section/heroSection";
import Loader from "@/components/ui/Loader";

type TBannerImage = {
  id: string;
  banner: {
    url: string;
    key: string;
  };
  routing_url: string;
  createdAt: string;
  updatedAt: string;
};

export default function Hero() {
  const { data, isLoading } = useGetHeroSectionQuery("");
  const bannerImages: TBannerImage[] = data?.data?.data;
  console.log({ bannerImages });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full overflow-hidden bg-[#f5f2eb] lg:mt-32 lg:28">
      <section className="text-white text-[64px]">
          {/* Hero section */}
          {/* { bannerImages } */}
      </section>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full"
      >
        {bannerImages?.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full ">
              <Link href={slide?.routing_url || ""}>
                <img
                  src={slide?.banner?.url}
                  alt={slide?.banner?.key}
                  // fill
                  // priority={index === 0}
                  // sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                  }}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <div className="swiper-button-prev !text-white !left-4 !after:text-lg z-10">
        <span className="sr-only">Previous</span>
      </div>
      <div className="swiper-button-next !text-white !right-4 !after:text-lg z-10">
        <span className="sr-only">Next</span>
      </div>

      {/* Custom pagination */}
      <div className="swiper-pagination !bottom-4 flex justify-center gap-2 z-10">
        <style jsx>{`
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #ccc;
            opacity: 0.7;
            margin: 0 4px;
          }
          .swiper-pagination-bullet-active {
            background: #fff;
            opacity: 1;
          }
        `}</style>
      </div>
    </div>
  );
}
