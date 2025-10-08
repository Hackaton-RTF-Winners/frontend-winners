import { useState } from 'react'
import { useCart } from '@shared/lib'
import { CardItem } from '@features/CardItem/ui/CardItem'
import './CartItemPage.css'
import { useNavigate } from 'react-router-dom'

export const CartItemPage = () => {
  const { items, removeItem, clear } = useCart()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectionMode, setSelectionMode] = useState(false)
  const navigate = useNavigate()

  if (!items.length) {
    return (
      <div className="cart-empty">
        <h1>Корзина пока пуста. Зайдите в каталог и выберите товары.</h1>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-actions">
        {selectionMode && selectedIds.size > 0 && (
          <button
            onClick={() => {
              selectedIds.forEach((id) => removeItem(id))
              setSelectedIds(new Set())
              setSelectionMode(false)
            }}
            className="cart-button cart-button-secondary"
          >
            Удалить выбранные
          </button>
        )}
        <button
          onClick={() => setSelectionMode((v) => !v)}
          className="cart-button cart-button-primary"
        >
          {selectionMode ? 'Отменить выбор' : 'Выбрать'}
        </button>
      </div>
      <div className="cart-grid">
        {items.map((i) => (
          <div key={i.id} className="cart-cell">
            {selectionMode && (
              <input
                type="checkbox"
                checked={selectedIds.has(i.id)}
                onChange={(e) => {
                  setSelectedIds((prev) => {
                    const next = new Set(prev)
                    if (e.target.checked) {
                      next.add(i.id)
                    } else {
                      next.delete(i.id)
                    }
                    return next
                  })
                }}
                className="cart-checkbox"
                aria-label="Выбрать товар"
              />
            )}
            <CardItem product={i.product} hideBuyButton />
          </div>
        ))}
      </div>
      <div className="cart-clear-section">
        <button onClick={clear} className="cart-button cart-button-secondary">
          Очистить корзину
        </button>
      </div>
      {/* Fixed buy button above BottomBar: hidden during selection until at least one item is selected */}
      {items.length > 0 && (!selectionMode || selectedIds.size > 0) && (
        <button
          className="cart-buy-fixed"
          onClick={() => {
            navigate('/chat', {
              state: {
                notifyMessage:
                  'Вы подали заявку на покупку. Наш менеджер "@qwerty" свяжется с вами в ближайшее время',
              },
            })
          }}
        >
          Купить
        </button>
      )}
    </div>
  )
}
