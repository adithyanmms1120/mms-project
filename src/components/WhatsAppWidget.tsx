import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, Phone } from "lucide-react";

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

export const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const phoneNumber = "919629593615";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Initial greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                const greeting: Message = {
                    id: '1',
                    text: "Hi, welcome to MediaMatic Studio! 👋\nI’m Aria from the Sales Team.\nWe help brands stand out through creative design, branding, and digital solutions.\nHow can I assist you?",
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages([greeting]);
                setIsTyping(false);
            }, 1000);
        }
    }, [isOpen]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const messageText = inputValue.trim();
        const userMsg: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Redirect to WhatsApp with the user's message
        setTimeout(() => {
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
            window.open(url, "_blank");
            setIsTyping(false);

            // Add a follow-up bot message locally
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Opening WhatsApp to send your message... 🚀",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        }, 800);
    };

    const getBotResponse = (input: string): string => {
        const text = input.toLowerCase();

        if (text.includes("service") || text.includes("offer") || text.includes("do you do") || text.includes("work")) {
            return "Sure 😊 We offer:\n1️⃣ Web Development\n2️⃣ UI/UX Design\n3️⃣ Branding & Marketing\n4️⃣ WhatsApp Automation\nWhich one are you interested in?";
        }

        if (text.includes("price") || text.includes("cost") || text.includes("pricing") || text.includes("how much")) {
            return "Pricing depends on your requirements 💡\nCould you please tell us:\n• Project type\n• Timeline\n• Budget range?";
        }

        if (text.includes("human") || text.includes("talk to") || text.includes("person") || text.includes("call") || text.includes("contact")) {
            return "No problem 👍\nPlease share your name and contact number.\nOur team will reach out shortly.";
        }

        if (text.match(/\d{10}/) || (text.includes("my name is") || text.includes("i am"))) {
            return "Got it! Thanks for sharing. One of our experts will contact you soon. Stay tuned! 🚀";
        }

        return "Sorry, I didn’t fully understand that 😅\nCould you please explain a little more?";
    };

    const handleWhatsAppRedirect = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hi, I'm interested in your services!")}`;
        window.open(url, "_blank");
    };

    return (
        <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom left" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[320px] sm:w-[380px] h-[520px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-white/20"
                    >
                        {/* Header */}
                        <div className="bg-[#652b32] p-5 flex items-center justify-between text-white bg-gradient-to-br from-[#652b32] to-[#853a42]">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shadow-inner">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#652b32] rounded-full shadow-lg" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-sm tracking-tight">Aria • Sales Team</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        <p className="text-[10px] text-white/80 font-medium">Online • Responds instantly</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/20 p-2 rounded-xl transition-all active:scale-95"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap shadow-sm transition-all ${msg.sender === 'bot'
                                            ? 'bg-white text-slate-700 rounded-tl-none border border-gray-100'
                                            : 'bg-[#652b32] text-white rounded-tr-none shadow-[#652b32]/20'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#652b32]/20 focus:border-[#652b32] transition-all"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim()}
                                    className="w-10 h-10 bg-[#652b32] text-white rounded-xl flex items-center justify-center hover:bg-[#853a42] transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#652b32]/20"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-3 flex justify-center border-t border-gray-50 pt-3">
                                <button
                                    onClick={handleWhatsAppRedirect}
                                    className="text-[11px] text-[#25D366] font-semibold flex items-center gap-1.5 hover:bg-[#25D366]/5 px-3 py-1.5 rounded-lg transition-colors group"
                                >
                                    <Phone size={12} className="group-hover:rotate-12 transition-transform" />
                                    Switch to WhatsApp
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative">
                {/* Pulsating Ring Effect */}
                {!isOpen && (
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
                )}

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20 transition-colors ${isOpen ? 'bg-white text-[#652b32]' : 'bg-[#25D366] text-white'
                        }`}
                >
                    {isOpen ? <X size={28} /> : (
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.412c-1.935 0-3.83-.502-5.522-1.456l-.396-.223-4.102 1.075 1.093-4.004-.245-.389C1.905 15.114 1.34 13.084 1.34 10.97c0-5.77 4.135-10.463 9.215-10.463 2.46 0 4.773.96 6.512 2.703 1.739 1.744 2.697 4.061 2.697 6.526 0 5.772-4.136 10.463-9.214 10.463m0-22.346C5.507 0 0 5.4 0 12.046c0 2.125.556 4.2 1.611 6.037L0 24l6.095-1.599c1.808 1.026 3.844 1.568 5.86 1.568 6.522 0 11.821-5.4 11.821-12.046s-5.299-12.046-11.821-12.046" />
                        </svg>
                    )}
                </motion.button>
            </div>
        </div>
    );
};
