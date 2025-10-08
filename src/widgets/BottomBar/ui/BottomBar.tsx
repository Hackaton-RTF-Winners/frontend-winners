import { useEffect, useState, type CSSProperties } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './BottomBar.css'

export const BottomBar = () => {
  const [active, setActive] = useState('home')
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { id: 'home', label: 'Главная', icon: '/icons/home.svg', path: '/' },
    {
      id: 'catalog',
      label: 'Каталог',
      icon: '/icons/catalog.svg',
      path: '/catalog',
    },
    { id: 'chat', label: 'Чат', icon: '/icons/chat.svg', path: '/chat' },
    { id: 'cart', label: 'Корзина', icon: '/icons/cart.svg', path: '/cart' },
  ] as const

  useEffect(() => {
    const current = tabs.find((t) => t.path === location.pathname)
    if (current) {
      setActive(current.id)
    }
  }, [location.pathname])

  return (
    <nav className="bottom-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => {
            setActive(tab.id)
            navigate(tab.path)
          }}
        >
          <span
            className="icon-mask"
            style={
              { ['--icon-url']: `url(${tab.icon})` } as CSSProperties &
                Record<'--icon-url', string>
            }
            aria-hidden="true"
          />
          <span className="label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
