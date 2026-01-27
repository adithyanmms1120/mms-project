import { motion } from "framer-motion";

interface StatsCardProps {
  value: string;
  label: string;
  index: number;
}

const StatsCard = ({ value, label, index }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#652b32] via-[#6a1c2b] to-[#652b32] p-6 lg:p-8 rounded-3xl border border-[#fdf3b7]/20 hover:border-[#fdf3b7]/40 shadow-xl"
    >
      <h3 className="text-5xl font-extrabold text-[#fdf3b7] mb-2">
        {value}
      </h3>
      <p className="text-[#fdf3b7] text-sm tracking-wide">
        {label}
      </p>
    </motion.div>
  );
};

export default StatsCard;
