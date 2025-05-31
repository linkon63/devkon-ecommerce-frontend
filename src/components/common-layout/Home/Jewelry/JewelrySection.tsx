import Image from "next/image";
import img from "@/assets/Home/Jewelry/Frame 495.png";
import ProductCarouselCard from './../ProductCarouselCard';

export async function JewelrySection() {
  const res = await fetch(
    "http://localhost:5000/v1/product/public?departmentId=a7c2c80d-7bd3-45a0-a5cd-04c07e581314"
  );
  const { data = null } = await res.json();
  const jewelryData = data.data;

  return (
    <section className="w-full py-16">
      <div className="w-[90%] mx-auto px-4 lg:flex justify-between gap-5 items-center">
        {/* Left side  */}
        <div className="lg:w-4/5">
          <h2 className="text-center text-5xl font-Bold tracking-wider text-darkGray mb-12">
            JEWELRY
          </h2>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product Card Slider */}
            <ProductCarouselCard products={jewelryData} />
          </div>
        </div>
        {/* Right side  */}
        <div className="w-full relative lg:w-1/4  h-[656px]">
          <div className="w-full h-full relative">
            <Image src={img} alt="New Arrival Jewelry" fill />
          </div>
        </div>
      </div>
    </section>
  );
}
