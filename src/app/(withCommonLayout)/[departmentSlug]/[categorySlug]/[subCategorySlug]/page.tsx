import NotFound from "@/components/common-layout/NotFound/NotFound";
import Products from "@/components/common-layout/Products/Products";
import RouteBar from "@/components/common-layout/Products/RouteBar";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import React from "react";

type TParams = {
  params: Promise<{ subCategorySlug: string }>;
};

// Dynamic metadata generation function
export async function generateMetadata({ params }: TParams) {
  const { subCategorySlug } = await params;
  const res = await fetch(
    `http://localhost:5000/v1/product-sub-category/public/${subCategorySlug}`
  );
  const { data = null } = await res.json();
  const subCategoryTitle = data?.title;
  const categorySlug = data?.category?.slug;
  const departmentSlug = data?.category?.department?.slug;

  const page_slug = `${departmentSlug}/${categorySlug}/${subCategorySlug}`;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: `${subCategoryTitle}`,
  });

  return result;
}
const SubCategoryPage = async ({ params }: TParams) => {
  const { subCategorySlug } = await params;

  const res = await fetch(
    `http://localhost:5000/v1/product-sub-category/public/${subCategorySlug}`
  );
  const { data = null } = await res.json();
  if (!data) {
    return <NotFound />;
  }
  const subCategoryId = data?.id;

  const routes = [
    {
      slug: `/${data?.category?.department?.slug}`,
      title: data?.category?.department?.title,
    },
    {
      slug: `/${data?.category?.department?.slug}/${data?.category?.slug}`,
      title: data?.category?.title,
    },
    {
      slug: `/${data?.category?.department?.slug}/${data?.category?.slug}/${data?.slug}`,
      title: data?.title,
    },
  ];

  return (
    <section className="mt-40 w-[80%] mx-auto">
      <RouteBar routes={routes} />
      <Products subCategoryId={subCategoryId} />
    </section>
  );
};

export default SubCategoryPage;
