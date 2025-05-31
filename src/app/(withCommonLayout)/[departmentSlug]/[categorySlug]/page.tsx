import NotFound from "@/components/common-layout/NotFound/NotFound";
import Products from "@/components/common-layout/Products/Products";
import RouteBar from "@/components/common-layout/Products/RouteBar";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import React from "react";

type TParams = {
  params: Promise<{ categorySlug: string }>;
};

// Dynamic metadata generation function
export async function generateMetadata({ params }: TParams) {
  const { categorySlug } = await params;
  const res = await fetch(
    `http://localhost:5000/v1/product-category/public/${categorySlug}`
  );
  const { data = null } = await res.json();
  console.log({ data });
  const categoryTitle = data?.title;
  const departmentSlug = data?.department?.slug;

  const page_slug = `${departmentSlug}/${categorySlug}`;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: `${categoryTitle}`,
  });

  return result;
}

const CategoryPage = async ({ params }: TParams) => {
  const { categorySlug } = await params;

  const res = await fetch(
    `http://localhost:5000/v1/product-category/public/${categorySlug}`
  );
  const { data = null } = await res.json();
  if (!data) {
    return <NotFound />;
  }
  const categoryId = data?.id;

  const routes = [
    { slug: `/${data?.department?.slug}`, title: data?.department?.title },
    { slug: `/${data?.department?.slug}/${data?.slug}`, title: data?.title },
  ];

  return (
    <section className="mt-40 w-[80%] mx-auto">
      <RouteBar routes={routes} />
      <Products categoryId={categoryId} />
    </section>
  );
};

export default CategoryPage;
