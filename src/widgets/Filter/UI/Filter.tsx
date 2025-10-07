import './Filter.css'

interface FilterProps {
  label?: string
  value?: string
  options?: Array<{ label: string; value: string }>
  isOpen?: boolean
  onToggle?: () => void
  onSelect?: (value: string) => void
  className?: string
}

const Filter = ({
  label = 'Verification',
  value = 'All',
  options = [
    { label: 'All', value: 'all' },
    { label: 'Verified', value: 'verified' },
    { label: 'Unverified', value: 'unverified' },
  ],
  isOpen = false,
  onToggle,
  onSelect,
  className,
}: FilterProps) => {
  const tg = window.Telegram.WebApp

  const handleToggle = () => {
    tg.HapticFeedback.impactOccurred('light')
    if (onToggle) {
      onToggle()
    }
  }

  const handleSelect = (selectedValue: string) => {
    tg.HapticFeedback.impactOccurred('light')
    if (onSelect) {
      onSelect(selectedValue)
    }
  }

  return (
    <div className={`filter-container ${className || ''}`}>
      <button className="filter-button" onClick={handleToggle}>
        <div className="filter-content">
          <div className="filter-label">{label}</div>
          <div className="filter-value">{value}</div>
        </div>
        <div className="filter-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          {options.map((option) => (
            <button
              key={option.value}
              className={`filter-option ${
                option.value === value ? 'filter-option-selected' : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Filter
