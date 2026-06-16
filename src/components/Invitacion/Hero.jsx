import { motion } from 'framer-motion'

export default function Hero({ config, theme }) {
  const isWarm = config?.theme === 'warm'
  return (
    <section className="relative w-full h-[55vh] min-h-[400px] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] overflow-hidden">
      <motion.img
        src={config.fotoUrl}
        alt={config.nombreEvento}
        className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${isWarm ? 'from-warm-brown via-warm-brown/40 to-transparent' : 'from-black via-black/40 to-transparent'}`} />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center z-10">
        <motion.div
          className="max-w-lg mx-auto w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {config.subtitulo && (
            <p className={`font-inter text-xs tracking-[0.4em] uppercase mb-4 ${isWarm ? 'text-warm-champagne' : 'text-gray-300'}`}>
              {config.subtitulo}
            </p>
          )}
          <h1 className={`${theme.fontHeading} text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest uppercase leading-none text-white drop-shadow-2xl`}>
            {config.nombreEvento}
          </h1>
        </motion.div>
        
        <motion.div
          className={`mt-6 w-16 h-[1px] ${isWarm ? 'bg-warm-gold/40' : 'bg-white/30'}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
      </div>
    </section>
  )
}
