import { useState } from 'react'
import './BottomBar.css'

export const BottomBar = () => {
  const [active, setActive] = useState('home')

  const tabs = [
    { id: 'home', label: 'Главная', icon: '/icons/home.svg' },
    { id: 'catalog', label: 'Каталог', icon: '/icons/catalog.svg' },
    { id: 'chat', label: 'Чат', icon: '/icons/chat.svg' },
    { id: 'cart', label: 'Корзина', icon: '' },
  ]

  return (
    <nav className="bottom-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => setActive(tab.id)}
        >
          <img className="icon" src={tab.icon} alt="" aria-hidden="true" />
          <span className="label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
