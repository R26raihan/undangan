import { ref } from 'vue'

const isPlaying = ref(false)
const isMuted = ref(false)
const hasStarted = ref(false)
const currentTime = ref(0)
const duration = ref(0)

let audioElement: HTMLAudioElement | null = null

function getAudio(): HTMLAudioElement {
  if (!audioElement && typeof window !== 'undefined') {
    audioElement = new Audio('/audio/wedding-song.mp3')
    audioElement.loop = true
    audioElement.preload = 'auto'

    audioElement.addEventListener('play', () => {
      isPlaying.value = true
      hasStarted.value = true
    })

    audioElement.addEventListener('pause', () => {
      isPlaying.value = false
    })

    audioElement.addEventListener('timeupdate', () => {
      if (audioElement) {
        currentTime.value = audioElement.currentTime
        duration.value = audioElement.duration || 0
      }
    })

    audioElement.addEventListener('ended', () => {
      isPlaying.value = false
    })
  }
  return audioElement!
}

export function useAudio() {
  const play = async () => {
    try {
      const audio = getAudio()
      await audio.play()
      isPlaying.value = true
      hasStarted.value = true
    } catch (err) {
      console.warn('Audio autoplay prevented or error:', err)
      isPlaying.value = false
    }
  }

  const pause = () => {
    const audio = getAudio()
    audio.pause()
    isPlaying.value = false
  }

  const toggle = async () => {
    if (isPlaying.value) {
      pause()
    } else {
      await play()
    }
  }

  const toggleMute = () => {
    const audio = getAudio()
    audio.muted = !audio.muted
    isMuted.value = audio.muted
  }

  return {
    isPlaying,
    isMuted,
    hasStarted,
    currentTime,
    duration,
    play,
    pause,
    toggle,
    toggleMute
  }
}
