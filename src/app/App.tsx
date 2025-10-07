import { useEffect } from 'react'
import CardItem from '../widgets/CardItem/UI/CardItem.tsx'

function App() {
  const tg = window.Telegram.WebApp

  useEffect(() => {
    // Инициализация Telegram WebApp
    tg.ready()
    tg.expand()

    // Устанавливаем цвета темы
    tg.setHeaderColor(tg.themeParams.bg_color || '#ffffff')
    tg.setBackgroundColor(tg.themeParams.bg_color || '#ffffff')

    // Устанавливаем тему для CSS переменных
    const theme = tg.colorScheme === 'dark' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: tg.themeParams.bg_color || '#ffffff',
        padding: '20px 0',
      }}
    >
      <CardItem />
    </div>
  )
}

export default App
