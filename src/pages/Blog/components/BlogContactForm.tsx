import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import styles from "../Blog.module.css";

const BlogContactForm = () => {
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
        <div className={styles.sidebarCard}>
            <h3 className={`text-xl font-bold mb-4 text-[#652b32]`}>Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div>
                    <textarea
                        name="message"
                        placeholder="Your Message..."
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${styles.button}`}
                >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isSending ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
};

export default BlogContactForm;
