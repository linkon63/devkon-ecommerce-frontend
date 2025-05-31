"use client";
import Loader from "@/components/ui/Loader";
import { useGetOrderInvoiceQuery } from "@/redux/api/order/orderApi";
import { TOrderDataType } from "@/types/orderTypes";
import { format, parseISO } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Scissors } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type TParams = {
  orderId: string;
};

export default function OrderInvoice({ orderId }: TParams) {
  const { data, isLoading } = useGetOrderInvoiceQuery(orderId);
  const order: TOrderDataType = data?.data;

  console.log(order);

  const invoiceRef = React.useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = async () => {
    if (!invoiceRef.current) return;
    try {
      setIsDownloading(true);

      const element = invoiceRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice-${order.orderId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="mt-40 lg:w-[80%] w-[90%] mx-auto">
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFF9E7",
          padding: "2rem",
          border: "1px solid #F47458",
        }}
      >
        <div
          ref={invoiceRef}
          style={{
            maxWidth: "64rem",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "0.75rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            overflow: "hidden",
          }}
        >
          {/* Invoice Header */}
          <div style={{ borderBottom: "1px solid #e5e7eb", padding: "2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Scissors
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                    color: "#f59e0b",
                    marginRight: "0.75rem",
                  }}
                />
                <h1
                  style={{
                    fontSize: "1.875rem",
                    fontFamily: "serif",
                    fontWeight: "bold",
                    color: "#1f2937",
                  }}
                >
                  Pristine Couture
                </h1>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  INVOICE
                </div>
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    color: "#1f2937",
                  }}
                >
                  {format(parseISO(order?.createdAt), "MMM dd, yyyy")}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                fontSize: "0.875rem",
              }}
            >
              <div>
                <p style={{ fontWeight: "500" }}>Pristine Couture, Inc.</p>
                <p style={{ color: "#4b5563" }}>123 Fashion Avenue</p>
                <p style={{ color: "#4b5563" }}>New York, NY 10001</p>
                <p style={{ color: "#4b5563" }}>United States</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p>
                  <span style={{ color: "#6b7280" }}>Web:</span>{" "}
                  pristinecouture.com
                </p>
                <p>
                  <span style={{ color: "#6b7280" }}>Email:</span>{" "}
                  contact@pristinecouture.com
                </p>
                <p>
                  <span style={{ color: "#6b7280" }}>Phone:</span> +1 (555)
                  123-4567
                </p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div
            style={{
              padding: "2rem",
              borderBottom: "1px solid #e5e7eb",
              backgroundColor: "#f9fafb",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontFamily: "serif",
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              Customer Information
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280" }}>Name:</span>{" "}
                  <span style={{ fontWeight: "500" }}>{order?.buyer_name}</span>
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280" }}>Email:</span>{" "}
                  <span style={{ fontWeight: "500" }}>
                    {order?.buyer_email}
                  </span>
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280" }}>Phone:</span>{" "}
                  <span style={{ fontWeight: "500" }}>
                    {order?.buyer_phone}
                  </span>
                </p>
              </div>
              <div>
                <p style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280" }}>Order ID:</span>{" "}
                  <span style={{ fontWeight: "500" }}>{order?.orderId}</span>
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280" }}>Transaction ID:</span>{" "}
                  <span style={{ fontWeight: "500" }}>
                    {order?.transactionId}
                  </span>
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280" }}>Status:</span>{" "}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      backgroundColor:
                        order?.paymentStatus.toLowerCase() === "paid"
                          ? "#ecfdf5"
                          : "#fefce8",
                      color:
                        order.paymentStatus.toLowerCase() === "paid"
                          ? "#047857"
                          : "#854d0e",
                    }}
                  >
                    {order?.paymentStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div style={{ padding: "2rem" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    SKU
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "right",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Qty
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "right",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "right",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Discount
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "right",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Tax
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "right",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody style={{ borderTop: "1px solid #e5e7eb" }}>
                {order?.products.map((product, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      fontSize: "0.875rem",
                    }}
                  >
                    <td
                      style={{
                        padding: "1rem 0.75rem",
                        color: "#1f2937",
                        fontWeight: "500",
                      }}
                    >
                      {product?.name}
                    </td>
                    <td style={{ padding: "1rem 0.75rem", color: "#4b5563" }}>
                      {product.sku}
                    </td>
                    <td
                      style={{
                        padding: "1rem 0.75rem",
                        textAlign: "right",
                        color: "#4b5563",
                      }}
                    >
                      {product?.quantity}
                    </td>
                    <td
                      style={{
                        padding: "1rem 0.75rem",
                        textAlign: "right",
                        color: "#4b5563",
                      }}
                    >
                      &#x9F3;{product?.original_price.toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: "1rem 0.75rem",
                        textAlign: "right",
                        color: "#4b5563",
                      }}
                    >
                      &#x9F3;{product?.discount_price.toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: "1rem 0.75rem",
                        textAlign: "right",
                        color: "#4b5563",
                      }}
                    >
                      &#x9F3;{product?.tax_price.toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: "1rem 0.75rem",
                        textAlign: "right",
                        fontWeight: "500",
                        color: "#1f2937",
                      }}
                    >
                      &#x9F3;{product?.selling_price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div
            style={{
              padding: "2rem",
              backgroundColor: "#f9fafb",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Downloaded Date: {today}
            </div>
            <div style={{ maxWidth: "16rem", marginLeft: "auto" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ color: "#4b5563" }}>Subtotal:</span>
                <span style={{ fontWeight: "500" }}>
                  &#x9F3;{order.totalAmount.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ color: "#4b5563" }}>Delivery Charge:</span>
                <span style={{ fontWeight: "500" }}>
                  &#x9F3;{order?.delivery_charge.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "1rem",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: "500", color: "#1f2937" }}>
                  Total:
                </span>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#1f2937",
                  }}
                >
                  &#x9F3;{(order?.totalAmount + order?.delivery_charge).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6b7280",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <p>Thank you for shopping with Pristine Couture.</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Button */}
          <div
            style={{
              maxWidth: "64rem",
              margin: "2rem auto 0",
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            <Link href="/my-account/purchased-products">
              <button
                style={{
                  gap: "0.5rem",
                  padding: "0.625rem 1.5rem",
                  backgroundColor: "#F47458",
                  color: "white",
                  borderRadius: "0.5rem",
                }}
              >
                Go Back
              </button>
            </Link>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.5rem",
                backgroundColor: "#F47458",
                color: "white",
                borderRadius: "0.5rem",
                cursor: isDownloading ? "not-allowed" : "pointer",
                opacity: isDownloading ? "0.75" : "1",
              }}
            >
              {isDownloading ? (
                <>
                  <svg
                    style={{
                      animation: "spin 1s linear infinite",
                      height: "1rem",
                      width: "1rem",
                    }}
                    viewBox="0 0 24 24"
                  >
                    <circle
                      style={{ opacity: "0.25" }}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      style={{ opacity: "0.75" }}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Download style={{ height: "1rem", width: "1rem" }} />
                  Download Invoice
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
