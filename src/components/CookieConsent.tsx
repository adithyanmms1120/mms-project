import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ArrowRight, ShieldCheck } from "lucide-react";

export const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        // Set a technical cookie for fast loading reference
        document.cookie = "mms_fast_load=true; max-age=31536000; path=/; SameSite=Lax";
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[200]"
                >
                    <div className="bg-white rounded-3xl shadow-2xl border border-[#652b32]/10 p-6 md:p-8 relative overflow-hidden group">
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#652b32]/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-[#652b32] rounded-xl flex items-center justify-center text-white shadow-lg">
                                    <Cookie className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#652b32] text-lg">Cookie Settings</h3>
                                    <div className="flex items-center gap-1.5 text-[10px] text-[#652b32]/40 font-bold uppercase tracking-widest">
                                        <ShieldCheck className="w-3 h-3" />
                                        Secure & Optimized
                                    </div>
                                </div>
                                <button
                                    onClick={handleDecline}
                                    className="ml-auto p-2 hover:bg-[#652b32]/5 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-[#652b32]/40" />
                                </button>
                            </div>

                            <p className="text-[#652b32]/70 text-sm leading-relaxed mb-6">
                                We use cookies to enhance your experience, serve personalized content, and <span className="text-[#652b32] font-semibold">optimize image loading speeds</span> for a faster browsing session.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 bg-[#652b32] text-white py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-[#652b32]/90 hover:shadow-xl active:scale-95 group/btn"
                                >
                                    Accept All
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-3.5 rounded-2xl border border-[#652b32]/10 text-[#652b32] font-bold text-sm hover:bg-[#652b32]/5 transition-all"
                                >
                                    Manage
                                </button>
                            </div>

                            <p className="mt-4 text-[10px] text-center text-[#652b32]/30 italic">
                                By clicking "Accept All", you agree to our use of cookies for fast loading.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
