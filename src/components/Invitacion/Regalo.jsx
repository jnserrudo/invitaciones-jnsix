import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'

export default function Regalo({ config, theme }) {
  const alias = config.alias || 'EMILIA.XV'
  const mensaje = config.mensajeRegalo || 'Mi mejor regalo es tu presencia, pero si algo me querés obsequiar...'
  const aliasLabel = config.aliasLabel || 'Mi alias:'

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
          {mensaje}
        </motion.p>
        
        <motion.p
          className={`${theme.fontHeading} text-xl tracking-[0.15em] uppercase mb-8`}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          {aliasLabel} {alias}
        </motion.p>
        
        <motion.div
          className="mx-auto w-12 h-12"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
        >
          <Gift className={`w-full h-full ${theme.textMuted}`} strokeWidth={1} />
        </motion.div>
      </div>
    </motion.section>
  )
}
