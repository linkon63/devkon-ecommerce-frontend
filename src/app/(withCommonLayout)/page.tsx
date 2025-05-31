import DesignProcess from "@/components/common-layout/Home/DesignProcess/DesignProcess";
import ExclusivePreview from "@/components/common-layout/Home/ExclusivePreview/ExclusivePreview";
import { FashionSection } from "@/components/common-layout/Home/Fashion/FashionSection";
import Hero from "@/components/common-layout/Home/Hero/Hero";
import { JewelrySection } from "@/components/common-layout/Home/Jewelry/JewelrySection";
import SubscriptionSection from "@/components/common-layout/Home/SubscriptionSection/SubscriptionSection";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";

export async function generateMetadata() {
  const page_slug = "/home";
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}/${page_slug}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    title: "Home",
  });

  return result;
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <JewelrySection />
      <FashionSection />
      <DesignProcess />
      <ExclusivePreview />
      <SubscriptionSection />
    </div>
  );
}
