// import Link from "next/link";
import ProfileBottomSection from "./ProfileBottomSection";
import ProfileFormSection from "./ProfileFormSection";
import MyAccountNavbar from "../MyAccountNavbar";

export default function Profile() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto lg:w-[80%]">
        <div className="">
          <div className="lg:p-8">
            <MyAccountNavbar/>
            <ProfileFormSection />
            <ProfileBottomSection />
          </div>
        </div>
      </div>
    </div>
  );
}
