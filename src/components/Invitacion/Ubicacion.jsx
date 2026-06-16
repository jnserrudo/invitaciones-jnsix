import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'

export default function Ubicacion({ config, theme }) {
  return (
    <motion.section
      className={`w-full ${theme.bgPrimary} py-12`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-lg mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <MapPin className={`w-10 h-10 mx-auto mb-4 ${theme.iconLight}`} strokeWidth={1} />
        </motion.div>
        
        <motion.h3
          className={`${theme.fontHeading} text-xl md:text-2xl tracking-[0.2em] uppercase mb-2 ${theme.textPrimary}`}
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {config.nombreSalon || 'JANO\'S MORÓN'}
        </motion.h3>
        
        <motion.p
          className={`${theme.fontUi} text-sm ${theme.textMuted} tracking-wide mb-8`}
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {config.direccion || 'AV. PRESIDENTE PERÓN 4852 MORÓN'}
        </motion.p>
        
        <motion.a
          href={config.mapsUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 ${theme.btnPrimary} px-8 py-4 ${theme.fontUi} text-xs tracking-[0.2em] uppercase transition-all`}
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Navigation className="w-4 h-4" />
          Cómo llegar
        </motion.a>
      </div>
    </motion.section>
  )
}
