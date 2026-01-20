import React from "react";
import { motion } from "framer-motion";

export const WhatsAppWidget = () => {
    const phoneNumber = "919629593615";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed bottom-6 left-6 z-[9999]"
        >
            {/* Pulsating Ring Effect */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-[#25D366] rounded-full"
            />

            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] border-2 border-white/20 cursor-pointer overflow-hidden group"
                title="Chat with us on WhatsApp"
            >
                {/* Glossy Overlay */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 group-hover:bg-white/20 transition-colors" />

                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-md"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.412c-1.935 0-3.83-.502-5.522-1.456l-.396-.223-4.102 1.075 1.093-4.004-.245-.389C1.905 15.114 1.34 13.084 1.34 10.97c0-5.77 4.135-10.463 9.215-10.463 2.46 0 4.773.96 6.512 2.703 1.739 1.744 2.697 4.061 2.697 6.526 0 5.772-4.136 10.463-9.214 10.463m0-22.346C5.507 0 0 5.4 0 12.046c0 2.125.556 4.2 1.611 6.037L0 24l6.095-1.599c1.808 1.026 3.844 1.568 5.86 1.568 6.522 0 11.821-5.4 11.821-12.046s-5.299-12.046-11.821-12.046" />
                </svg>
            </motion.a>
        </motion.div>
    );
};
