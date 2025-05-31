import { default_meta_info } from "@/constants/metadata";

type TProps = {
  redirect_url: string;
  title: string;
  meta_description?: string;
  meta_keywords?: string;
  og_image?: string;
};

export const generateDynamicMetadataHandler = async ({
  redirect_url,
  title,
  meta_description = default_meta_info?.meta_description,
  meta_keywords = default_meta_info?.meta_keywords,
  og_image = default_meta_info?.og_image,
}: TProps) => {
  return {
    title: `${title} | ${default_meta_info?.meta_title}`,
    description: meta_description,
    keywords: meta_keywords,
    openGraph: {
      title: title || default_meta_info?.meta_title,
      author: default_meta_info?.og_author,
      description: meta_description,
      url: `${redirect_url}`,
      images: [
        {
          url: `${og_image}`,
          width: 600,
          height: 400,
          alt: `${default_meta_info?.meta_title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: default_meta_info?.meta_title,
      description: meta_description,
      images: [og_image],
    },
  };
};
