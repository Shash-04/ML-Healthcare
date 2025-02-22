"use client"
import { motion } from "framer-motion";

export const AnimatedGradientBorder = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className="relative p-[1px] overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        initial={{ backgroundPosition: "0 0" }}
        animate={{ backgroundPosition: "200% 0" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[length:200%_100%] bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500"
      />
      <div className={`relative bg-gray-900 rounded-xl ${className}`}>
        {children}
      </div>
    </div>
  );
};
