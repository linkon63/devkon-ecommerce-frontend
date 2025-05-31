import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import dynamic from "next/dynamic";

// Dynamic metadata generation function
export async function generateMetadata() {
  // const page_slug = webpageSlugs?.home;
  const page_slug = "/my-cart";
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: "My Cart",
  });

  return result;
}

export default function MyCartPage() {
  const routes = [{ slug: "/my-cart", title: "Cart" }];
  const RouteBar = dynamic(
    () => import("@/components/common-layout/Products/RouteBar")
  );
  const MyCart = dynamic(
    () => import("@/components/common-layout/MyCart/MyCart")
  );
  return (
    <section className="mt-40 lg:w-[80%] w-[90%] mx-auto">
      <RouteBar routes={routes} />
      <MyCart />
    </section>
  );
}
