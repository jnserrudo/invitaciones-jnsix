import { motion } from 'framer-motion'
import { Music, Heart } from 'lucide-react'

export default function StartScreen({ onStart, theme }) {
  return (
    <motion.div
      onClick={onStart}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer ${theme.bgAccent} ${theme.textOnAccent}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${theme.textOnAccent === 'text-white' ? 'bg-white/20' : 'bg-warm-cream/20'}`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-center flex flex-col items-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className={`w-10 h-10 mb-6 ${theme.textOnAccent === 'text-white' ? 'text-white/60' : 'text-warm-cream/60'}`} strokeWidth={1} />
        </motion.div>
        
        <motion.p
          className={`${theme.fontHeading} font-bold text-2xl md:text-3xl tracking-[0.3em] uppercase mb-3`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Invitación Especial
        </motion.p>
        
        <motion.p
          className={`${theme.fontUi} text-sm ${theme.textOnAccent === 'text-white' ? 'text-gray-400' : 'text-warm-cream/70'} tracking-wider`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Toca para abrir
        </motion.p>

        <motion.div
          className="mt-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Music className={`w-5 h-5 ${theme.textOnAccent === 'text-white' ? 'text-white/40' : 'text-warm-cream/40'}`} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
