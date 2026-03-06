import { motion } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    Star,
    Search,
    MousePointer2,
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
    Users,
    FileText,
    Link2,
    Settings,
    MapPin,
    ClipboardCheck,
    PenTool,
    Globe,
    Flag,
    Store,
    Code,
    ShoppingCart,
    TrendingUp,
    Trophy,
    DollarSign,
    ArrowLeft
} from "lucide-react";
import seoIcon from "@/assets/digital/seo.png";
import { Button } from "@/components/ui/button";
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
            <MousePointer2 size={28} className="text-[#faf3e0]" />
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
                    <img src={seoIcon} alt="SEO" className="w-5 h-5 object-contain brightness-0 invert" />
                    <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#faf3e0]/90">Search Engine Optimization</span>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#faf3e0] leading-tight mb-6 md:mb-8 font-display"
                >
                    Best SEO Services Company That Ranks, <span className="text-[#FACC15]">Converts & Grow Your Business</span>
                </motion.h1>

                <motion.div variants={fadeUp} className="space-y-4 mb-8 md:mb-10 text-sm md:text-lg text-[#faf3e0]/70 max-w-3xl leading-relaxed">
                    <p>
                        Search engine optimization is not just checking a box but rather having personal interaction with all of your clients and potential clients. No two businesses are identical, so the same goes for each company's ability to relate to their audience in such a way that will set them apart from each other.
                    </p>
                    <p className="font-bold text-[#faf3e0]">
                        At MediaMatic we aim to look at things differently to set you apart from your competitors!
                    </p>
                </motion.div>

                <motion.div variants={fadeUp}>
                    <button
                        onClick={onAuditClick}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#faf3e0] text-[#652b32] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white transition-all text-sm md:text-base"
                    >
                        Get Your Free SEO Audit <ArrowRight size={18} />
                    </button>
                </motion.div>
            </motion.div>
        </div>
    </section>
);

const ServicesSection = () => (
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
                    The professional SEO services we offer for{" "}
                    <span className="text-[#652b32]">Higher Rankings & More Leads</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    From the lack of scaling up brands effectively to consolidating all aspects of their marketing under one roof, we have the solutions to meet these challenges head-on. Contact our SEO agency, and we will work to develop a customized plan uniquely tailored to meet your specific requirements.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { icon: MapPin, title: "Local Seo services", desc: "Through the use of \"nearby\" search options and a successful local SEO approach, we help companies connect with individuals on a local level. A long-lasting source of traffic and revenue can be established this way." },
                    { icon: Flag, title: "National Seo services", desc: "Our SEO company can help you achieve the goal of leveraging the power that organic traffic has for conversions. We will create more brand awareness, generate leads online, and ultimately drive increased revenue to your bottom line." },
                    { icon: Globe, title: "Global Seo services", desc: "Local SEO only serves to target an audience local to the business, whereas global SEO is aimed at reaching audiences globally. Our skilled specialists and knowledgeable team will assist you in meeting your specific business requirements through our global SEO services." },
                    { icon: Store, title: "Small business Seo services", desc: "We help small business owners access their ideal customer's group and maintain that connection through the use of small business SEO to create long-term relationships without requiring huge amounts of money to spend on marketing/advertising." },
                    { icon: Code, title: "WordPress SEO Services", desc: "Our WordPress SEO experts analyze your website and its technical and on-page performance to find out why you cannot get the expected results. Then we will provide you with a comprehensive report detailing what you need to do with your website to improve the above-listed factors." },
                    { icon: ShoppingCart, title: "E-commerce SEO Services", desc: "Our e-commerce SEO services can help you rank higher on Google and make it easier for consumers to locate and buy your products online." },
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

const StrategiesSection = () => (
    <section className="py-16 md:py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
                    What dedicated <span className="text-[#652b32]">SEO strategies do we deliver?</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Increase your online presence and drive more qualified traffic your way with our strategic SEO services. Our proven process allows you to tap into the power of organic search to reach your target audience.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: TrendingUp, title: "Scale Sustainably", desc: "From conventional SERPs to AI-based search, we ensure that your business outshines in all the places where your customers are searching." },
                    { icon: Trophy, title: "Outshine Your Competitors", desc: "Gain a competitive advantage with a systemized approach to SEO, including keyword research, optimized content, technical SEO, link building, and answer engine optimization (AEO)." },
                    { icon: DollarSign, title: "Maximize SEO ROI", desc: "Our SEO solutions are designed to meet your revenue objectives, so the investment not only pays off in conventional search results but also in the increasing scope of AI-based search results." },
                ].map((s, i) => (
                    <motion.div
                        key={s.title}
                        className="text-center p-8 rounded-2xl bg-[#faf3e0] border border-border hover:shadow-lg hover:bg-[#652b32] transition-all duration-300 group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.6 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-[#652b32]/5 group-hover:bg-[#faf3e0]/10 flex items-center justify-center mx-auto mb-6 transition-colors">
                            <s.icon size={32} className="text-[#FACC15] group-hover:text-[#faf3e0]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[#652b32] group-hover:text-[#faf3e0] font-display">
                            {s.title}
                        </h3>
                        <p className="text-[#652b32]/70 group-hover:text-[#faf3e0]/80 leading-relaxed text-sm">{s.desc}</p>
                    </motion.div>
                ))}
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
                    Our Proven Process for <span className="text-[#652b32]">SEO services Success</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Seeking to increase your presence on search engine results pages? The SEO experts of one of the best SEO companies can assist in identifying issues, prioritizing solutions, and optimizing elements to increase organic traffic and share of voice.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: Search, title: "Keyword Research & Strategy", desc: "The right keywords can put you in your customers' shoes and help you understand their needs and are most likely to attract qualified traffic to valuable conversion points on your site. This best SEO marketing company will offer thematic keyword groupings to increase ranking potential." },
                    { icon: Users, title: "Competitor Analysis", desc: "Our SEO competitor analysis service is built on three pillars: content gap analysis, keyword analysis, and backlinks. The findings of this top SEO agency will be presented to you in a very in-depth competitor analysis document, which will reveal to you who your closest competitors are." },
                    { icon: FileText, title: "On-Page SEO services", desc: "From keyword-informed content updates to strategic page enhancements, we help you attract qualified leads and convert them into customers. Refine your content to match what users are really searching for to increase your online presence, keep users engaged, and increase conversions." },
                    { icon: Link2, title: "Off-Page SEO services", desc: "Through the application of the off-page SEO process, we not only use the principles behind reputation, relevance, and reach to help increase visibility in search engine results, but we do this with the objective of growing a business as well." },
                    { icon: Settings, title: "Technical Seo services", desc: "We will help you make sure that your website's SEO authority will be optimally defined so that search engines and other AI applications can accurately identify your content, as well as crawl and index it. We want your website to also have the best Core Web Vitals score, site architecture, and mobile-friendliness to create a seamless experience for all of your users." },
                    { icon: MapPin, title: "Google business profile optimization", desc: "Optimizing your Google Business Profile will optimize the visibility of your business in the digital marketplace, improve your online presence, and increase your ability to be found and reached by your potential customers." },
                    { icon: ClipboardCheck, title: "Seo audit", desc: "Our SEO website audit service provides solutions to issues including crawl errors, duplicate content, and page speed. Our website SEO service will improve how your website can be found in search engine results." },
                    { icon: PenTool, title: "Content creation and optimization", desc: "We have a complete service for all of your content marketing needs at MediaMatic. We are one of the best SEO service providers, helping create your entire project from the beginning stage of developing a great idea through to actually completing it by working with you to come up with the final copy." },
                ].map((p, i) => (
                    <motion.div
                        key={p.title}
                        className="p-8 rounded-2xl bg-[#faf3e0] border border-border hover:shadow-xl hover:bg-[#652b32] transition-all duration-300 group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                    >
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-[#FACC15]/20 transition-colors">
                            <p.icon size={24} className="text-[#652b32] group-hover:text-[#FACC15]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#652b32] mb-2 font-display group-hover:text-[#faf3e0]">
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
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
                    Industries We Serve with <span className="text-[#652b32]">SEO (Search Engine Optimization) Services</span>
                </h2>
                <div className="text-lg text-muted-foreground max-w-4xl mx-auto space-y-4">
                    <p>
                        With MediaMatic, the best SEO optimization company, we help businesses across various industries develop a brand that resonates with their consumers, all within the context of the specialized nature of the industry. Find out how we can help grow your online traffic and leads today. Our local SEO marketing agency services help drive local traffic to your brick-and-mortar franchise businesses.
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[
                    { icon: Building2, title: "Real Estate", desc: "At MediaMatic, we are a results-oriented real estate SEO company that understands the ever-changing nature of real estate searches. We help you generate leads that will be high quality by continuously monitoring them and helping to evolve your business." },
                    { icon: Plane, title: "Travel & Tourism", desc: "Our personalized strategies for SEO for travel businesses assist your business in attaining a high ranking on search engines. Increase your website's online presence with our travel SEO strategies that assist your website in attaining a high ranking." },
                    { icon: Factory, title: "Manufacturing", desc: "When you create quality content about a variety of manufacturing niches, you will bring visitors to your website today, and they will become prospects or customers in the future. We create useful content for you that will be displayed on the internet for the purposes of driving sales/converting to customers." },
                    { icon: Car, title: "Automotive", desc: "We are a trustworthy automotive SEO company, and what we do best is help you get discovered by local customers who are ready to buy. We help you develop a local SEO strategy, and we help you develop content that resonates with your customers and gets you better rankings." },
                    { icon: Dumbbell, title: "Sports & Fitness", desc: "The main thing that our SEO professionals can help you with is the establishment of your online authority. This is because search engines view links as an indicator of the quality of your website and the reputation of your business." },
                    { icon: Zap, title: "Energy & Utilities", desc: "We specialize in optimizing your business for growth areas such as solar power, EV charging stations, green energy, etc., to match the market demand. By understanding your competitors in the energy sector, we formulate SEO strategies that help you beat your competitors in search engine rankings." },
                    { icon: Sprout, title: "Agriculture & Agri Tech", desc: "MediaMatic is more than just another SEO company but a marketing partner for the agricultural sector! We understand what is needed to succeed online in today's digital economy, and we are committed to helping you build your online presence so that your business can thrive." },
                    { icon: HardHat, title: "Construction", desc: "Our aim is not just to get our clients better search results but also to assist them in attracting quality traffic that converts into phone calls, quotes, and contracts. By utilizing the right SEO strategies for the construction industry, your business can establish itself as a credible and trustworthy source, and the right traffic will come your way without having to spend money on advertising and relying on word-of-mouth." },
                    { icon: Scale, title: "Legal & Law Firms", desc: "Our mission is to assist law firms in developing a strong online presence so that they can be found by those who are looking for legal assistance. We implement the best SEO marketing strategies for lawyers by creating expert content and improving site performance to achieve long-term growth for our clients' firms." },
                    { icon: CalendarDays, title: "Event Management", desc: "With the help of local SEO, you can optimize your Google Business Profile, incorporate location-based keywords to increase your chances of being displayed on Google Maps or within the top search engine results page. This will result in a much higher volume of quality traffic, inquiries, and finally, confirmed bookings." },
                    { icon: Sparkles, title: "Beauty & Wellness", desc: "We offer quality search engine optimization services to our clients in the beauty industry. Our team of experts knows all the key concepts of SEO and uses this knowledge to develop successful strategies for our clients." },
                    { icon: Truck, title: "Logistics & Warehouse Management", desc: "We provide expert SEO services for logistic companies by developing bespoke logistic SEO services that match your industry, whether it is freight forwarding, warehousing, transportation, or logistics ecommerce." },
                ].map((ind, i) => (
                    <motion.div
                        key={ind.title}
                        className="flex items-start gap-4 p-5 rounded-xl bg-background border border-border hover:shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                        <div className="w-10 h-10 rounded-lg bg-[#652b32]/5 flex items-center justify-center shrink-0 group-hover:bg-[#faf3e0]/10 transition-colors">
                            <ind.icon size={20} className="text-[#FACC15] group-hover:text-[#faf3e0]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground group-hover:text-primary-foreground mb-1 font-display">
                                {ind.title}
                            </h3>
                            <p className="text-muted-foreground group-hover:text-primary-foreground/80 text-[10px] leading-relaxed">{ind.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const StatsSection = () => (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-5xl">
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl md:text-3xl font-bold font-display">
                    Our Current Stats
                </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { value: "2+", label: "Branch Offices" },
                    { value: "118+", label: "Web & App Projects" },
                    { value: "75+", label: "Corporate Video Shoots" },
                    { value: "124+", label: "Digital Marketing" },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <div className="text-4xl md:text-5xl font-bold text-[#FACC15] mb-2 font-display">
                            {s.value}
                        </div>
                        <div className="text-primary-foreground/80 text-sm font-medium">{s.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const FAQSection = () => (
    <section className="py-16 md:py-20 px-4 bg-background relative overflow-hidden">
        {/* Decorative doodles */}
        <div className="absolute top-10 left-6 opacity-10">
            <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#652b32" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
        </div>
        <div className="absolute bottom-10 right-6 opacity-10">
            <svg width="60" height="60" viewBox="0 0 60 60">
                <path d="M10 50 Q30 10 50 50" fill="none" stroke="#9a5a2a" strokeWidth="2" />
            </svg>
        </div>

        <div className="container mx-auto max-w-3xl relative z-10">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
                    Frequently Asked <span className="text-[#FACC15]">Questions</span>
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <Accordion type="single" collapsible className="space-y-3">
                    {[
                        { q: "Why are SEO services essential for business success?", a: "SEO is one of the most effective digital marketing tactics for increasing sales, building credibility, building brand awareness, and gaining a competitive advantage." },
                        { q: "What results can businesses expect from MediamaticStudio's SEO services?", a: "With MediamaticStudio's SEO services, you will receive a tailored approach for your business, helping you set apart from your competitors." },
                        { q: "Why should I hire a professional SEO services company instead of doing SEO myself?", a: "Hiring professional SEO services offers numerous advantages; it saves time and optimizes resources, including access to expert counsel." },
                        { q: "What SEO strategies does Mediamatic Studio use to rank competitive keywords?", a: "A keyword strategy is an SEO strategy used to plan for identifying and employing the appropriate words and phrases that your target audience types into search engines." },
                        { q: "Why should businesses choose MediamaticStudio over other SEO optimization companies?", a: "Because it has demonstrated growth results, is completely transparent, uses innovative techniques, and specializes in its services." },
                    ].map((faq, i) => (
                        <AccordionItem
                            key={i}
                            value={`faq-${i}`}
                            className="border border-border rounded-xl px-6 bg-card data-[state=open]:shadow-md transition-shadow"
                        >
                            <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
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

const CTASection = ({ onAuditClick }: { onAuditClick: () => void }) => (
    <section className="relative overflow-hidden py-16 md:py-24 px-4 bg-[#652b32] text-[#faf3e0]">
        {/* Decoratives */}
        <div className="absolute top-8 right-12 opacity-20">
            <Sparkles size={60} className="text-[#faf3e0]" />
        </div>
        <div className="absolute bottom-8 left-12 opacity-15">
            <Star size={48} className="text-[#faf3e0]" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <h2
                    className="text-3xl md:text-5xl font-bold text-[#faf3e0] leading-tight mb-6 font-display"
                >
                    SEO Benefits That Grow and <span className="text-[#FACC15]">Protect Your Brand</span>
                </h2>
                <div className="text-lg text-[#faf3e0]/80 max-w-4xl mx-auto mb-10 space-y-6 leading-relaxed">
                    <p className="font-bold text-[#faf3e0] text-2xl md:text-3xl">Your SEO Goals, Our Priority</p>
                    <p>We're invested in your success and dedicated to making organic search a predictable and sustainable growth driver for your business.</p>
                    <p>At MediaMatic, we offer digital marketing services that can help you accomplish your business objectives in no time. With the help of artificial intelligence, optimization techniques, and effective strategies, we can offer your brand the best support it needs.</p>
                </div>
                <button
                    onClick={onAuditClick}
                    className="inline-flex items-center gap-2 bg-[#faf3e0] text-[#652b32] px-8 py-3.5 rounded-full font-semibold shadow-xl hover:bg-white transition-all text-base"
                >
                    Get Started Today <ArrowRight size={18} />
                </button>
            </motion.div>
        </div>
    </section>
);

const SEOServices = () => {
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
    const handleAuditClick = () => setIsAuditModalOpen(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background font-body">
            <SEO
                title="Search Engine Optimization Company – Start Ranking Today"
                description="Partner with search engine optimization Company to boost rankings, traffic, qualified leads for your business. Get started today."
            />

            <HeroSection onAuditClick={handleAuditClick} />
            <ServicesSection />
            <StrategiesSection />
            <ProcessSection />
            <IndustriesSection />
            <StatsSection />
            <FAQSection />
            <CTASection onAuditClick={handleAuditClick} />
            <RecentBlog />
            <Footer />
            <MarketingAuditDialog
                isOpen={isAuditModalOpen}
                onOpenChange={setIsAuditModalOpen}
            />
        </div>
    );
};

export default SEOServices;
