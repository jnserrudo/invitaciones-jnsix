import { useState, useEffect, useRef, useCallback } from 'react'

export function useMusicPlayer(videoId) {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const playerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!videoId) return

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(tag, firstScript)

    window.onYouTubeIframeAPIReady = () => {
      if (!containerRef.current) return
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '1',
        width: '1',
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          mute: 1,
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady()
    }

    return () => {
      try {
        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy()
        }
      } catch {
        // ignore
      }
    }
  }, [videoId])

  const unmuteAndPlay = useCallback(() => {
    if (playerRef.current && isReady) {
      try {
        playerRef.current.unMute()
        playerRef.current.setVolume(100)
        playerRef.current.playVideo()
        setIsMuted(false)
      } catch {
        // ignore
      }
    }
  }, [isReady])

  const toggleMute = useCallback(() => {
    if (!playerRef.current || !isReady) return
    try {
      if (isMuted) {
        playerRef.current.unMute()
        playerRef.current.setVolume(100)
        playerRef.current.playVideo()
        setIsMuted(false)
      } else {
        playerRef.current.mute()
        setIsMuted(true)
      }
    } catch {
      // ignore
    }
  }, [isReady, isMuted])

  return { isReady, isPlaying, isMuted, unmuteAndPlay, toggleMute, containerRef }
}
