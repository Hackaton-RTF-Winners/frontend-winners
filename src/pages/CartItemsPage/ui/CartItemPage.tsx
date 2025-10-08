import { useState } from 'react'
import { useCart } from '@shared/lib'
import { CardItem } from '@features/CardItem/ui/CardItem'
import './CartItemPage.css'

export const CartItemPage = () => {
  const { items, removeItem, clear } = useCart()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectionMode, setSelectionMode] = useState(false)

  if (!items.length) {
    return (
      <div
        style={{
          padding: 16,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 56px - env(safe-area-inset-bottom))',
          color: 'var(--tg-theme-text-color, #000000)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 30, lineHeight: 1.5 }}>
          Корзина пока пуста. Зайдите в каталог и выберите товары.
        </h1>
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
            style={{
              background: 'transparent',
              color: 'var(--tg-theme-button-color, #3390ec)',
              border:
                '1px solid var(--tg-theme-section-separator-color, #e3e3e3)',
              borderRadius: 8,
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Удалить выбранные
          </button>
        )}
        <button
          onClick={() => setSelectionMode((v) => !v)}
          style={{
            background: 'var(--tg-theme-button-color, #3390ec)',
            color: 'var(--tg-theme-button-text-color, #ffffff)',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
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
                style={{
                  transform: 'scale(1.4)',
                  accentColor: 'var(--tg-theme-button-color, #3390ec)',
                }}
                aria-label="Выбрать товар"
              />
            )}
            <CardItem product={i.product} hideBuyButton />
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}
      >
        <button
          onClick={clear}
          style={{
            background: 'transparent',
            color: 'var(--tg-theme-button-color, #3390ec)',
            border:
              '1px solid var(--tg-theme-section-separator-color, #e3e3e3)',
            borderRadius: 8,
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Очистить корзину
        </button>
      </div>
      {/* Fixed buy button above BottomBar: hidden during selection until at least one item is selected */}
      {items.length > 0 && (!selectionMode || selectedIds.size > 0) && (
        <button
          className="cart-buy-fixed"
          onClick={() => {
            /* TODO: переход к оформлению */
          }}
        >
          Купить
        </button>
      )}
    </div>
  )
}
