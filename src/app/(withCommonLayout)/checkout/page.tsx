import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import dynamic from "next/dynamic";

// Dynamic metadata generation function
export async function generateMetadata() {
  // const page_slug = webpageSlugs?.home;
  const page_slug = "/checkout";
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: "Checkout",
  });

  return result;
}

export default function CheckoutPage() {
  const RouteBar = dynamic(
    () => import("@/components/common-layout/Products/RouteBar")
  );
  const Checkout = dynamic(
    () => import("@/components/common-layout/Checkout/Checkout")
  );
  const routes = [{ slug: "/checkout", title: "Checkout" }];
  return (
    <div className="mt-40 lg:w-[80%] w-[90%] mx-auto">
      <RouteBar routes={routes} />
      <Checkout />
    </div>
  );
}
