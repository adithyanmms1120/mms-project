import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import styles from "../Blog.module.css";

interface BlogContactFormProps {
    variant?: 'card' | 'ghost';
}

const BlogContactForm = ({ variant = 'card' }: BlogContactFormProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const response = await fetch("https://mediamaticstudio.com/api/contact/send/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to send message");

            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            toast.error("Failed to send message, please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className={variant === 'card' ? styles.sidebarCard : "relative"}>
            <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-black text-[#652b32] mb-2 tracking-tight">Get in Touch</h3>
                <p className="text-[#652b32]/60 text-sm font-medium">Have questions? We'd love to hear from you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#652b32]/30 group-focus-within:text-[#652b32] transition-colors">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={`${styles.input} !pl-12`}
                        />
                    </div>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#652b32]/30 group-focus-within:text-[#652b32] transition-colors">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.input} !pl-12`}
                        />
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#652b32]/30 group-focus-within:text-[#652b32] transition-colors">
                        <Phone size={18} />
                    </div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`${styles.input} !pl-12`}
                    />
                </div>

                <div className="relative group">
                    <div className="absolute left-4 top-4 text-[#652b32]/30 group-focus-within:text-[#652b32] transition-colors">
                        <MessageSquare size={18} />
                    </div>
                    <textarea
                        name="message"
                        placeholder="Your Message..."
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`${styles.input} !pl-12 !pt-3.5`}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-[#652b32]/10 ${styles.button}`}
                >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Send className="w-4 h-4 text-white" />}
                    {isSending ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
};

export default BlogContactForm;
