import React from "react";

type TProps = {
  name: string;
  shippingInfo: {
    address_line: string;
    city: string;
    state: string;
    country: string;
  };
};

const ShippingInfo = ({ name, shippingInfo }: TProps) => {
  return (
    <div className="w-full border-t border-t-coral">
      <h3 className="font-medium mb-4 mt-12">Shipping Information</h3>
      <div className="space-y-1">
        <p>{name}</p>
        <p className="text-sm text-darkGray">
          {shippingInfo?.address_line} , {shippingInfo?.city}
        </p>
        <p className="text-sm text-darkGray">
          {" "}
          {shippingInfo?.state}, {shippingInfo?.country}
        </p>
      </div>
    </div>
  );
};

export default ShippingInfo;
