import { useState } from 'react'
import { BottomBar } from '@widgets/BottomBar'
import { Filter } from '@widgets/Filter'
import { CardItem } from '@widgets/CardItem'
import { useTelegramHaptic } from '@features/TelegramHaptic'
import './MainPage.css'

export const MainPage = () => {
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
    <div className="main-page">
      <div className="main-content">
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
      <BottomBar />
    </div>
  )
}
