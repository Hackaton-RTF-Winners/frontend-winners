import { useEffect, useState } from 'react'
import CardItem from '../widgets/CardItem/UI/CardItem.tsx'
import Filter from '../widgets/Filter/UI/Filter.tsx'

function App() {
  const tg = window.Telegram.WebApp
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value)
    setIsFilterOpen(false)
    tg.showAlert(`Selected filter: ${value}`)
  }

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: tg.themeParams.bg_color || '#ffffff',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <Filter
          label="Verification"
          value={
            selectedFilter === 'all'
              ? 'All'
              : selectedFilter === 'verified'
                ? 'Verified'
                : 'Unverified'
          }
          isOpen={isFilterOpen}
          onToggle={handleFilterToggle}
          onSelect={handleFilterSelect}
        />

        <CardItem />
      </div>
    </div>
  )
}

export default App
