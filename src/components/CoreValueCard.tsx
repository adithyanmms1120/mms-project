import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CoreValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const CoreValueCard = ({ icon: Icon, title, description, index }: CoreValueCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
        <Icon size={28} className="text-gold" />
      </div>
      <h4 className="font-heading text-lg font-bold text-foreground mb-2">{title}</h4>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default CoreValueCard;
