import { motion } from 'framer-motion'

export default function Hero({ config, theme }) {
  const textOnly = !config.fotoUrl

  return (
    <section className={`relative w-full overflow-hidden bg-black flex flex-col items-center justify-center px-6 text-center ${textOnly ? 'h-[15vh] min-h-[250px] md:h-[60vh]' : 'aspect-[3/4] md:aspect-auto md:h-[65vh]'}`}>
      {config.fotoUrl && (
        <>
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
        </>
      )}

      <div className={`relative z-10 flex flex-col items-center justify-center ${config.fotoUrl ? 'absolute inset-0 pb-6 px-6' : ''}`}>
        <motion.div
          className="max-w-lg mx-auto w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {config.subtitulo && (
            <p className={`font-inter text-xs tracking-[0.4em] uppercase mb-4 text-white`}>
              {config.subtitulo}
            </p>
          )}
          <h1 className={`${theme.fontHeading} ${textOnly ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase leading-tight' : 'text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide uppercase leading-tight'} text-white drop-shadow-2xl`}>
            {config.nombreEvento}
          </h1>
        </motion.div>
        
        <motion.div
          className={`mt-4 w-16 h-[1px] bg-white/40`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
      </div>
    </section>
  )
}
