'use client'

import { motion } from 'framer-motion'

export function Wordmark({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-display text-[22px] italic text-paper tracking-tight">
        TransformFit
      </span>
    </motion.div>
  )
}