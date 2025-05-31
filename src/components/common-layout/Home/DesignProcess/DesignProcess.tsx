import { FaCut, FaBox, FaRuler } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const process = [
  {
    icon: <FaCut className="w-8 h-8" />,
    title: "Design",
    description: "Hand-drawn designs by expert artisans",
  },
  {
    icon: <FaThreads className="w-8 h-8" />,
    title: "Material",
    description: "Premium fabrics and materials selection",
  },
  {
    icon: <FaRuler className="w-8 h-8" />,
    title: "Crafting",
    description: "Meticulous attention to every detail",
  },
  {
    icon: <FaBox className="w-8 h-8" />,
    title: "Finishing",
    description: "Quality checks and perfect packaging",
  },
];

export default function DesignProcess() {
  return (
    <section className="py-24 bg-lightCream">
      <div className="max-w-4xl mx-auto px-6 ">
        <h2 className="text-4xl font-serif text-center mb-4">
          Our Artisanal Process
        </h2>
        <p className="text-center text-darkGray mb-16 max-w-2xl mx-auto">
          Each piece is crafted with precision and care, following our signature
          four-step process that ensures the highest quality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {process?.map((step, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center text-coral group-hover:bg-coral group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-darkGray">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
