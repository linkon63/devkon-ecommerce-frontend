import Image from "next/image";
import Link from "next/link";
import { BiChevronRight, BiMapPin, BiStore } from "react-icons/bi";
import { CgLock } from "react-icons/cg";

export default function SubscriptionSection() {
  return (
    <section className="flex flex-col md:flex-row gap-8 py-24 px-4 w-[80%] mx-auto">
      {/* Left column with image and store info */}
      <div className="flex-1 relative">
        <div className="relative h-[400px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Pristine Couture store interior"
            fill
            className="object-cover rounded-md"
          />
          <div className="absolute bottom-4 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 mx-4 text-center rounded">
            <p className="text-darkGray text-sm">
              D-12 at Painted Tree Boutiques, Dulles Landing Shopping Center,
              Arcola, VA.
            </p>
          </div>
        </div>
      </div>

      {/* Right column with brand story - redesigned */}
      <div
        className="flex-1 flex flex-col justify-center transition-all duration-1000 ease-out"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-light tracking-tight">
              <span className="text-coral font-medium">Pristine</span> Couture
            </h2>
            <div className="h-[2px] w-16 bg-coral/80"></div>
          </div>

          <p className="text-lg font-light text-gray-700 leading-relaxed">
            Where elegance meets contemporary fashion. Our curated collection
            celebrates the modern woman with pieces that transcend seasons.
          </p>

          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-3">
              <BiStore className="h-5 w-5 text-coral mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">
                  Boutique Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Personalized styling and exclusive in-store events
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CgLock className="h-5 w-5 text-coral mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Hours</h3>
                <p className="text-gray-600 text-sm">
                  Monday-Saturday: 10am-8pm
                  <br />
                  Sunday: 11am-6pm
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <BiMapPin className="h-5 w-5 text-coral mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Visit Us</h3>
                <p className="text-gray-600 text-sm">
                  Dulles Landing Shopping Center
                  <br />
                  Arcola, VA
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/products"
              className="group inline-flex items-center space-x-1 text-coral border-b border-coral/30 pb-1 transition-all hover:border-coral"
            >
              <span>Explore our collections</span>
              <BiChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
