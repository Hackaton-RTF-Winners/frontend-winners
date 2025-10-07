import { useState } from 'react'
import { MainPage } from '../pages/MainPage'
import { CardItem } from '../widgets/CardItem'
import { Filter } from '../widgets/Filter/UI/Filter.tsx'
import { useInitializeTgApp } from '../features/InitializeTgApp'

function App() {
  const { tg } = useInitializeTgApp()
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value)
    setIsFilterOpen(false)
  }

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen)
  }
  return (
    <>
      <MainPage />
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
    </>
  )
}

export default App
