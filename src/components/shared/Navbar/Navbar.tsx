import Image from "next/image";
import Link from "next/link";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import logo from "@/assets/Logo/barnoi.png";
import { IDepartment } from "@/types/DepartmentsType";
import { ICategory } from "@/types/CategoriesType";
import { ISubCategory } from "@/types/SubCategoriesType";

const Navbar = async () => {
  const [departmentsJson, categoriesJson, subcategoriesJson] =
    await Promise.all([
      fetch("http://localhost:5000/v1/product-department/public").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5000/v1/product-category/public").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5000/v1/product-sub-category/public").then(
        (res) => res.json()
      ),
    ]);

  const departments = departmentsJson.data;
  const categories = categoriesJson.data.data;
  const subcategories = subcategoriesJson.data.data;

  return (
    <nav className="fixed top-0 w-full bg-lightCream shadow-md z-50">
      {/* Top Bar */}
      <div className="hidden md:flex justify-evenly bg-black text-white p-2">
        <p>Chat with us! We are happy to assist you.</p>
        <p>Eid Exclusive Offer Runnning</p>
        <div>
          <span className="text-muted-foreground mr-1">WhatsApp:</span>
          <a
            href="#"
            target="_blank"
            className="text-coral hover:underline transition-colors"
            rel="noopener noreferrer"
          >
           +8801712508063
          </a>
        </div>
      </div>
      {/* Navbar */}
      <div className="flex justify-between items-center px-6  md:px-[10%] py-8 bg-white">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Logo" width={120} height={40} priority />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-bold uppercase text-lg text-darkGray">
          <li className="relative group cursor-pointer">
          <Link href={`/products`}>
                <span className="hover:text-black">Shop</span>
              </Link>
          </li>
          {departments.map((dept: IDepartment) => (
            <li key={dept.id} className="relative group cursor-pointer">
              {/* <li className="relative group cursor-pointer">
          <Link href={`/products`}>
                <span className="hover:text-black">Shop</span>
              </Link>
          </li> */}
              <Link href={`/${dept?.slug}`}>
                <span className="hover:text-black">{dept.title}</span>
              </Link>

              {/* Dropdown (for Desktop) */}
              <div className="absolute left-0 top-full bg-white shadow-lg border border-darkGray w-[700px] p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible flex gap-8">
                <div>
                  <Image
                    src={dept?.image?.url}
                    alt={dept?.title}
                    width={200}
                    height={150}
                    className="rounded-md"
                  />
                </div>

                <div className="w-2/3 grid grid-cols-2 gap-4">
                  {categories
                    .filter((cat: ICategory) => cat?.departmentId === dept?.id)
                    .map((cat: ICategory) => (
                      <div key={cat?.id}>
                        <Link href={`/${dept?.slug}/${cat?.slug}`}>
                          <h3 className="font-bold text-lg mb-2">
                            {cat?.title}
                          </h3>
                        </Link>
                        <ul className="text-sm text-darkGray font-medium">
                          {subcategories
                            .filter(
                              (sub: ISubCategory) => sub.categoryId === cat.id
                            )
                            .map((sub: ISubCategory) => (
                              <li key={sub?.id} className="hover:text-black">
                                <Link
                                  href={`/${dept?.slug}/${cat?.slug}/${sub?.slug}`}
                                >
                                  {sub?.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </li>
          ))}
          
        </ul>

        {/* Icons */}
        <div className="hidden md:flex gap-5 text-2xl">
          <IoSearch className="cursor-pointer hover:text-darkGray" />
          <Link href="/my-account/purchased-products">
            <FaRegUser className="cursor-pointer hover:text-darkGray" />
          </Link>
          <Link href="/my-cart">
            <RiShoppingBag4Line className="cursor-pointer hover:text-darkGray" />
          </Link>
        </div>
        {/* Mobile Menu Button (only visible on small screens) */}
        <label htmlFor="mobile-menu-toggle" className="md:hidden text-3xl">
          <IoMenu />
        </label>
      </div>

      {/* Mobile Menu (Checkbox-based for SSR-friendly toggling) */}
      <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />
      <div className="absolute top-0 left-0 w-full bg-white shadow-md transform -translate-y-full peer-checked:translate-y-0 transition-transform duration-300 md:hidden">
        <div className="flex justify-between items-center p-4">
          <Image src={logo} alt="Logo" width={100} height={40} />
          <label htmlFor="mobile-menu-toggle" className="text-3xl">
            <IoClose />
          </label>
        </div>
        {/* Mobile Navigation Links */}
        <ul className="flex flex-col text-center text-lg font-bold uppercase text-darkGray">
          {departments.map((dept: IDepartment) => (
            <li key={dept?.id} className="py-3 border-b border-gray-300">
              <Link href={`/${dept?.slug}`}>{dept?.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
