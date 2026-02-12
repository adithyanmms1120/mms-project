import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { dummyPosts } from "@/data/dummyBlogs";
import { Calendar, User, ArrowLeft, Clock, ChevronRight, CheckCircle, Send } from "lucide-react";

const BlogPostDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = dummyPosts.find(p => p.slug === slug);
    const [activeTab, setActiveTab] = useState<"imm" | "edu">("imm");
    const navigate = useNavigate();

    if (!post) {
        return (
            <main className="min-h-screen bg-background py-20 px-6">
                <div className="container mx-auto text-center">
                    <p className="text-red-500 text-lg mb-6">Post not found</p>
                    <Link to="/blog" className="inline-flex items-center gap-2 text-foreground font-bold">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <SEO
                title={`${post.title} | MediaMatic Studio Blog`}
                description={post.excerpt}
                canonical={`/blog/${post.slug}`}
                ogImage={post.featured_image}
            />

            <main className="min-h-screen bg-white pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all group font-bold uppercase tracking-widest text-[10px]"
                    >
                        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all">
                            <ArrowLeft size={14} />
                        </div>
                        Back to Website
                    </button>

                    {/* Header Image */}
                    <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-8 shadow-xl">
                        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-8 uppercase tracking-widest overflow-hidden whitespace-nowrap">
                        <Link to="/" className="hover:text-red-600">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/blog" className="hover:text-red-600">Blog</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-red-600">{post.category}</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="truncate">{post.title}</span>
                    </nav>

                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        {/* Main Content */}
                        <article className="lg:col-span-8">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] mb-8 font-heading">
                                {post.title}
                            </h1>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
                                <img src={post.author.avatar} alt={post.author.name} className="w-14 h-14 rounded-full object-cover ring-4 ring-red-50" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">By {post.author.name}</span>
                                        <span className="hidden md:inline px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded-md tracking-tighter">{post.author.role}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mt-1">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.publish_date}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.read_time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Article Body */}
                            <div
                                className="blog-content prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900 prose-img:rounded-3xl"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Related Posts Section (Mobile only) - to be added later or just footer */}
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-10 sticky top-28">
                            {/* Inquiry Form Card */}
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8">
                                {/* Toggle */}
                                <div className="flex p-1 bg-gray-50 rounded-full mb-8">
                                    <button
                                        onClick={() => setActiveTab("imm")}
                                        className={`flex-1 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'imm' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900'}`}
                                    >
                                        Immigration
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("edu")}
                                        className={`flex-1 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'edu' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-gray-900'}`}
                                    >
                                        Education
                                    </button>
                                </div>

                                <form className="space-y-4">
                                    <input type="text" placeholder="Name" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all text-sm placeholder:font-medium" />
                                    <input type="email" placeholder="Email" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all text-sm placeholder:font-medium" />
                                    <input type="tel" placeholder="Phone" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all text-sm placeholder:font-medium" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="Age" className="px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm placeholder:font-medium" />
                                        <input type="text" placeholder="Education" className="px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm placeholder:font-medium" />
                                    </div>
                                    <input type="text" placeholder="Job Title" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm placeholder:font-medium" />
                                    <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm font-medium text-gray-500 appearance-none">
                                        <option>Preferred Country</option>
                                    </select>
                                    <input type="text" placeholder="Work Experience" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm placeholder:font-medium" />
                                    <input type="text" placeholder="City" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm placeholder:font-medium" />
                                    <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm font-medium text-gray-500 appearance-none">
                                        <option>Nearest Branch</option>
                                    </select>
                                    <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all shadow-xl hover:shadow-red-600/30">
                                        Submit Inquiry
                                    </button>
                                </form>
                            </div>

                            {/* Recent Blogs Card */}
                            <div className="p-2">
                                <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-3">
                                    <span className="w-8 h-px bg-red-600"></span> Recent Blogs
                                </h3>
                                <div className="space-y-6">
                                    {dummyPosts.filter(p => p.slug !== slug).slice(0, 3).map(p => (
                                        <Link key={p.slug} to={`/blog/${p.slug}`} className="flex gap-4 group">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-md">
                                                <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="pt-1">
                                                <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">{p.title}</h4>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mt-2 uppercase">
                                                    <span>By {p.author.name}</span>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                    <span>{p.publish_date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Related Posts Bottom Section */}
                    <div className="mt-20 pt-20 border-t border-gray-100">
                        <div className="text-center mb-12">
                            <h2 className="text-red-600 font-black uppercase tracking-[0.2em] text-sm mb-4">Related Posts</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {dummyPosts.filter(p => p.slug !== slug).map(p => (
                                <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
                                    <div className="aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg">
                                        <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors">{p.title}</h3>
                                    <p className="text-xs font-bold text-red-600 mt-2 uppercase tracking-widest">{p.publish_date}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BlogPostDetail;
