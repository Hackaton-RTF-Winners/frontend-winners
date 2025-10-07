import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'

export const useInitializeTgApp = () => {
  const tg = WebApp

  useEffect(() => {
    tg.ready()
    tg.expand()

    tg.setHeaderColor(tg.themeParams.bg_color || '#ffffff')
    tg.setBackgroundColor(tg.themeParams.bg_color || '#ffffff')

    const theme = tg.colorScheme === 'dark' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return { tg }
}
