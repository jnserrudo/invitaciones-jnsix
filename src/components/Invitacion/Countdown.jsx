import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown.js'

function AnimatedNumber({ value, theme }) {
  const formatted = String(value).padStart(2, '0')
  return (
    <motion.span
      key={value}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`inline-block ${theme.fontHeading} text-3xl md:text-4xl font-semibold ${theme.textPrimary}`}
    >
      {formatted}
    </motion.span>
  )
}

export default function Countdown({ fechaHora, theme }) {
  const { days, hours, minutes, seconds } = useCountdown(fechaHora)

  const boxes = [
    { value: days, label: 'DÍAS' },
    { value: hours, label: 'HS' },
    { value: minutes, label: 'MIN' },
    { value: seconds, label: 'SEG' },
  ]

  return (
    <motion.section
      className={`w-full ${theme.bgPrimary} border-y ${theme.border} py-8`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-lg mx-auto px-6">
        <div className={`grid grid-cols-4 ${theme.divider}`}>
          {boxes.map((box, i) => (
            <motion.div
              key={box.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <AnimatedNumber value={box.value} theme={theme} />
              <span className={`${theme.fontUi} text-[10px] tracking-[0.25em] uppercase ${theme.textMuted} mt-2`}>
                {box.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
