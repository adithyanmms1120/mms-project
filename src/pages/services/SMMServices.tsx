import { motion } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    Star,
    Building2,
    Plane,
    Factory,
    Car,
    Dumbbell,
    Zap,
    Sprout,
    HardHat,
    Scale,
    CalendarDays,
    Truck,
    ArrowLeft,
    Share2,
    Mail,
    MessageSquare,
    Hash,
    Layout,
    PenTool,
    BarChart3,
    Users,
    Video,
    Smartphone,
    Search,
    Globe,
    Target,
    Handshake,
    CheckCircle2,
    PieChart,
    Rocket,
    Settings,
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    Twitter,
    ClipboardCheck,
    DollarSign,
    TrendingUp,
    Pin,
    TrendingUp as TrendingIcon,
} from "lucide-react";
import smmIcon from "@/assets/digital/digital-campaign.png";

const XIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
);

const PinterestIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full fill-current">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.718-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.93 0 4.135-2.607 7.462-6.225 7.462-1.215 0-2.358-.631-2.748-1.373l-.748 2.85c-.271 1.031-1.002 2.324-1.492 3.121C10.237 23.822 11.118 24 12.017 24 18.638 24 24 18.632 24 12.012 24 5.39 18.638 0 12.017 0z"></path>
    </svg>
);
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { RecentBlog } from "@/components/RecentBlog";
import { MarketingAuditDialog } from "@/components/MarketingAuditDialog";
import { useEffect, useState } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
    }),
};

const HeroSection = ({ onAuditClick }: { onAuditClick: () => void }) => (
    <section className="relative overflow-hidden py-16 md:py-24 px-6 md:px-12 bg-[#652b32]">
        {/* Doodles */}
        <div className="absolute top-16 right-[15%] opacity-20 animate-pulse">
            <Sparkles size={32} className="text-[#faf3e0]" />
        </div>
        <div className="absolute top-[30%] right-[8%] opacity-15">
            <Star size={24} className="text-[#FACC15]" fill="#FACC15" />
        </div>
        <div className="absolute bottom-[20%] right-[12%] opacity-20">
            <Share2 size={28} className="text-[#faf3e0]" />
        </div>
        <div className="absolute top-[20%] right-[25%] opacity-10">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="50" stroke="#faf3e0" strokeWidth="1" strokeDasharray="6 6" />
            </svg>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
            <Link
                to="/services/digital-marketing-agency/"
                className="inline-flex items-center gap-2 text-[#faf3e0]/60 hover:text-[#faf3e0] transition-colors font-medium group mb-8 md:mb-12"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Digital Marketing
            </Link>

            <motion.div
                className="text-left max-w-4xl"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-3 rounded-full border border-[#faf3e0]/30 bg-[#faf3e0]/10 px-4 py-2 md:px-5 md:py-2.5 mb-6 md:mb-8 font-heading">
                    <img src={smmIcon} alt="SMM" className="w-5 h-5 object-contain brightness-0 invert" />
                    <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#faf3e0]/90">Social Media Marketing</span>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#faf3e0] leading-tight mb-6 md:mb-8 font-display"
                >
                    A Digital Social Media Marketing <span className="text-[#FACC15]">Agency</span> Built for Brand Growth
                </motion.h1>

                <motion.p variants={fadeUp} className="text-sm md:text-lg text-[#faf3e0]/70 max-w-2xl mb-8 md:mb-10 leading-relaxed">
                    Our social media marketing initiatives will contribute to the awareness of the brand, the generation of qualified leads, and the measurable business development.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                    <button
                        onClick={onAuditClick}
                        className="inline-flex items-center justify-center gap-2 bg-[#faf3e0] text-[#652b32] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white transition-all text-sm md:text-base"
                    >
                        Request a Free Social Media Audit <ArrowRight size={18} />
                    </button>
                    <Link
                        to="/contact-us/"
                        className="inline-flex items-center justify-center gap-2 bg-[#FACC15] text-[#652b32] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#FACC15]/90 transition-all text-sm md:text-base"
                    >
                        Contact Us <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    </section>
);

const ExpectationsSection = () => (
    <section className="py-16 md:py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
                    What to Expect from Our <span className="text-[#FACC15]">SMM Services</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    As a digital social media marketing agency, we strategize, tell creative stories, and use data to make every campaign successful.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { icon: Target, title: "Social Media Strategy & Planning", desc: "Our research starts with a thorough research in order to get to know your audience, competitors and industry trends." },
                    { icon: PenTool, title: "Content Creation & Visual Design", desc: "The creative team creates posts, reels, stories, and ad creators that appeal to your brand identity with strong images and convincing text." },
                    { icon: Settings, title: "Social Media Account Management", desc: "Posting, scheduling, responding to comments and activity monitoring. This guarantees your brand remains active and consistent." },
                    { icon: DollarSign, title: "Paid Social Media Advertising", desc: "Professionals who prioritize and design paid campaigns to attain maximum ROI through targeting, A/B testing and performance monitoring." },
                    { icon: Users, title: "Influencer Marketing Campaigns", desc: "Collaborate with leaders in your industry to receive maximum ROI and display your message to the appropriate audience." },
                    { icon: MessageSquare, title: "Community Management & Engagement", desc: "The significant aspect of a successful social media is relationship building. We are active in involving the followers, answering the questions, and carrying out a substantive conversation so as to develop trust and brand loyalty." },
                ].map((s, i) => (
                    <motion.div
                        key={s.title}
                        className="p-8 rounded-2xl bg-[#faf3e0] border border-border hover:shadow-xl hover:bg-[#652b32] transition-all duration-300 group cursor-pointer"
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                    >
                        <div className="w-14 h-14 rounded-xl bg-[#652b32]/5 flex items-center justify-center mb-5 group-hover:bg-[#faf3e0]/10 transition-colors">
                            <s.icon size={28} className="text-[#FACC15] group-hover:text-[#faf3e0]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#652b32] mb-3 font-display group-hover:text-[#faf3e0]">
                            {s.title}
                        </h3>
                        <p className="text-[#652b32]/80 leading-relaxed text-sm group-hover:text-[#faf3e0]/90">
                            {s.desc}
                        </p>
                    </motion.div>
                ))}


            </div>
        </div>
    </section>
);

const WhyChooseSection = () => (
    <section className="py-16 md:py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-display">
                    Why Choose Our <span className="text-[#FACC15]">SMM Agency</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    We do not use generic templates, but rather we will create custom campaigns that will be in line with your particular goals.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: PieChart, title: "Data-Driven Campaigns", desc: "Our tactics are based on facts and analytics, introducing actual increases in coverage and conversions." },
                    { icon: Sparkles, title: "Creative Content That Stands Out", desc: "Crafting stark visuals and compelling stories that stand out from the plethora of social feeds." },
                    { icon: ClipboardCheck, title: "Transparent Reporting", desc: "Comprehensive reports of campaign performance, engagement numbers, and ROI to track your growth." },
                    { icon: Users, title: "Experienced SMM Experts", desc: "Effective strategists and ad specialists who have handle successful campaigns in various industries." }
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-[#652b32] text-[#faf3e0] flex flex-col items-center text-center hover:bg-[#faf3e0] hover:text-[#652b32] transition-all duration-300 group cursor-default shadow-lg">
                        <item.icon size={40} className="mb-6 text-[#FACC15] group-hover:text-[#652b32] transition-colors" />
                        <h4 className="font-bold mb-4 text-lg font-display uppercase tracking-wider">{item.title}</h4>
                        <p className="text-sm opacity-80 leading-relaxed group-hover:opacity-100">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const PlatformsSection = () => (
    <section className="py-16 md:py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-display">
                    Platforms We <span className="text-[#FACC15]">Expertise!</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    We are committed to providing services that are specialized to the best companies where we can access and achieve maximum engagement.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { icon: Facebook, title: "Facebook Advertising", desc: "Specific campaigns with aid of advanced audience segmentation. Brand awareness and lead generation with high testing and optimization." },
                    { icon: Instagram, title: "Instagram Advertising", desc: "Visual-first format interactions. Engagement increased by mouthwatering content, reels, carousel advertisements, and influencer collaborations." },
                    { icon: Linkedin, title: "LinkedIn Advertising", desc: "B2B marketing and networking. Decision-maker focused programs to assist you to create leads and industry authority." },
                    { icon: PinterestIcon, title: "Pinterest Advertising", desc: "Retail and design-oriented brands. Visual appealing pinning to attract traffic and product discovery." },
                    { icon: Youtube, title: "YouTube Advertising", desc: "Video storytelling. Attractive ads marketed with YouTube audience targeting, skippable and bumper campaigns." },
                    { icon: XIcon, title: "X (Twitter) Advertising", desc: "Real time interactions and trendy discussions. Promoted tweets and targeted campaigns that increase positioning in relevant discussions." }
                ].map((platform, i) => (
                    <motion.div
                        key={i}
                        className="group p-8 rounded-3xl bg-[#faf3e0] border border-[#652b32]/10 hover:bg-[#652b32] transition-all duration-500 hover:shadow-2xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[#652b32]/5 flex items-center justify-center mb-6 group-hover:bg-[#faf3e0]/10 group-hover:scale-110 transition-all duration-500">
                            {(() => {
                                const IconComponent = platform.icon as React.ElementType;
                                const colorClass = "text-[#FACC15] group-hover:text-[#faf3e0]";
                                return typeof IconComponent === 'function' ? (
                                    <div className={`w-8 h-8 ${colorClass}`}>
                                        <IconComponent />
                                    </div>
                                ) : (
                                    <IconComponent size={32} className={colorClass} />
                                );
                            })()}
                        </div>
                        <h4 className="text-xl font-bold mb-4 text-[#652b32] group-hover:text-[#faf3e0] font-display">{platform.title}</h4>
                        <p className="text-[#652b32]/70 group-hover:text-[#faf3e0]/80 text-sm leading-relaxed">{platform.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const StrategiesSection = () => (
    <section className="py-16 bg-[#652b32] text-[#faf3e0] overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 font-display">
                        Built for <span className="text-[#FACC15]">Long-Term Growth</span>
                    </h2>
                    <p className="text-lg opacity-80 leading-relaxed mb-6">
                        We do not just campaign in short-term plans. Our priorities are on sustainable brand building by means of ongoing engagement, optimized content, and nurturing the audience.
                    </p>
                    <p className="text-lg opacity-80 leading-relaxed">
                        We combine organic growth and paid performance marketing in a way that would provide consistent growth in the audience and better brand recognition in the long run.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-[#faf3e0] p-8 md:p-12 rounded-3xl text-[#652b32] relative"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#FACC15] rounded-2xl flex items-center justify-center rotate-12 shadow-lg">
                        <TrendingUp size={40} className="text-[#652b32]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 font-display">Strategic Benefits</h3>
                    <ul className="space-y-4">
                        {[
                            "Ongoing engagement & audience nurturing",
                            "Adaptability to algorithm changes",
                            "Consistent brand recognition",
                            "Strong competitive advantages",
                            "Continuous digital growth performance"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                                <CheckCircle2 size={24} className="text-[#652b32] shrink-0" />
                                <span className="text-lg font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    </section>
);

const ProcessSection = () => (
    <section className="py-16 md:py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
                    Our Results Driven <span className="text-[#FACC15]">SMM Process</span>
                </h2>
                <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                    systematic approach since the beginning of research, implementation, or result reporting.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: Search, title: "Audience Research", desc: "Examine audience behavior, demographics, and competitor strategies to find out opportunities." },
                    { icon: CalendarDays, title: "Content Calendar", desc: "Materials schedule arranged and injected frequently regarding subjects and aligned with trends." },
                    { icon: Rocket, title: "Execution & Optimization", desc: "Launched precisely, performance monitored in real-time and changed accordingly for maximum ROI." },
                    { icon: BarChart3, title: "Monthly Reports", desc: "Detailed insights into growth, engagement and conversion metrics ensuring data-driven decisions." },
                ].map((p, i) => (
                    <motion.div
                        key={p.title}
                        className="p-8 rounded-2xl bg-[#faf3e0] border border-border hover:shadow-xl hover:bg-[#652b32] transition-all duration-300 group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="w-14 h-14 rounded-xl bg-[#652b32]/5 flex items-center justify-center mb-6 group-hover:bg-[#faf3e0]/10 transition-colors">
                            <p.icon size={28} className="text-[#FACC15] group-hover:text-[#faf3e0]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#652b32] mb-3 font-display group-hover:text-[#faf3e0]">
                            {p.title}
                        </h3>
                        <p className="text-[#652b32]/70 text-sm leading-relaxed group-hover:text-[#faf3e0]/80">{p.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const IndustriesSection = () => (
    <section className="py-16 md:py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
                    Industries We <span className="text-[#FACC15]">Serve</span>
                </h2>
                <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                    Our best SMM services online are expected to serve different industries with tailor-made strategies.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[
                    { icon: Building2, title: "Real Estate", desc: "Catchy property displays, online tours, and targeted advertisements to assure qualified leads." },
                    { icon: Plane, title: "Travel & Tourism", desc: "Experiences, and seasonal offers, which motivate travelers and attract more bookings." },
                    { icon: Factory, title: "Manufacturing", desc: "Demonstrate processes, innovations, and expertise to build B2B credibility." },
                    { icon: Car, title: "Automotive", desc: "High-impact messages and contents that will drive people into showrooms." },
                    { icon: Dumbbell, title: "Sports & Fitness", desc: "Popularize memberships, packages and events in collaboration with influencers." },
                    { icon: Zap, title: "Energy & Utilities", desc: "Sustainability programs and customer education to increase brand trust." },
                    { icon: Sprout, title: "AgriTech", desc: "Encourage innovations and equipment to reach farmers and industry stakeholders." },
                    { icon: HardHat, title: "Construction", desc: "Project features, reviews, and marketing to gain credibility and leads." },
                    { icon: Mail, title: "Media & Publishing", desc: "Communication with audience to cause more readership and subscriptions." },
                    { icon: CalendarDays, title: "Event Management", desc: "Hype using countdowns and promotions by partnering with influencers." },
                    { icon: Sparkles, title: "Beauty & Wellness", desc: "Case studies and influencer hype for beauty and wellness packages." },
                    { icon: Truck, title: "Logistics", desc: "Reliability of operations and industry expertise for corporate partnerships." },
                ].map((ind, i) => (
                    <motion.div
                        key={ind.title}
                        className="flex items-start gap-4 p-5 rounded-xl bg-background border border-border hover:shadow-md hover:bg-[#652b32] transition-all duration-300 group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="w-10 h-10 rounded-lg bg-[#652b32]/5 flex items-center justify-center shrink-0 group-hover:bg-[#faf3e0]/10 transition-colors">
                            <ind.icon size={20} className="text-[#FACC15] group-hover:text-[#faf3e0]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#652b32] group-hover:text-[#faf3e0] mb-1 font-display">
                                {ind.title}
                            </h3>
                            <p className="text-muted-foreground group-hover:text-[#faf3e0]/70 text-[10px] leading-relaxed">{ind.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const StatsSection = () => (
    <section className="py-16 px-6 bg-[#652b32] text-[#faf3e0]">
        <div className="container mx-auto max-w-5xl">
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl md:text-3xl font-bold font-display">Our Performance Stats</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { value: "500+", label: "Social Campaigns" },
                    { value: "10M+", label: "Reach Delivered" },
                    { value: "85%", label: "Avg. Engagement Lift" },
                    { value: "24/7", label: "Active Monitoring" },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl font-bold text-[#FACC15] mb-2 font-display">{s.value}</div>
                        <div className="text-sm font-medium opacity-80 uppercase tracking-widest">{s.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const FAQSection = () => (
    <section className="py-16 md:py-20 px-4 bg-background relative overflow-hidden">
        <div className="container mx-auto max-w-3xl relative z-10">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
                    Frequently Asked <span className="text-[#FACC15]">Questions</span>
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Accordion type="single" collapsible className="space-y-3">
                    {[
                        { q: "What is social media marketing, and how can it help businesses grow?", a: "Social media marketing involves marketing a product or service through the use of social media such as Facebook, Instagram and LinkedIn." },
                        { q: "Which social media platforms are most effective for B2B lead generation?", a: "LinkedIn is also rather efficient at producing leads in B2B because the service offers a professional targeting feature." },
                        { q: "What are the most common mistakes businesses make in their social media strategies?", a: "Unequal posting, failure to research the audience, and failure to understand analytics, as well as failure to connect to the followers are traps." },
                        { q: "What strategies are most effective for accelerating organic growth on social media platforms?", a: "In the case of organic it is important to have good quality content, relationship with the audience, trends, optimization of hashtags and collaboration with influencers." },
                        { q: "What MediamaticStudio SMM services do you offer, and what results can I expect?", a: "MediamaticStudio provides the planning of strategies, the creation of content, paid promotion, influencer marketing, and monitoring." },
                        { q: "Why is MediamaticStudio considered one of the top social media marketing companies for growing brands?", a: "MediumaticStudio is a company that targets data-driven approaches, creative quality, and transparent communications and provides stable growth and a successful brand development to companies of any industry." },
                    ].map((faq, i) => (
                        <AccordionItem
                            key={i}
                            value={`faq-${i}`}
                            className="border border-border rounded-xl px-6 bg-card data-[state=open]:shadow-md transition-shadow"
                        >
                            <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 font-display">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </motion.div>
        </div>
    </section>
);

const SMMServices = () => {
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
    const handleAuditClick = () => setIsAuditModalOpen(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background font-body">
            <SEO
                title="Social Media Marketing Company – Get More Leads Today"
                description="Hire an expert social media marketing Company to boost brand reach, attract customers, and business growth. Contact us today."
            />

            <HeroSection onAuditClick={handleAuditClick} />
            <ExpectationsSection />
            <WhyChooseSection />
            <PlatformsSection />
            <StrategiesSection />
            <ProcessSection />
            <IndustriesSection />
            <StatsSection />
            <FAQSection />

            <section className="relative overflow-hidden py-16 md:py-24 px-4 bg-[#652b32] text-[#faf3e0] text-center">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">
                        Get Started with <span className="text-[#FACC15]">Social Media Marketing</span> Today
                    </h2>
                    <p className="text-lg text-[#faf3e0]/80 mb-10">
                        Are you willing to change the digital side of your brand and make a tangible increase? Join us and open up to the strength of the strategies that can suit your objectives.
                    </p>
                    <button
                        onClick={handleAuditClick}
                        className="inline-flex items-center gap-2 bg-[#faf3e0] text-[#652b32] px-8 py-3.5 rounded-full font-semibold shadow-xl hover:bg-white transition-all text-base"
                    >
                        Request a Free Social Media Audit <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <RecentBlog />
            <Footer />
            <MarketingAuditDialog
                isOpen={isAuditModalOpen}
                onOpenChange={setIsAuditModalOpen}
            />
        </div>
    );
};

export default SMMServices;
