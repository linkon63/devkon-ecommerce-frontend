import OrderInvoice from "@/components/common-layout/MyAccount/PurchasedProducts/OrderInvoice";

type TParams = {
  params: Promise<{ orderInvoiceSlug: string }>;
};

const InvoicePage = async ({ params }: TParams) => {
  const { orderInvoiceSlug } = await params;
  console.log(orderInvoiceSlug);
  return (
    <section>
      <OrderInvoice orderId = {orderInvoiceSlug}/>
    </section>
  );
};

export default InvoicePage;
