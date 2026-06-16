import { motion } from 'framer-motion'

export default function Frase({ texto, theme }) {
  const defaultText =
    'Hay momentos en la vida que son irrepetibles, pero compartirlos con las personas que más querés, estos se vuelven inolvidables'

  return (
    <motion.section
      className={`w-full ${theme.bgSecondary} ${theme.textSecondary} py-14`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-lg mx-auto px-8 text-center">
        <motion.p
          className={`${theme.fontBody} text-lg md:text-xl leading-relaxed tracking-wide`}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {texto || defaultText}
        </motion.p>
        
        <motion.div
          className="mt-10 mx-auto w-16 h-16 relative"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
        >
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            className={`${theme.fontHeading} text-[7px] ${theme.textSecondary === 'text-inv-black' ? 'fill-inv-black' : 'fill-warm-brown'}`}
          >
            <textPath href="#circlePath" startOffset="0%">
              MIS 15  XV  MIS 15  XV  MIS 15  XV  
            </textPath>
          </text>
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
          </defs>
        </motion.svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-inv-black"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
        </div>
      </motion.div>
      </div>
    </motion.section>
  )
}
