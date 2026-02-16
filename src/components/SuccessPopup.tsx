import { X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export const SuccessPopup = ({
    isOpen,
    onClose,
    title = "Message Sent!",
    message = "Thank you for reaching out. We'll get back to you shortly."
}: SuccessPopupProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = "";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`relative bg-[#faf3e0] border-2 border-[#652b32]/10 w-full max-w-sm rounded-2xl p-6 shadow-2xl transform transition-transform duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1 rounded-full hover:bg-[#652b32]/10 transition-colors text-[#652b32]/60 hover:text-[#652b32]"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center space-y-4 pt-2">
                    <div className="w-16 h-16 rounded-full bg-[#652b32]/10 flex items-center justify-center mb-2">
                        <Check className="w-8 h-8 text-[#652b32]" strokeWidth={3} />
                    </div>

                    <h3 className="text-2xl font-bold text-[#652b32]">{title}</h3>

                    <p className="text-[#652b32]/70 leading-relaxed">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full mt-4 py-3 bg-[#652b32] text-[#faf3e0] rounded-xl font-semibold hover:bg-[#652b32]/90 transition-transform active:scale-95 shadow-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};
