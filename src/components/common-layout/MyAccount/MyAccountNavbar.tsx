"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyAccountNavbar() {
  const pathname = usePathname();
  
  const profileClass =
  pathname === '/my-account/profile'
    ? 'border-b pb-4 border-b-coral lg:pl-[48px]'
    : 'border-b pb-4 border-b-coral lg:mt-0 mt-10';

  return (
    <nav className={profileClass}>
      <ul className="flex gap-4">
        <li>
          <Link
            href="/my-account/profile"
            className={`font-bold ${
              pathname === "/my-account/profile" ? "text-coral" : "text-darkGray"
            }`}
          >
            DASHBOARD
          </Link>
        </li>
        <li>
          <Link
            href="/my-account/purchased-products"
            className={`font-bold ${
              pathname === "/my-account/purchased-products" ? "text-coral" : "text-darkGray"
            }`}
          >
            PURCHASED PRODUCTS
          </Link>
        </li>
      </ul>
    </nav>
  );
}
