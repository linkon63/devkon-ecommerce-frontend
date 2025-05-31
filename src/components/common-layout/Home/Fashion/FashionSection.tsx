import Image from "next/image";
import img from "@/assets/Home/Fashion/Frame 496.png";
import ProductCarouselCard from "../ProductCarouselCard";

export async function FashionSection() {
  const res = await fetch(
    "http://localhost:5000/v1/product/public?departmentId=dc9c20d1-d62f-4462-9b18-d27495bcc990"
  );
  const { data = null } = await res.json();
  const fashionData = data.data;

  return (
    <section className="w-full py-16">
      <div className="w-[90%] mx-auto px-4 lg:flex justify-between gap-5 items-center">
        {/* Left side  */}
        <div className="w-full relative lg:w-1/4  h-[656px]">
          <div className="w-full h-full relative">
            <Image src={img} alt="New Arrival Jewelry" fill />
          </div>
        </div>

        {/* Right side  */}
        <div className="lg:w-4/5">
          <h2 className="text-center text-5xl font-Bold tracking-wider text-darkGray mb-12 mt-12">
            FASHION
          </h2>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product Card Slider */}
            <ProductCarouselCard products={fashionData} />
          </div>
        </div>
      </div>
    </section>
  );
}
