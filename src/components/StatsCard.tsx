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
      className="bg-[#53131b] rounded-2xl p-10 text-center shadow-sm"
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
  