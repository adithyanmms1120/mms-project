import { motion } from "framer-motion";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

const TimelineItem = ({
  year,
  title,
  description,
  index,
}: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative pl-16 pb-12"
    >
      {/* Dot */}
      <span className="absolute left-[6px] top-2 w-3 h-3 bg-[#d47c28] rounded-full" />

      {/* Year */}
      <span className="inline-block mb-3 text-xs font-bold bg-[#f3e6d1] text-[#d47c28] px-4 py-1 rounded-full">
        {year}
      </span>

      <h4 className="text-lg font-bold text-[#5a0f1b] mb-1">
        {title}
      </h4>
      <p className="text-sm text-[#7b1d1d]">
        {description}
      </p>
    </motion.div>
  );
};

export default TimelineItem;
