import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function FechaHora({ fechaHora, horarioTexto, theme }) {
  const date = new Date(fechaHora)
  const diaSemana = format(date, 'EEEE', { locale: es })
  const fechaStr = format(date, "dd.MM.yy", { locale: es })

  return (
    <motion.section
      className={`w-full ${theme.bgSecondary} ${theme.textSecondary} py-12`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-lg mx-auto px-6 text-center">
        <motion.p
          className={`${theme.fontBody} text-sm tracking-[0.3em] uppercase ${theme.textMutedDark} mb-3`}
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {diaSemana}
        </motion.p>
        
        <motion.p
          className={`${theme.fontHeading} text-5xl md:text-7xl font-light tracking-wider mb-8`}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {fechaStr}
        </motion.p>

        <motion.div
          className={`flex items-center justify-center gap-2 ${theme.textMutedDark} mb-2`}
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Clock className="w-4 h-4" strokeWidth={1.5} />
          <span className={`${theme.fontUi} text-xs tracking-[0.2em] uppercase`}>
            Horario
          </span>
        </motion.div>
        
        <motion.p
          className={`${theme.fontHeading} text-lg md:text-xl tracking-[0.15em] uppercase`}
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {horarioTexto || 'De 21:30 a 05:30 HS'}
        </motion.p>
      </div>
    </motion.section>
  )
}
