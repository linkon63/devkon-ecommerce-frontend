import { Mail, Phone, MessageSquare } from "lucide-react";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiSeparator } from "react-icons/ri";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col">
      <div className="w-full bg-white pt-16 pb-6">
        <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto">
          {/* Main Footer Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo & About */}
            <div className="space-y-4">
              <h2 className="font-serif font-bold text-2xl text-coral">
                Softzino Techonologies
              </h2>
              <p className="text-muted-foreground">
                Exquisite fashion solutions crafted with attention to detail and
                passion for excellence.
              </p>
              <div className="flex gap-4 pt-2">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-coral transition-colors"
                >
                  <BsInstagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-coral transition-colors"
                >
                  <FaFacebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-coral transition-colors"
                >
                  <BsTwitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-coral transition-colors"
                >
                  <BsYoutube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Help Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-coral">Help</h3>
              <ul className="space-y-2">
                {[
                  "Order and Cancellation",
                  "Shipping & Delivery",
                  "Contact Us",
                  "FAQs",
                  "Return & Exchange",
                ].map((item, i) => (
                  <li key={i}  title="We are cooking">
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-coral">More</h3>
              <ul className="space-y-2">
                {[
                  "Store Location",
                  "Privacy Policy",
                  "Terms & Condition",
                  "FAQs",
                  "Return & Exchange",
                ].map((item, i) => (
                  <li key={i}  title="We are cooking">
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-coral">Contact</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <Mail className="h-5 w-5 text-coral mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Mail us: </span>
                    <a
                      href="mailto:rahuldas.ju48@gmail.com"
                      className="text-coral hover:underline transition-colors"
                    >
                      softzino@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Phone className="h-5 w-5 text-coral mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Phones: </span>
                    <a
                      href="tel:+15713837479"
                      className="text-coral hover:underline transition-colors"
                    >
                      01723396330
                    </a>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <MessageSquare className="h-5 w-5 text-coral mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground mr-1">
                      WhatsApp:
                    </span>
                    
                      01712508063
                    
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <RiSeparator className="my-6 opacity-50" />

          {/* Copyright Section */}
          <div className="text-center text-sm text-muted-foreground py-4  border-t border-coral">
            <p>
              COPYRIGHT © {`${year}`} ALL RIGHTS RESERVED.
              DESIGNED & DEVELOPED BY @LINKON git@linkon63
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
