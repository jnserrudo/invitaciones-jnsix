import { useState } from 'react'
import { motion } from 'framer-motion'

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function Confirmar({ config, theme }) {
  const [nombre, setNombre] = useState('')
  const [acompanantes, setAcompanantes] = useState('')

  const telefono = config.whatsapp || ''
  const mensajeBase =
    config.mensajeConfirmacion ||
    `Hola! Soy *${nombre.trim()}* y quiero confirmar mi asistencia a tu evento`

  const handleConfirm = () => {
    if (!nombre.trim() || !telefono) return
    let msg = mensajeBase.replace('*${nombre.trim()}*', nombre.trim())
    if (acompanantes.trim()) {
      msg += `. Voy con *${acompanantes.trim()}* acompañante(s)`
    }
    const url = `https://wa.me/${telefono.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  return (
    <motion.section
      className={`w-full ${theme.bgAccent} py-14`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-lg mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <WhatsAppIcon className={`w-12 h-12 mx-auto mb-4 ${theme.textOnAccent}`} />
        </motion.div>
        
        <motion.p
          className={`${theme.fontBody} text-base leading-relaxed tracking-wide max-w-xs mx-auto mb-8 ${theme.textOnAccent}`}
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Es importante contar con tu presencia
        </motion.p>

        <motion.div
          className="max-w-xs mx-auto space-y-3 mb-8"
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Tu nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`w-full ${theme.inputOnAccent} px-4 py-3 ${theme.fontUi} text-sm outline-none transition-colors rounded-sm`}
          />
          <input
            type="text"
            placeholder="Cantidad de acompañantes (opcional)"
            value={acompanantes}
            onChange={(e) => setAcompanantes(e.target.value)}
            className={`w-full ${theme.inputOnAccent} px-4 py-3 ${theme.fontUi} text-sm outline-none transition-colors rounded-sm`}
          />
        </motion.div>

        <motion.button
          onClick={handleConfirm}
          disabled={!nombre.trim() || !telefono}
          className={`inline-flex items-center gap-3 ${theme.btnOnAccent} px-10 py-4 ${theme.fontUi} text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg`}
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <WhatsAppIcon className="w-5 h-5" />
          Confirmar por WhatsApp
        </motion.button>
      </div>
    </motion.section>
  )
}
