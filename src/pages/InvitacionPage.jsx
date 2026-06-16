import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { getStaticInvitacionBySlug } from '../data/storage.js'
import { getTheme } from '../themes/config.js'
import StartScreen from '../components/Invitacion/StartScreen.jsx'
import MusicPlayer from '../components/Invitacion/MusicPlayer.jsx'
import Hero from '../components/Invitacion/Hero.jsx'
import Countdown from '../components/Invitacion/Countdown.jsx'
import FechaHora from '../components/Invitacion/FechaHora.jsx'
import Ubicacion from '../components/Invitacion/Ubicacion.jsx'
import Frase from '../components/Invitacion/Frase.jsx'
import DressCode from '../components/Invitacion/DressCode.jsx'
import Regalo from '../components/Invitacion/Regalo.jsx'
import Confirmar from '../components/Invitacion/Confirmar.jsx'
import Footer from '../components/Invitacion/Footer.jsx'

export default function InvitacionPage() {
  const { slug } = useParams()
  const [config, setConfig] = useState(null)
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(true)

  const theme = getTheme(config)

  useEffect(() => {
    let cancelled = false
    getStaticInvitacionBySlug(slug).then((inv) => {
      if (cancelled) return
      if (inv) {
        setConfig(inv)
        document.title = inv.nombreEvento || 'Invitación'
      } else {
        document.title = 'Invitación no encontrada'
      }
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-dvh bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-dvh bg-black text-white flex items-center justify-center px-6">
        <p className="font-cinzel text-sm tracking-widest uppercase text-gray-400">
          Invitación no encontrada
        </p>
      </div>
    )
  }

  const handleStart = () => {
    setStarted(true)
  }

  return (
    <div className="min-h-dvh bg-black text-white">
      <AnimatePresence>
        {!started && <StartScreen onStart={handleStart} theme={theme} key="start" />}
      </AnimatePresence>

      {started && config.videoId && (
        <MusicPlayer videoId={config.videoId} />
      )}

      <main className="relative">
        <Hero config={config} theme={theme} />
        <Countdown fechaHora={config.fechaHora} theme={theme} />
        <FechaHora fechaHora={config.fechaHora} horarioTexto={config.horarioTexto} theme={theme} />
        <Ubicacion config={config} theme={theme} />
        <Frase texto={config.frase} theme={theme} />
        <DressCode texto={config.dressCode} theme={theme} />
        <Regalo config={config} theme={theme} />
        <Confirmar config={config} theme={theme} />
        <Footer theme={theme} />
      </main>
    </div>
  )
}
