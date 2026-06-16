import { motion } from 'framer-motion'

export default function DressCode({ texto, theme }) {
  return (
    <motion.section
      className={`w-full ${theme.bgPrimary} ${theme.textPrimary} py-12`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-lg mx-auto px-6 text-center">
        <motion.div
          className="mx-auto mb-4"
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg className={`w-12 h-12 mx-auto ${theme.iconDark}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 18h12c1.5 0 2.5-1 3-2.5S20 12 18 11c-1.5-1-3.5-1-5-2.5-1.5-1.5-2-3.5-2.5-5.5C10 1.5 8.5 1 7 2c-1.5 1-2.5 2.5-3 4.5S4 18 4 18z" />
            <path d="M4 18v3" />
          </svg>
        </motion.div>
        
        <motion.p
          className={`${theme.fontUi} text-xs tracking-[0.3em] uppercase ${theme.textMuted} mb-2`}
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Dress Code
        </motion.p>
        
        <motion.p
          className={`${theme.fontHeading} text-base tracking-[0.15em] uppercase`}
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {texto || 'Elegante'}
        </motion.p>
      </div>
    </motion.section>
  )
}
