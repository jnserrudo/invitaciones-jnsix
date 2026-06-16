import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer({ theme }) {
  return (
    <motion.section
      className={`w-full ${theme.bgSecondary} ${theme.textSecondary} py-14`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-lg mx-auto px-6 text-center">
        <motion.p
          className={`${theme.fontBody} text-base leading-relaxed tracking-wide max-w-xs mx-auto mb-6 ${theme.textMutedDark}`}
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Será una noche mágica para mí y me encantaría que la disfrutes conmigo
        </motion.p>
        
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className={`w-10 h-10 mx-auto ${theme.heart}`} strokeWidth={1} fill="currentColor" />
          </motion.div>
        </motion.div>
        
        <motion.div
          className={`mt-10 pt-6 border-t ${theme.border}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className={`${theme.fontUi} text-[10px] tracking-[0.15em] uppercase ${theme.textMuted}`}>
            Invitaciones &bull; JNSIX
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
