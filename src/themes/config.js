export const themes = {
  classic: {
    fontHeading: 'font-cinzel',
    fontBody: 'font-cormorant',
    fontUi: 'font-inter',
    bgPrimary: 'bg-black',
    bgSecondary: 'bg-white',
    bgAccent: 'bg-gradient-to-b from-gray-400 to-gray-500',
    textPrimary: 'text-white',
    textSecondary: 'text-inv-black',
    textMuted: 'text-gray-400',
    textMutedDark: 'text-gray-500',
    border: 'border-white/10',
    divider: 'divide-white/10',
    iconLight: 'text-white',
    iconDark: 'text-inv-black',
    btnPrimary: 'bg-white/10 border-white/20 hover:bg-white hover:text-black',
    btnSecondary: 'bg-black border-white/20 hover:bg-white hover:text-black',
    input: 'bg-white/10 border-white/20 text-white placeholder-gray-300',
    heart: 'fill-inv-black',
    textOnAccent: 'text-white',
    btnOnAccent: 'bg-white border-white/30 text-black hover:bg-black hover:text-white hover:border-white',
    inputOnAccent: 'bg-white/10 border-white/20 text-white placeholder-white/60',
  },
  warm: {
    fontHeading: 'font-playfair',
    fontBody: 'font-cormorant',
    fontUi: 'font-montserrat',
    bgPrimary: 'bg-warm-cream',
    bgSecondary: 'bg-warm-champagne',
    bgAccent: 'bg-warm-brown',
    textPrimary: 'text-warm-brown',
    textSecondary: 'text-warm-brown',
    textMuted: 'text-warm-brown-light',
    textMutedDark: 'text-warm-gold',
    border: 'border-warm-gold/30',
    divider: 'divide-warm-gold/20',
    iconLight: 'text-warm-gold',
    iconDark: 'text-warm-brown',
    btnPrimary: 'bg-warm-gold/20 border-warm-gold/40 text-warm-brown hover:bg-warm-gold hover:text-warm-cream',
    btnSecondary: 'bg-warm-brown border-warm-gold/30 hover:bg-warm-gold hover:text-warm-cream',
    input: 'bg-warm-cream border-warm-gold/40 text-warm-brown placeholder-warm-brown-light',
    heart: 'fill-warm-brown',
    textOnAccent: 'text-warm-cream',
    btnOnAccent: 'bg-warm-gold border-warm-gold text-warm-cream hover:bg-warm-cream hover:text-warm-brown',
    inputOnAccent: 'bg-warm-cream/15 border-warm-cream/30 text-warm-cream placeholder-warm-cream/50',
  },
  champagneRed: {
    fontHeading: 'font-playfair',
    fontBody: 'font-cormorant',
    fontUi: 'font-montserrat',
    // Countdown, Ubicacion, DressCode usan bgPrimary (champán claro)
    bgPrimary: 'bg-champagne-cream',
    // FechaHora, Frase, Regalo, Footer usan bgSecondary (rojo vino)
    bgSecondary: 'bg-red-wine',
    // StartScreen, Confirmar usan bgAccent (rojo vino)
    bgAccent: 'bg-red-wine',
    // Texto sobre champán (oscuro para contraste)
    textPrimary: 'text-red-wine-dark',
    // Texto sobre rojo vino (claro para contraste)
    textSecondary: 'text-champagne-cream',
    // Texto muted sobre champán
    textMuted: 'text-red-wine/60',
    // Texto muted sobre rojo vino claro (blanco para mejor contraste)
    textMutedDark: 'text-white',
    border: 'border-gold-champagne/40',
    divider: 'divide-gold-champagne/30',
    iconLight: 'text-gold-champagne',
    iconDark: 'text-red-wine-dark',
    btnPrimary: 'bg-gold-champagne border-gold-champagne text-red-wine-dark hover:bg-red-wine hover:text-champagne-cream',
    btnSecondary: 'bg-red-wine/10 border-gold-champagne/50 text-red-wine-dark hover:bg-gold-champagne hover:text-red-wine-dark',
    input: 'bg-white border-gold-champagne/40 text-red-wine-dark placeholder-red-wine/50',
    heart: 'fill-red-wine',
    textOnAccent: 'text-champagne-cream',
    btnOnAccent: 'bg-gold-champagne border-gold-champagne text-red-wine-dark hover:bg-champagne-cream hover:text-red-wine-dark',
    inputOnAccent: 'bg-red-wine-dark border-champagne-cream/30 text-champagne-cream placeholder-champagne-cream/60',
  },
}

export function getTheme(inv) {
  const key = inv?.theme || 'classic'
  return themes[key] || themes.classic
}
