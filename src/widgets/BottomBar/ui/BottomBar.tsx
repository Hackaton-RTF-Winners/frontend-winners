import { useState } from 'react'
import './BottomBar.css'

export const BottomBar = () => {
  const [active, setActive] = useState('home')

  const tabs = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'chat', label: 'Чат' },
    { id: 'cart', label: 'Корзина' },
  ]

  return (
    <nav className="bottom-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => setActive(tab.id)}
        >
          <span className="label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
