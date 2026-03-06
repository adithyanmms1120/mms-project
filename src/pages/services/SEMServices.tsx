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
    ArrowLeft,
    Share2,
    Target,
    Mail,
    PieChart,
    MessageSquare,
    Hash,
    Layout,
    BarChart3,
    Rocket,
    MousePointerClick,
    Monitor
} from "lucide-react";
import semIcon from "@/assets/digital/sem.png";
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
import StatsCard from "@/components/StatsCard";

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

const stats = [
    { value: "2+", label: "Branch Offices" },
    { value: "118+", label: "Web & App Projects" },
    { value: "75+", label: "Corporate Video Shoots" },
    { value: "124+", label: "Digital Marketing" },
];

const StatsSection = () => (
    <section className="py-16 md:py-20 bg-[#652b32] text-[#faf3e0]">
        <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
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
                        <div className="text-[#faf3e0]/80 text-sm font-medium">{s.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const HeroSection = ({ onAuditClick }: { onAuditClick: () => void }) => (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 px-4 md:px-12 bg-[#652b32]">
        {/* Doodles */}
        <div className="absolute top-16 right-[15%] opacity-20 animate-pulse pointer-events-none">
            <Sparkles size={32} className="text-[#faf3e0]" />
        </div>
        <div className="absolute top-[30%] right-[8%] opacity-15 pointer-events-none">
            <Star size={24} className="text-[#FACC15]" fill="#FACC15" />
        </div>
        <div className="absolute top-[20%] right-[25%] opacity-10 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="50" stroke="#faf3e0" strokeWidth="1" strokeDasharray="6 6" />
            </svg>
        </div>
        <div className="absolute bottom-16 right-[20%] opacity-10 pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect x="10" y="10" width="60" height="60" rx="12" stroke="#faf3e0" strokeWidth="1" strokeDasharray="4 4" />
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
                    <img src={semIcon} alt="SEM" className="w-5 h-5 object-contain brightness-0 invert" />
                    <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#faf3e0]/90">SEM & Paid Media</span>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#faf3e0] leading-tight mb-6 md:mb-8 font-display"
                >
                    Search Engine Marketing Companies Specializing in <span className="text-[#FACC15]">PPC & Paid Media</span>
                </motion.h1>

                <motion.div variants={fadeUp} className="space-y-6 text-sm md:text-lg text-[#faf3e0]/70 max-w-4xl mb-8 md:mb-10 leading-relaxed text-left">
                    <p>
                        In the modern ruthless digital world, businesses need to be visible and show quantifiable growth instantly. Leading search engine marketing firms concentrate on performance-driven campaigns that turn intent into income because of this. Precision targeting, audience data, and clever bidding models are all combined at Mediamaticstudio to produce lucrative paid ads.
                    </p>
                    <p>
                        Our strategy, as one of the growth-oriented search engine marketing firms, guarantees that businesses show up in front of consumers who are prepared to buy at the appropriate moment, optimizing reach, engagement, and return on investment.
                    </p>
                    <div className="bg-[#faf3e0]/5 border-l-4 border-[#FACC15] p-6 rounded-r-xl">
                        <p className="font-bold text-[#faf3e0] mb-2 text-xl">Scale Faster with Mediamaticstudio’s Social Engine Marketing in Digital Marketing</p>
                        <p>Launch data-driven pay per click campaigns that attract high-intent traffic, boost conversions, and deliver measurable ROI. Our efficient campaigns get backed by audience intent mapping, competitive analysis and analytics. Our group creates scalable funnels that convert clicks into long-term clients.</p>
                    </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                    <button
                        onClick={onAuditClick}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#faf3e0] text-[#652b32] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white transition-all text-sm md:text-base"
                    >
                        Request a Free SEM Consultation <ArrowRight size={18} />
                    </button>
                </motion.div>
            </motion.div>
        </div>
    </section>
);

const WhySEMSection = () => (
    <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-display">
                        What Is Search Engine Marketing & How Does It Drive <span className="text-[#FACC15]">Instant Visibility?</span>
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            Search engine marketing is a paid strategy whereby your brand appears first when consumers are searching related goods or services. Organic SEO takes time which is not the case with paid advertisements where the exposure is immediate.
                        </p>
                        <p>
                            Through smart bidding, extension of adverts, and key-word targeting, businesses are likely to capture high-intent customers at the decision stage. Well-planned campaign ensures optimized ad copy, compelling landing pages and continuous testing of A/B.
                        </p>
                        <p>
                            This is a method that can see organizations increase site traffic, record measurable conversions within several days, and achieve traction instantly with this methodical approach to marketing through search engines.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    {[
                        { label: "Immediate Results", icon: Zap },
                        { label: "High Intent Traffic", icon: Target },
                        { label: "Measurable ROI", icon: BarChart3 },
                        { label: "Precision Targeting", icon: MousePointerClick }
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-[#652b32] text-[#faf3e0] flex flex-col items-center justify-center text-center hover:bg-[#faf3e0] hover:text-[#652b32] transition-all duration-300 group cursor-default shadow-md hover:shadow-xl translate-z-0">
                            <item.icon size={32} className="mb-4 text-[#FACC15] group-hover:text-[#652b32] transition-colors" />
                            <span className="text-sm font-bold uppercase tracking-tighter">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </section>
);

const PaidMarketingSupport = () => (
    <section className="py-16 md:py-24 px-4 bg-[#652b32] text-[#faf3e0]">
        <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    className="order-2 md:order-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#faf3e0]/10 aspect-video flex items-center justify-center bg-[#faf3e0]/5 group">
                        <Rocket size={120} className="text-[#FACC15] opacity-20 group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#652b32] via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-xl font-bold mb-2 font-display">Qualified Leads</h3>
                            <p className="text-sm opacity-80">Steady generation for long-term growth</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="order-1 md:order-2"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 font-display">
                        How Paid Advertising Marketing Supports <span className="text-[#FACC15]">Brand & Lead Generation</span>
                    </h2>
                    <div className="space-y-6 text-[#faf3e0]/80 leading-relaxed text-lg">
                        <p>
                            Along with the qualified leads, strategic paid advertising marketing enhances brand credibility. By targeting specific demographic, interests and search targets, businesses can acquire audiences with the highest likelihood of conversion.
                        </p>
                        <p>
                            Also, paid advertisements reinforce brand recognition by being repeated in search engines and display networks. The prospects are developed until they are ready to take action with the help of proper funnel optimization and retargeting strategies.
                        </p>
                        <p>
                            This performance-based approach guarantees that marketing funds are allocated to initiatives that produce genuine engagement, improved recall, and steady lead generation for long-term company expansion.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

const ServicesSection = () => (
    <section className="py-16 md:py-24 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
                    Our Search Engine Marketing & <span className="text-[#FACC15]">Paid Advertising Services</span>
                </h2>
                <div className="text-lg text-muted-foreground max-w-4xl mx-auto space-y-4">
                    <p>
                        We offer all-inclusive solutions that promote quantifiable performance. We develop organized sponsored funnels, maximize bidding tactics, and guarantee clear reporting as seasoned search engine marketing companies.
                    </p>
                    <p>
                        Our services are centered on ROI scaling across several platforms, conversion optimization, and traffic quality.
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { icon: MousePointerClick, title: "Pay Per Click (PPC) Advertising", desc: "Our PPC campaigns will aim at transforming the high-intent search queries to leads or sales. We carry out competition benchmarking, keyword analysis and continuous bid optimization in order to reduce the cost per acquisition. The performance of all campaigns is monitored to ensure that there is a consistent improvement and a consistent growth." },
                    { icon: Globe, title: "Google Ads Campaign Management", desc: "We manage the entire Google Ads ecosystem consisting of search, display, shopping and remarketing campaigns. Our employees will ensure systematic targeting and conversion monitoring on measurable outcomes, including the creation of accounts and the advanced division of audiences." },
                    { icon: Monitor, title: "Bing Ads Management", desc: "Our Bing Ads solutions will help marketers access untapped populations because there is less competition and it is more cost-effective. We maximize the device targeting, ad creatives, and keyword strategies to achieve more reach and profitability." },
                    { icon: Settings, title: "Paid Campaign Management", desc: "Our comprehensive paid campaign management guarantees that campaign performance and corporate goals are in line. In order to constantly improve the results of all paid media, we are focused on testing, analytics, and optimization." },
                ].map((s, i) => (
                    <motion.div
                        key={s.title}
                        className="p-10 rounded-3xl bg-[#faf3e0] border border-border hover:shadow-xl hover:bg-[#652b32] transition-all duration-500 group"
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[#652b32]/5 flex items-center justify-center mb-6 group-hover:bg-[#faf3e0]/10 transition-colors">
                            <s.icon size={32} className="text-[#FACC15] group-hover:text-[#faf3e0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#652b32] mb-4 font-display group-hover:text-[#faf3e0]">
                            {s.title}
                        </h3>
                        <p className="text-[#652b32]/80 leading-relaxed group-hover:text-[#faf3e0]/90">
                            {s.desc}
                        </p>
                    </motion.div>
                ))}

            </div>
        </div>
    </section>
);

const BenefitsSection = () => (
    <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
                    The Role of <span className="text-[#FACC15]">Paid Media Marketing</span> Services in Business Performance
                </h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                    In the case of businesses that seek to compete in the digital market, instant visibility, quantifiable growth, and scalable revenue potential is ensured through effective paid advertising.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: "Drive High-Intent Traffic", desc: "The high intent users who are actively seeking solutions have better conversion rates. The primary elements of our campaigns are geo-targeting, custom placements of ads, and transactional keywords. This will ensure that firms attract consumers who are ready to take action." },
                    { title: "Improve Lead Quality & Conversion Rates", desc: "We target the parameters to reach serious decision-makers and buyers in a bid to ensure that the adverts are received by people. Persuasive messages, A/B testing, and optimization of the landing page provide more user experience and result in a better quality of the leads and the conversion rates." },
                    { title: "Accelerate Sales & Revenue Growth", desc: "We develop revenue-focused funnels that boost average order value and deal closing by fusing remarketing tactics with performance data." },
                    { title: "Optimize Marketing Spend Efficiency", desc: "The allocation of budget is done through real-time analysis of data. We keep track of the rates of clicks, cost per click and returns continuously to ensure that the funds are only allocated to the campaigns that are working." },
                    { title: "Enhance Brand Visibility & Market Reach", desc: "Positioning of brands on search results and partner networks is strategic, placing brands on prime spots. Regular exposure creates the credibility, awareness, and brand power in the competitive markets over time." },
                    { title: "Enable Data-Driven Decision Making", desc: "Analytics and conversion tracking support each campaign. Optimization choices are guided by insights from performance reports, guaranteeing ongoing development and more intelligent marketing expenditures." },
                    { title: "Support Scalable Business Growth", desc: "Our paid frameworks are designed to scale alongside business expansion. Due to the demand, the campaigns are modified to fit the best of the markets and audience segments." },
                    { title: "Strengthen Competitive Advantage", desc: "Competitor keywords and high-value search terms enable the businesses to be competitive in the crowded industry. This is a proactive positioning that will guarantee more visibility and customer acquisition." },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        className="flex flex-col gap-3 p-6 rounded-2xl bg-[#faf3e0] hover:bg-[#652b32] transition-all duration-300 group cursor-default"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="h-1 bg-[#652b32] w-12 rounded-full mb-2 group-hover:bg-[#FACC15] group-hover:w-full transition-all" />
                        <h4 className="font-bold text-lg font-display text-[#652b32] group-hover:text-[#faf3e0]">{item.title}</h4>
                        <p className="text-sm text-[#652b32]/70 group-hover:text-[#faf3e0]/80 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const BenefitsAuditSection = () => (
    <section className="py-16 md:py-24 px-4 bg-[#faf3e0]">
        <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-[#652b32] mb-8 font-display">
                        Measurable Benefits of Search Engine Marketing Strategy for <span className="text-[#FACC15]">Scaling Businesses</span>
                    </h2>
                    <div className="space-y-6 text-[#652b32]/80 text-lg leading-relaxed">
                        <p>
                            The organised search engine marketing strategy offers quantifiable outcomes in the form of increased traffic, generation of leads and enhanced sales. Businesses are able to trace all the clicks and conversions with high accuracy and finesse through precise targeting and high-level analytics.
                        </p>
                        <p>
                            Adjustments in the campaign are founded on the performance information and it is optimized continuously. The strategy minimizes marketing risks and enhances predictability.
                        </p>
                        <p>
                            Between better brand awareness and quicker ROI, SEM assists growing companies to take over the search engine results, generate qualified leads, and win over competition in local and international markets.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="p-1 md:p-12 rounded-[3rem] bg-[#652b32] text-[#faf3e0] relative shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FACC15]/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <h3 className="text-2xl md:text-3xl font-bold mb-8 font-display">A Results Focused Search Engine Marketing Agency Built by Mediamaticstudio</h3>
                    <div className="space-y-6 text-sm md:text-base opacity-95">
                        <p>
                            Mediamaticstudio is a transparency and accountable performance-based search engine marketing agency. Our areas of interest are strategic plan, excellence in execution and optimization of ROI.
                        </p>
                        <p>
                            The firm has a combination of creative ad copy, structured bidding strategies and continuous analytics that help us to maximize returns. We are also not focused on vanity metrics unlike traditional agencies.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

const IndustriesSection = () => (
    <section className="py-16 md:py-24 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
                    Industries We Serve with <span className="text-[#FACC15]">SEM</span> (Search Engine Marketing) Services
                </h2>
                <div className="text-lg text-muted-foreground max-w-4xl mx-auto space-y-4 text-center">
                    <p>
                        Our SEM (Search Engine Marketing) Services will be customized to suit various industries that aim at quantifiable online development.
                    </p>
                    <p>
                        Our market analysis, screening of market trends, audiences and competition levels enable us to develop specific campaigns that provide high impact visibility and stability in performance across sectors.
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[
                    { icon: Building2, title: "Real Estate", desc: "Create qualified property inquiries through geo-targeted campaigns and buyer-intent keywords." },
                    { icon: Plane, title: "Travel & Tourism", desc: "Capture seasonal demand and increase bookings with high-converting paid search campaigns." },
                    { icon: Factory, title: "Manufacturing", desc: "Reach B2B buyers and distributors using niche industry keyword targeting." },
                    { icon: Car, title: "Automotive", desc: "Use localized paid marketing to increase dealership visits and car queries." },
                    { icon: Dumbbell, title: "Sports & Fitness", desc: "Use interest-based targeting to boost product sales and memberships." },
                    { icon: Zap, title: "Energy & Utilities", desc: "Use strategic paid visibility to advertise services and establish credibility." },
                    { icon: Sprout, title: "Agriculture & Agri Tech", desc: "Use targeted digital advertisements to establish a connection with distributors and farmers." },
                    { icon: HardHat, title: "Construction", desc: "Make project queries using high-intent commercial keywords." },
                    { icon: Scale, title: "Legal & Law Firms", desc: "Attract clients seeking immediate legal assistance via search-based campaigns." },
                    { icon: Mail, title: "Media & Publishing", desc: "Increase readership and subscriptions through optimized paid traffic." },
                    { icon: CalendarDays, title: "Event Management", desc: "Use marketing funnels to increase ticket sales and registrations." },
                    { icon: Sparkles, title: "Beauty & Wellness", desc: "Use localized ad targeting to increase appointments and product sales." },
                    { icon: Truck, title: "Logistics & Warehouse Management", desc: "Use industry-focused keyword advertising to generate B2B leads." },
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

const FAQSection = () => (
    <section className="py-16 md:py-24 px-4 bg-background relative overflow-hidden">
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
                        { q: "1. How do search engine marketing companies help businesses grow faster?", a: "They develop paid campaigns that can create instant exposure, reach and engage high-intent users and turn traffic into quantifiable revenue via streamlined bidding and analytics." },
                        { q: "2. What makes Mediamaticstudio different from other search engine marketing agencies?", a: "Our campaigns are ROI-oriented, we report and love clear business objectives." },
                        { q: "3. How does Mediamaticstudio’s pay per click advertising deliver faster ROI?", a: "Through transactional keywords, bids optimization and the constant improvement of the campaign in relation to performance data." },
                        { q: "4. How do google ads marketing companies track conversions and results?", a: "By tracking conversion using conversion tracking tools, analytics dashboards and in-depth performance reports which quantify clicks, leads and revenue impact." },
                        { q: "5. Why should businesses choose Mediamaticstudio as their paid advertising agency?", a: "Our growth, cost, and strategic implementation are highly valued according to the measurable growth, cost efficiency, and strategic implementation." },
                        { q: "6. How long does it take to see results from Mediamaticstudio’s paid advertising marketing?", a: "The majority of companies observe a growth in traffic and generation of leads in the initial few weeks of the campaign." },
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

const SEMServices = () => {
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
    const handleAuditClick = () => setIsAuditModalOpen(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background font-body">
            <SEO
                title="Search Engine Marketing Company – Get More Leads Now"
                description="Choose search engine marketing Company to increase visibility, drive targeted traffic, and generate quality leads. Start growing now."
            />

            <HeroSection onAuditClick={handleAuditClick} />
            <WhySEMSection />
            <PaidMarketingSupport />
            <ServicesSection />
            <BenefitsSection />
            <BenefitsAuditSection />
            <IndustriesSection />
            <StatsSection />
            <FAQSection />

            <section className="relative overflow-hidden py-16 md:py-24 px-4 bg-[#652b32] text-[#faf3e0] text-center">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">
                        Ready to Grow with <span className="text-[#FACC15]">Strategic Search Engine Marketing?</span>
                    </h2>
                    <p className="text-lg text-[#faf3e0]/80 mb-10 leading-relaxed">
                        Implement data-driven search engine marketing campaigns with Mediamaticstudio to generate quantifiable traffic, qualified leads, and scalable revenue development.
                    </p>
                    <button
                        onClick={handleAuditClick}
                        className="inline-flex items-center gap-2 bg-[#faf3e0] text-[#652b32] px-10 py-4 rounded-full font-bold shadow-2xl hover:bg-white transition-all text-lg group"
                    >
                        Request Your Free Strategy Consultation Today <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
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

export default SEMServices;
