import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQBrandStyleProps {
    faqs: FAQItem[];
    title?: string;
}

const FAQBrandStyle = ({ faqs, title = "Frequently Asked Questions" }: FAQBrandStyleProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs?.length) return null;

    return (
        <div className="w-full max-w-4xl mx-auto px-0">
            {/* Section Header */}
            <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-black text-[#652b32] tracking-tight">
                    {title}
                </h2>
                <p className="mt-4 text-[#652b32]/40 font-bold uppercase tracking-[0.3em] text-xs">Knowledge Base</p>
            </div>

            {/* FAQ Accordion List */}
            <div className="space-y-0">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className=""
                        >
                            {/* Question Trigger */}
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-full flex items-center justify-between text-left gap-6 py-3 md:py-4 focus:outline-none group"
                                aria-expanded={isOpen}
                            >
                                <span className={`text-lg md:text-xl font-medium tracking-tight transition-colors duration-300 ${isOpen ? "text-[#652b32]" : "text-gray-900 group-hover:text-[#652b32]"}`}>
                                    {faq.question}
                                </span>

                                <div className={`
                                    flex-shrink-0 w-8 h-8 rounded-full border-2 border-[#652b32]/20 flex items-center justify-center transition-all duration-300
                                    ${isOpen ? "bg-[#652b32] border-[#652b32] text-white rotate-45" : "bg-transparent text-[#652b32] group-hover:border-[#652b32]"}
                                `}>
                                    <Plus size={16} strokeWidth={3} />
                                </div>
                            </button>

                            {/* Answer Content */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key={`faq-content-${index}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="pb-8 text-sm md:text-base text-[#652b32]/80 leading-[1.8] font-medium">
                                            <div
                                                className="prose prose-maroon max-w-none"
                                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FAQBrandStyle;
