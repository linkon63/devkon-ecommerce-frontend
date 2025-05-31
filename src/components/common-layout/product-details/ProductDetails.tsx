import { TProductDetails } from "@/types/ProductsType";
import { IoInformationCircleOutline } from "react-icons/io5";
import ProductImageSection from "./ProductImageSection";
import AddToCartSection from "./AddToCartSection";
import ProductSKU from "./ProductSKU";

type TProps = {
  product: TProductDetails;
};

const ProductDetails = ({ product }: TProps) => {
  const allImage = [product?.cover_image, ...product?.product_images];
  // Calculate discounted price
  const discountedPrice =
    product?.original_price * (1 - product?.discount_rate / 100);

  return (
    <div className="px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images Section */}
        <ProductImageSection images={allImage} />
        {/* Product Details Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold text-foreground mb-4">
            {product?.name}
          </h1>

          <div className="mb-6">
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                {/* Display the discounted price */}
                {discountedPrice && product?.discount_rate > 0 ? (
                  <span className="text-3xl font-bold text-coral">
                    &#x9F3;{discountedPrice.toFixed(2)}
                  </span>
                ) : (
                  // If no discount, just show original price
                  <span className="text-3xl font-bold text-coral">
                    &#x9F3;{product?.original_price}
                  </span>
                )}

                {/* Display original price with strikethrough if there is a discount */}
                {product?.discount_rate > 0 && (
                  <span className="text-3xl font-medium text-black line-through">
                    &#x9F3;{product?.original_price}
                  </span>
                )}

                {/* Optionally, display the discount rate */}
                {product?.discount_rate > 0 && (
                  <span className="text-sm px-3 py-1 bg-coral rounded-lg text-white">
                    {product?.discount_rate}% Off
                  </span>
                )}
              </div>
            </div>
          </div>

          <ProductSKU sku={product?.sku} />

          <div className="mb-6">
            <p className="text-sm font-medium mb-1">Color: {product?.color}</p>
          </div>

          {/* Quantity Selector */}
          <AddToCartSection sizes={product?.sizes} productId={product?.id} />

          {/* Product Info Accordion */}
          <div className="border-t border-border pt-4">
            <div className="py-3 border-b border-border">
              <button className="flex items-center justify-between w-full text-left">
                <span className="font-medium">Product Info</span>
                <IoInformationCircleOutline size={18} />
              </button>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>{product?.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {product?.contents && (
        <div className="mt-8 py-3 border-b border-border">
          <button className="flex items-center justify-start w-full text-left">
            <span className="font-medium mr-2">Product Specification</span>
            <IoInformationCircleOutline size={18} />
          </button>
          <div
            dangerouslySetInnerHTML={{ __html: product?.contents }}
            className="text-editor mt-2 text-sm text-muted-foreground"
          ></div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
