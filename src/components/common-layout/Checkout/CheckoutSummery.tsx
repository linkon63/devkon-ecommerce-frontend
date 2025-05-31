type TProps = {
  totalAmount: number;
  shippingCharge: number;
  taxPrice: number;
  subTotalPrice: number;
};

export default function CheckoutSummery({
  totalAmount,
  shippingCharge,
  taxPrice,
  subTotalPrice,
}: TProps) {
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between p-2 border-b border-b-coral">
        <p className="font-medium">Subtotal</p>
        <p>&#x9F3; {subTotalPrice}</p>
      </div>

      <div className="flex justify-between p-2 border-b border-b-coral">
        <p className="font-medium">Tax</p>
        <p>&#x9F3; {taxPrice}</p>
      </div>

      <div className="flex justify-between p-2 border-b border-b-coral">
        <p className="font-medium">Shipping Charge</p>
        <p>&#x9F3; {shippingCharge}</p>
      </div>

      <div className="flex justify-between p-2 border-b border-b-coral">
        <p className="font-medium">Total</p>
        <p>&#x9F3; {totalAmount + shippingCharge}</p>
      </div>
    </div>
  );
}
