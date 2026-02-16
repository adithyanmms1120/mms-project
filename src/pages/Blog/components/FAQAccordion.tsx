import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "../Blog.module.css";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQItem[];
}

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <div className="my-12">
            <h2 className="text-3xl font-bold mb-6 text-[#652b32]">Frequently Asked Questions</h2>
            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <div key={index} className={styles.accordionItem}>
                        <button
                            onClick={() => toggleFAQ(index)}
                            className={styles.accordionTrigger}
                            aria-expanded={openIndex === index}
                        >
                            <span className="text-left font-semibold text-gray-900">{faq.question}</span>
                            <ChevronDown
                                className={`w-5 h-5 text-[#652b32] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className={styles.accordionContent}>
                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQAccordion;
