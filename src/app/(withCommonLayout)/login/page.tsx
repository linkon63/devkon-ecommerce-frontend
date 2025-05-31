import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import dynamic from "next/dynamic";

// Dynamic metadata generation function
export async function generateMetadata() {
  // const page_slug = webpageSlugs?.home;
  const page_slug = "/login";
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: "Login",
  });

  return result;
}

export default function CustomerLoginPage() {
  const Login = dynamic(() => import("@/components/auth/login/Login"));

  return (
    <section>
      <Login />
    </section>
  );
}
