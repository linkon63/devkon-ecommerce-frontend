import RouteBar from "@/components/common-layout/Products/RouteBar";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import dynamic from "next/dynamic";

// Dynamic metadata generation function
export async function generateMetadata() {
  // const page_slug = webpageSlugs?.home;
  const page_slug = "/my-account/purchased-products";
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: "Purchased Products",
  });

  return result;
}

export default function PurchasedProductPage() {
  const routes = [{ slug: "/my-account/purchased-products", title: "My Account / Purchased Products" }];
  const PurchasedProducts = dynamic(
    () =>
      import(
        "@/components/common-layout/MyAccount/PurchasedProducts/PurchasedProducts"
      )
  );
  return (
    <div className="mt-40 lg:w-[80%] w-[90%] mx-auto">
      <RouteBar routes={routes} />
      <PurchasedProducts />
    </div>
  );
}
