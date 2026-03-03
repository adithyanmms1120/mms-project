import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PodcastBookingDialog } from "@/components/PodcastBookingDialog";
import { Link } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Camera,
    Sun,
    Palette,
    Volume2,
    Armchair,
    Mic,
    Film,
    FileText,
    User,
    Rocket,
    Megaphone,
    Settings,
    Award,
    Mic2,
    BookOpen,
    Globe,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchRecentPosts } from "@/services/api";
import BlogCard from "./Blog/components/BlogCard";
import { Loader2, ArrowRight } from "lucide-react";

// Assets imports
import heroImage from "@/assets/cbe podcast/bg3.JPG";
import servicesBg from "@/assets/cbe podcast/bg2.JPG";
import podcastImg from "@/assets/cbe podcast/Podcast Recording.png";
import distributionImg from "@/assets/cbe podcast/Distribution & Platform Management.jpg";
import launchImg from "@/assets/cbe podcast/Podcast Launch Support.jpg";
import brandingImg from "@/assets/cbe podcast/Individual Branding.png";
import featureAudio from "@/assets/cbe podcast/podcast about.png";
import dubbingStudioImg from "@/assets/cbe podcast/Dubbing Studio.png";
import podcastStudio from "@/assets/cbe podcast/Podcast Recording Studio.webp";
import businessPortrait from "@/assets/cbe podcast/Product Photo Shoot.webp";
import dubbingStudio from "@/assets/cbe podcast/audio.webp";


// ── Data ────────────────────────────────────────────────────────────────

const features = [
    {
        icon: Camera,
        title: "4K Ultra HD Multi-Camera Configuration",
        desc: "Record in 4K with crystal-clear clarity and capture multiple angles.",
    },
    {
        icon: Sun,
        title: "Cinematic-Grade Lighting",
        desc: "Professional lighting enhances clarity and visual appeal.",
    },
    {
        icon: Palette,
        title: "Customizable Set Design",
        desc: "Flexible backgrounds tailored to your branding needs.",
    },
    {
        icon: Volume2,
        title: "Soundproof, Acoustically Treated Studio",
        desc: "Improved sound quality in a noise-free, echo-controlled setting.",
    },
    {
        icon: Armchair,
        title: "Luxury Seating & Premium Sofas",
        desc: "Comfortable interiors designed for long recording sessions.",
    },
];

const services = [
    {
        icon: Mic,
        title: "Podcast Recording Space",
        description:
            "Our fully equipped Podcast recording space provides a comfortable, soundproof environment for solo recordings and group discussions. The Podcast studio In Coimbatore is flexible to match your creative needs.",
    },
    {
        icon: Film,
        title: "Audio & Video Editing",
        description:
            "We professionally edit your recording studio podcast with noise reduction, sound balancing, and seamless multi-camera video production for polished final output.",
    },
    {
        icon: FileText,
        title: "Script Development",
        description:
            "To guarantee clarity, interest, and consistency, our team assists with concept planning, script structuring, and episode formatting.",
    },
    {
        icon: User,
        title: "Individual Branding",
        description:
            "Through strategic Podcast Services, we align your messaging with your personal or corporate identity to strengthen authority and influence.",
    },
    {
        icon: Rocket,
        title: "Podcast Launch Support",
        description:
            "From show naming to publishing your first episode, we guide you through every step for a smooth and professional launch.",
    },
    {
        icon: Megaphone,
        title: "Promotion and Marketing",
        description:
            "To increase the audience for your podcast, we produce digital campaigns, promotional movies, and social media clips.",
    },
    {
        icon: Settings,
        title: "Distribution & Platform Management",
        description:
            "We manage scheduling, publishing, and optimization so your recording studio Coimbatore production performs effectively across platforms.",
    },
];

const tours = [
    {
        image: featureAudio,
        title: "Vocal Studio",
        description:
            "For voiceovers, narration, and music recordings — studio-caliber clarity in a professional setting.",
    },
    {
        image: podcastStudio,
        title: "Podcast Recording Studio",
        description:
            "Explore our cutting-edge studio, ideal for discussions, interviews, and producing branded content.",
    },
    {
        image: businessPortrait,
        title: "Product Photo Shoot",
        description:
            "We offer expert setups for Product photo shoots, assisting companies in producing powerful and excellent images.",
    },
    {
        image: dubbingStudio,
        title: "Dubbing Studio",
        description:
            "Fully equipped for ads, voice dubbing, and multilingual content development with precision.",
    },
];

const reasons = [
    {
        icon: Award,
        title: "Industry Experience",
        description:
            "We bring strong media expertise to every recording studio podcast project. Our personalized podcast services guarantee that your material aligns with both audience expectations and your brand voice.",
    },
    {
        icon: Mic2,
        title: "Advanced Podcast Recording Space",
        description:
            "Our cutting-edge podcast recording studio features a variety of camera settings, mixers, and high-quality microphones. Perfect production quality and crystal-clear sound are guaranteed by the acoustically treated studio.",
    },
    {
        icon: BookOpen,
        title: "Captivating Narration",
        description:
            "As a seasoned podcast production company, we help with discussion structure, script improvement, and creating gripping stories that enthrall listeners.",
    },
    {
        icon: Globe,
        title: "Multi-Platform Publishing",
        description:
            "Our Podcast Services include seamless publishing across major platforms, helping your content gain visibility and consistent audience growth.",
    },
];

const faqs = [
    {
        q: "Do you provide both audio and video podcast production?",
        a: "Yes, we offer complete audio and video production solutions.",
    },
    {
        q: "Do you offer assistance with podcast strategy and concept development?",
        a: "Of course. We help with planning, scripting, and branding.",
    },
    {
        q: "Which tools and technology are present in your studio?",
        a: "We make use of top-notch acoustic treatment systems, mixers, 4K cameras, and microphones.",
    },
    {
        q: "Are hourly reservations for studios available?",
        a: "Yes, you can rent a podcast studio hourly or project-based.",
    },
    {
        q: "Do you offer marketing and audience growth services?",
        a: "Yes, our Podcast Services include promotion and audience-building strategies.",
    },
    {
        q: "How can a consultation or studio tour be scheduled?",
        a: "Contact us today to book a consultation or visit our Podcast studio In Coimbatore.",
    },
];

// ── Main Component ──────────────────────────────────────────────────────

const PodcastStudioPage = () => {
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

    // Fetch recent posts
    const { data: recentPosts, isLoading } = useQuery({
        queryKey: ["recent-posts-podcast"],
        queryFn: () => fetchRecentPosts(3),
        staleTime: 1000 * 60 * 30, // 30 mins
    });

    return (
        <div className="bg-[#faf3e0]">
            <SEO
                title="Best Podcast Recording Studio In Coimbatore"
                description="Professional podcast studio In Coimbatore with 4K video, expert editing, branding, and multi-platform publishing support."
                canonical="/studio/podcast-recording-studio-Coimbatore/"
            />

            <main className="overflow-x-hidden pt-20">
                <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={heroImage}
                            alt="Professional podcast recording studio In Coimbatore"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    </div>

                    <div className="relative z-10 container mx-auto px-4 md:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-3xl"
                        >
                            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
                                Best Podcast Recording Studio <span className="text-yellow-500">In Coimbatore</span>
                            </h1>
                            <motion.p
                                whileHover={{ backgroundColor: "rgba(101, 43, 50, 0.2)", scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="text-[#faf3e0]/80 mb-8 max-w-2xl leading-relaxed p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 cursor-default"
                            >
                                Are you looking for a seasoned podcast studio In Coimbatore to create excellent content? For creators, business owners, and brands, our fully furnished podcast recording studio provides an excellent audio recording experience. Our cutting-edge studio facility is made to provide excellence, whether you're looking to or require full-service podcasting.
                            </motion.p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    onClick={() => setIsAuditModalOpen(true)}
                                    className="bg-white text-[#652b32] hover:bg-white/90 text-base font-bold px-8 py-4 rounded-xl shadow-lg"
                                >
                                    Book Now
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-16 bg-white/50">
                    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2"
                            >
                                <img
                                    src={dubbingStudioImg}
                                    alt="Professional Audio Feature"
                                    className="rounded-3xl shadow-2xl w-full object-cover aspect-video md:aspect-auto"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2"
                            >
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-[#652b32]">
                                    About Our Podcasting Journey <span className="text-yellow-500">In Coimbatore</span>
                                </h2>
                                <p className="text-[#652b32]/80 leading-relaxed">
                                    We have established a reliable recording studio that Coimbatore creators rely on as a developing podcast production company. Our journey is propelled by creativity, narrative, and cutting-edge production technology. For influencers, educators, startups, and corporate teams looking to create powerful audio and video podcasts, we offer a professional podcast recording facility.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Section */}
                <section className="py-16 bg-[#faf3e0]/60">
                    <div className="container mx-auto px-4 md:px-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#652b32]"
                        >
                            Why Choose Our Podcast Studio <span className="text-yellow-500">In Coimbatore</span>
                        </motion.h2>
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                            {reasons.map((reason, i) => (
                                <motion.div
                                    key={reason.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        backgroundColor: "#652b32",
                                        scale: 1.02,
                                        transition: { duration: 0.15 }
                                    }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="p-8 rounded-[2rem] border border-[#652b32]/10 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-[#652b32]/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                                        <reason.icon className="w-8 h-8 text-[#652b32] group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-[#652b32] group-hover:text-white transition-colors">{reason.title}</h3>
                                    <p className="text-[#652b32]/70 leading-relaxed group-hover:text-white/80 transition-colors">{reason.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* RENT A STUDIO Button */}
                        <div className="text-center mt-12">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    onClick={() => setIsAuditModalOpen(true)}
                                    className="bg-[#652b32] text-[#faf3e0] hover:bg-[#652b32]/90 text-xl font-bold px-12 py-5 rounded-xl shadow-xl uppercase tracking-wider transition-all"
                                >
                                    RENT A STUDIO
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── Bento Grid Services Section ──────────────────────────────────────── */}
                <section id="services-grid" className="relative py-16 overflow-hidden">
                    {/* Background Image for Services Section */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={servicesBg}
                            alt="Podcast Studio Background"
                            className="w-full h-full object-cover opacity-10"
                        />
                        <div className="absolute inset-0 bg-[#faf3e0]/90" />
                    </div>

                    <div className="relative z-10 container mx-auto px-4 md:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#652b32]">
                                Our Podcast Services <span className="text-yellow-500">In Coimbatore</span>
                            </h2>
                            <p className="text-[#652b32]/70 max-w-3xl mx-auto">
                                End-to-end podcast production services tailored for creators In Coimbatore and beyond.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] max-w-7xl mx-auto">
                            {/* Card 1: Podcast Recording Space - Large (2x2) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.01 }}
                                className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] p-8 bg-[#652b32] text-[#faf3e0] shadow-2xl flex flex-col justify-end"
                            >
                                <div className="absolute inset-0 z-0">
                                    <img src={podcastImg} alt="" className="w-full h-full object-cover opacity-30 transition-transform group-hover:scale-110 duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#652b32] via-[#652b32]/40 to-transparent" />
                                </div>
                                <div className="z-10 relative">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-6">{services[0].title}</h3>
                                    <p className="opacity-90 leading-relaxed">
                                        {services[0].description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 2: Audio & Video Editing - Medium (1x1) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl p-6 bg-[#faf3e0] border-2 border-[#652b32]/10 flex flex-col justify-between"
                            >
                                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity">
                                    {/* Video editor black glyph removed */}
                                </div>
                                <Film className="w-12 h-12 text-[#652b32] mb-4 relative z-10" />
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-[#652b32] mb-3">{services[1].title}</h3>
                                    <p className="text-[#652b32]/80 leading-snug">
                                        {services[1].description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 3: Script Development - Medium (1x1) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    backgroundColor: "#652b32",
                                    scale: 1.02,
                                    transition: { duration: 0.15 }
                                }}
                                transition={{ delay: 0.2 }}
                                className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl p-6 bg-white border-2 border-[#652b32]/5 flex flex-col justify-between"
                            >
                                <FileText className="w-12 h-12 text-[#652b32] group-hover:text-white transition-colors mb-4" />
                                <div>
                                    <h3 className="text-xl font-bold text-[#652b32] group-hover:text-white transition-colors mb-3">{services[2].title}</h3>
                                    <p className="text-[#652b32]/80 group-hover:text-white/80 leading-snug transition-colors">
                                        {services[2].description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 4: Individual Branding - Tall (1x2) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.01 }}
                                transition={{ delay: 0.3 }}
                                className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] p-8 bg-gradient-to-br from-[#652b32] to-[#80353e] text-[#faf3e0] shadow-xl flex flex-col justify-end"
                            >
                                <div className="absolute inset-0 z-0">
                                    <img src={brandingImg} alt="" className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-6">{services[3].title}</h3>
                                    <p className="opacity-90 leading-relaxed">
                                        {services[3].description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 5: Podcast Launch Support - wide (2x1) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    backgroundColor: "#652b32",
                                    scale: 1.01,
                                    transition: { duration: 0.15 }
                                }}
                                transition={{ delay: 0.4 }}
                                className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] p-8 bg-[#faf3e0] border-2 border-[#652b32]/10 flex flex-col md:flex-row md:items-center gap-6 group"
                            >
                                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <img src={launchImg} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-20 h-20 rounded-3xl bg-[#652b32] group-hover:bg-white/20 flex items-center justify-center shrink-0 shadow-lg relative z-10 transition-colors">
                                    <Rocket className="w-10 h-10 text-[#faf3e0] group-hover:text-white transition-colors" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold text-[#652b32] group-hover:text-white mb-3 transition-colors">{services[4].title}</h3>
                                    <p className="text-[#652b32]/80 group-hover:text-white/80 transition-colors">
                                        {services[4].description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 6: Promotion and Marketing - (1x1) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl p-6 bg-white border-2 border-[#652b32]/5 flex flex-col justify-between hover:bg-[#652b32] transition-colors duration-500"
                            >
                                <Megaphone className="w-12 h-12 text-[#652b32] group-hover:text-[#faf3e0] transition-colors" />
                                <div>
                                    <h3 className="text-xl font-bold text-[#652b32] group-hover:text-[#faf3e0] mb-3 transition-colors">{services[5].title}</h3>
                                    <p className="text-[#652b32]/80 group-hover:text-[#faf3e0]/80 leading-relaxed transition-colors">
                                        {services[5].description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 7: Distribution & Platform Management - (1x1) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    backgroundColor: "#652b32",
                                    scale: 1.02,
                                    transition: { duration: 0.15 }
                                }}
                                transition={{ delay: 0.6 }}
                                className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl p-6 bg-[#652b32]/5 border-2 border-[#652b32]/10 flex flex-col justify-between"
                            >
                                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <img src={distributionImg} alt="" className="w-full h-full object-cover" />
                                </div>
                                <Settings className="w-12 h-12 text-[#652b32] group-hover:text-white transition-colors relative z-10" />
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-[#652b32] group-hover:text-white transition-colors mb-3">{services[6].title}</h3>
                                    <p className="text-[#652b32]/80 group-hover:text-white/80 transition-colors leading-relaxed">
                                        {services[6].description}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="text-center mt-12">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <button
                                    onClick={() => setIsAuditModalOpen(true)}
                                    className="inline-flex items-center justify-center bg-[#652b32] text-[#faf3e0] font-bold px-10 py-4 rounded-xl text-lg shadow-xl hover:bg-[#652b32]/90 transition-all uppercase tracking-wider"
                                >
                                    Book Now For Podcast Studio
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white/40">
                    <div className="container mx-auto px-4 md:px-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-center mb-6 text-[#652b32]"
                        >
                            Features of Our Podcast Studio <span className="text-yellow-500">In Coimbatore</span>
                        </motion.h2>
                        <p className="text-center text-[#652b32]/60 mb-16 max-w-2xl mx-auto">
                            Our premium podcast studio space combines advanced technology and comfort to deliver superior production quality.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
                            {features.map((f, i) => (
                                <motion.div
                                    key={f.title}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        backgroundColor: "#652b32",
                                        scale: 1.05,
                                        transition: { duration: 0.15 }
                                    }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    className="text-center p-6 rounded-2xl transition-all duration-300 group border border-transparent hover:border-[#652b32]/10"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#652b32]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
                                        <f.icon className="w-8 h-8 text-[#652b32] group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-bold mb-3 text-[#652b32] group-hover:text-white text-lg leading-tight transition-colors">{f.title}</h3>
                                    <p className="text-[#652b32]/70 group-hover:text-white/80 leading-relaxed transition-colors">{f.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Studio Tour Section */}
                <section className="py-16 bg-[#faf3e0]/40">
                    <div className="container mx-auto px-4 md:px-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#652b32]"
                        >
                            Take a Studio Tour <span className="text-yellow-500">In Coimbatore</span>
                        </motion.h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                            {tours.map((tour, i) => (
                                <motion.div
                                    key={tour.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        backgroundColor: "#652b32",
                                        scale: 1.02,
                                        transition: { duration: 0.15 }
                                    }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="group rounded-3xl overflow-hidden border border-[#652b32]/5 bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="overflow-hidden aspect-square">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-bold text-xl mb-3 text-[#652b32] group-hover:text-white transition-colors">{tour.title}</h3>
                                        <p className="text-[#652b32]/70 leading-relaxed group-hover:text-white/80 transition-colors">{tour.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 bg-white/20">
                    <div className="container mx-auto max-w-4xl px-4 md:px-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#652b32]"
                        >
                            Frequently Asked Questions
                        </motion.h2>
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`faq-${i}`}
                                    className="border border-[#652b32]/10 rounded-3xl px-8 bg-white shadow-sm overflow-hidden"
                                >
                                    <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline text-[#652b32]">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-[#652b32]/70 pb-6 leading-relaxed">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* Recent Blog Posts */}
                <section className="py-16 bg-[#faf3e0]">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-[#652b32] mb-4 uppercase tracking-tight">
                                    Recent <span className="text-yellow-500">Blog</span>
                                </h2>
                                <p className="text-[#652b32]/60 text-lg font-medium">
                                    Insights from our podcast recordings and studio works
                                </p>
                            </div>
                            <Link to="/blog/" className="inline-flex items-center gap-2 bg-white text-[#652b32] px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all border border-[#652b32]/10">
                                View All Posts <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="w-10 h-10 text-[#652b32] animate-spin opacity-20" />
                                <p className="text-[#652b32]/40 font-bold uppercase tracking-widest text-xs">Fetching latest posts...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {recentPosts?.slice(0, 3).map((post: any) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

            </main>
            <Footer />
            <PodcastBookingDialog
                isOpen={isAuditModalOpen}
                onOpenChange={setIsAuditModalOpen}
            />
        </div>
    );
};

export default PodcastStudioPage;