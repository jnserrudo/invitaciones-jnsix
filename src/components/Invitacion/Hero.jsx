import { motion } from 'framer-motion'

export default function Hero({ config, theme }) {
  return (
    <section className="relative w-full aspect-[3/4] md:aspect-auto md:h-[85vh] overflow-hidden bg-black">
      {/* Fondo borroso solo en desktop, donde la imagen no llena todo el contenedor */}
      <img
        src={config.fotoUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110 hidden md:block"
      />

      {/* Imagen principal: object-cover en mobile (3:4) sin franjas, object-contain en desktop */}
      <img
        src={config.fotoUrl}
        alt={config.nombreEvento}
        className="absolute inset-0 w-full h-full object-cover md:object-contain"
      />

      {/* Degradado inferior para que el nombre se lea sobre la imagen */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`} />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-6 text-center z-10">
        <motion.div
          className="max-w-lg mx-auto w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {config.subtitulo && (
            <p className={`font-inter text-xs tracking-[0.4em] uppercase mb-4 ${theme.textOnAccent}`}>
              {config.subtitulo}
            </p>
          )}
          <h1 className={`${theme.fontHeading} text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide uppercase leading-tight ${theme.textOnAccent} drop-shadow-2xl`}>
            {config.nombreEvento}
          </h1>
        </motion.div>
        
        <motion.div
          className={`mt-3 w-10 h-[1px] ${theme.border.replace('border', 'bg')}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
      </div>
    </section>
  )
}
