import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import styles from "../Blog.module.css";
import listIcon from "@/assets/list.svg";

interface Heading {
    id: string;
    text: string;
    level: number;
}

const TableOfContents = () => {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Generate IDs for headings if they don't have them
    const generateHeadingId = (text: string): string => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    useEffect(() => {
        // Get all headings from the blog content
        const article = document.querySelector('article');
        if (!article) return;

        // Use a small timeout to ensure DOM is updated after React render
        const timer = setTimeout(() => {
            const elements = Array.from(article.querySelectorAll('h2, h3, h4')).filter(el => {
                const text = el.textContent?.toLowerCase() || "";
                return !text.includes("faq") && !text.includes("table of contents");
            });

            const items: Heading[] = elements.map((element, index) => {
                const htmlElement = element as HTMLElement;
                const text = element.textContent || "";

                // Set ID if not present
                if (!htmlElement.id) {
                    htmlElement.id = generateHeadingId(text) || `heading-${index}`;
                }

                return {
                    id: htmlElement.id,
                    text: text,
                    level: parseInt(element.tagName[1]),
                };
            });

            setHeadings(items);

            // Set up intersection observer for active heading
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                { rootMargin: "-80px 0% -70% 0%", threshold: 0 }
            );

            elements.forEach((element) => observer.observe(element));

            return () => observer.disconnect();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            setActiveId(id);
        }
    }, []);

    if (headings.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`${styles.tocWrapper} ${isCollapsed ? styles.tocCollapsed : ''}`}
        >
            <div className={styles.tocContainer}>
                {/* Header */}
                <div className={styles.tocHeader}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#652b32] to-[#652b32 ] flex items-center justify-center shadow-lg shadow-[#652b32]/20">
                            <img src={listIcon} alt="list" className="w-5 h-5 brightness-0 invert" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Table of Contents</h3>
                            <p className="text-xs text-gray-500">{headings.length} sections</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all hover:scale-105"
                        aria-label={isCollapsed ? "Expand" : "Collapse"}
                    >
                        <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
                    </button>
                </div>

                {/* Content */}
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.tocContent}
                    >
                        <ul className={styles.tocList}>
                            {headings.map((heading, index) => {
                                const indent = (heading.level - 2) * 12; // Add indent based on level
                                return (
                                    <motion.li
                                        key={heading.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03, duration: 0.3 }}
                                        className={`${styles.tocItem} ${styles[`level${heading.level}`]} ${activeId === heading.id ? styles.tocItemActive : ''}`}
                                        style={{ paddingLeft: `${indent}px` }}
                                    >
                                        <a
                                            href={`#${heading.id}`}
                                            onClick={(e) => handleClick(e, heading.id)}
                                            className={`${styles.tocLink} ${activeId === heading.id ? styles.tocLinkActive : ''} hover:text-[#652b32] transition-colors duration-200`}
                                        >
                                            <span className={styles.tocBullet} />
                                            <span className={styles.tocText}>{heading.text}</span>
                                            {activeId === heading.id && (
                                                <motion.span
                                                    layoutId="activeIndicator"
                                                    className={styles.tocActiveIndicator}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </a>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default TableOfContents;