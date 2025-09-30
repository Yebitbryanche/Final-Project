import { motion } from "framer-motion";

interface FAQProps {
  icon: any;
  title: string;
  text: string;
  image: any;
  className?: string;
}

function FAQ_Component({ icon, title, text, image, className }: FAQProps) {
  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center justify-around gap-6 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Left Side */}
      <motion.div
        className="flex flex-row items-center gap-x-4 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="p-3 rounded-full bg-primary/30 flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        <div className="flex flex-col items-start">
          <p className="text-xl font-medium">{title}</p>
          <p className="text-sm md:text-base">{text}</p>
        </div>
      </motion.div>

      {/* Right Side (Image) */}
      <motion.div
        className="w-full max-w-[300px]"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <img src={image} alt={title} className="w-full object-contain" />
      </motion.div>
    </motion.div>
  );
}

export default FAQ_Component;
