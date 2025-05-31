import NotFound from "@/components/common-layout/NotFound/NotFound";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { TProductDetails } from "@/types/ProductsType";
import dynamic from "next/dynamic";

type TParams = {
  params: Promise<{ sku: string }>;
};

// Dynamic metadata generation function
export async function generateMetadata({ params }: TParams) {
  const { sku } = await params;
  const upper_sku = sku.toUpperCase();
  console.log(upper_sku)
  const res = await fetch(`http://localhost:5000/v1/product/${upper_sku}`);
  const { data } = await res.json();

  const productName = data?.name;
  const productImage = data?.cover_image?.url;
  const productDescription = data?.summary;

  // const page_slug = webpageSlugs?.home;
  const page_slug = `products/${sku}`;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: `${productName}`,
    og_image: productImage,
    meta_description: productDescription,
  });

  return result;
}

const ProductDetailsPage = async ({ params }: TParams) => {
  const { sku } = await params;
  const ProductDetails = dynamic(
    () => import("@/components/common-layout/product-details/ProductDetails")
  );
  const upper_sku = sku.toUpperCase();
  const res = await fetch(`http://localhost:5000/v1/product/${upper_sku}`);
  const { data } = await res.json();

  if (!data) {
    return <NotFound />;
  }

  const product: TProductDetails = data;
  return (
    <section className="mt-40 w-[80%] mx-auto">
      <ProductDetails product={product} />
    </section>
  );
};

export default ProductDetailsPage;
