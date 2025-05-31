import Profile from "@/components/common-layout/MyAccount/Profile/Profile";
import RouteBar from "@/components/common-layout/Products/RouteBar";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";

// Dynamic metadata generation function
export async function generateMetadata() {
  // const page_slug = webpageSlugs?.home;
  const page_slug = "/my-account/profile";
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: "Profile",
  });

  return result;
}

export default function MyProfilePage() {
    const routes = [{ slug: "/my-account/profile", title: "My Account / Profile" }];
  return (
    <div className="mt-40 lg:w-[80%] w-[90%] mx-auto">
      <RouteBar routes={routes} />
      <Profile />
    </div>
  );
}
