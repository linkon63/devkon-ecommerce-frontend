import NotFound from "@/components/common-layout/NotFound/NotFound";
import Products from "@/components/common-layout/Products/Products";
import RouteBar from "@/components/common-layout/Products/RouteBar";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import React from "react";

type TParams = {
  params: Promise<{ departmentSlug: string }>;
};

// Dynamic metadata generation function
export async function generateMetadata({ params }: TParams) {
  const { departmentSlug } = await params;
  const res = await fetch(
    `http://localhost:5000/v1/product-department/public/${departmentSlug}`
  );
  const { data = null } = await res.json();
  const departmentTitle = data?.title;
  const departmentImage = data?.image?.url;

  // const page_slug = webpageSlugs?.home;
  const page_slug = `${departmentSlug}`;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: `${departmentTitle}`,
    og_image: departmentImage,
  });

  return result;
}

const DepartmentPage = async ({ params }: TParams) => {
  const { departmentSlug } = await params;

  const res = await fetch(
    `http://localhost:5000/v1/product-department/public/${departmentSlug}`
  );
  const { data = null } = await res.json();
  if (!data) {
    return <NotFound />;
  }
  const departmentId = data?.id;

  const routes = [{ slug: `/${data.slug}`, title: data?.title }];

  return (
    <section className="mt-40 w-[80%] mx-auto">
      <RouteBar routes={routes} />
      <Products departmentId={departmentId} />
    </section>
  );
};

export default DepartmentPage;
