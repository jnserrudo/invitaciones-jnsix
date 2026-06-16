import { useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useMusicPlayer } from '../../hooks/useMusicPlayer.js'

export default function MusicPlayer({ videoId }) {
  const { isReady, isMuted, unmuteAndPlay, toggleMute, containerRef } = useMusicPlayer(videoId)

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        unmuteAndPlay()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isReady, unmuteAndPlay])

  return (
    <>
      <div ref={containerRef} className="fixed" style={{ bottom: 10, right: 10, width: 1, height: 1, overflow: 'hidden' }} />
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-40 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full flex items-center justify-center w-12 h-12 transition-all hover:bg-white/20"
        aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>
    </>
  )
}
