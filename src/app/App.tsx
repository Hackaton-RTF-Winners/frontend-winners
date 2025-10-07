import { MainPage } from '../pages/MainPage'

import { useState } from 'react'
import { CardItem } from '../widgets/CardItem/UI/CardItem.tsx'
import { Filter } from '../widgets/Filter/UI/Filter.tsx'
import { useInitializeTgApp } from '../features/InitializeTgApp'
import { useTelegramHaptic } from '../features/TelegramHaptic'

function App() {
  return (
    <>
      <MainPage />
    </>
  )
  const { tg } = useInitializeTgApp()
  const { showAlert } = useTelegramHaptic()
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value)
    setIsFilterOpen(false)
    showAlert(`Selected filter: ${value}`)
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
