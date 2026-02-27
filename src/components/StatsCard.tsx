import React, { memo } from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  value: string;
  label: string;
  index: number;
}

const StatsCard = memo(({ value, label, index }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="group bg-[#652b32] p-6 lg:p-8 rounded-3xl border border-white/10 hover:border-[#652b32]/20 shadow-xl transition-all duration-300 hover:bg-[#faf3e0] hover:-translate-y-3 hover:scale-[1.02]"
    >
      <h3 className="text-5xl font-extrabold text-[#fdf3b7] group-hover:text-[#652b32] mb-2 transition-colors">
        {value}
      </h3>
      <p className="text-[#fdf3b7]/90 text-sm tracking-wide group-hover:text-[#652b32]/80 transition-colors">
        {label}
      </p>
    </motion.div>
  );
});

StatsCard.displayName = "StatsCard";

export default StatsCard;
