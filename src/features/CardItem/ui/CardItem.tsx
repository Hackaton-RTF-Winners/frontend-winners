import './CardItem.css'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTelegramHaptic } from '@features/TelegramHaptic'
import { useCart } from '@shared/lib'
import type { PipeNomenclature } from '@shared/api/types'

export interface CardItemProps {
  product?: PipeNomenclature
  onBuy?: () => void
  buyLabel?: string
  hideBuyButton?: boolean
}

export const CardItem = ({
  product = {
    Id: '10001',
    CategoryId: '121',
    TypeId: 'a58d54b6-25ea-4818-afc9-1faa8c630d9a',
    IDTypeNew: 'Цб00000000001',
    ProductionType: 'Бесшовные холоднодеформированные',
    IDFunctionType: '',
    Name: 'Бесшовные холоднодеформированные, ТУ 14-162-68-2000, D 140.00ММ, S 3.50ММ, МСт 09Г2С-15, СинТЗ',
    Gost: 'ТУ 14-162-68-2000',
    FormOfLength: 'НК',
    Manufacturer: 'СинТЗ',
    SteelGrade: '09Г2С-15',
    Diameter: 140.0,
    ProfileSize2: 0,
    PipeWallThickness: 3.5,
    Status: 1,
    Koef: 0.011782032,
    Stock: 'Склад-1',
    StockName: 'Основной склад',
    InStock: 150,
    Price: 2500,
  },
  onBuy,
  buyLabel = 'В корзину',
  hideBuyButton = false,
}: CardItemProps) => {
  const { vibrate } = useTelegramHaptic()
  const { addItem } = useCart()
  const [isCopiedToastVisible, setIsCopiedToastVisible] = useState(false)

  const handleBuy = () => {
    vibrate('light')
    addItem(product)
    if (onBuy) {
      onBuy()
    }
  }

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(product.Id)
      vibrate('light')
      setIsCopiedToastVisible(true)
      setTimeout(() => setIsCopiedToastVisible(false), 1500)
    } catch {
      console.error('Clipboard write failed')
    }
  }

  const formatPrice = (price?: number) => {
    if (!price) {return 'По запросу'}
    return `${price.toLocaleString('ru-RU')} ₽`
  }

  const getPriceDisplay = () => {
    if (!product.Price) {
      return {
        main: 'Цена за единицу',
        subtitle: 'По запросу',
      }
    }
    return {
      main: formatPrice(product.Price),
      subtitle: 'Цена за единицу',
    }
  }

  const formatStock = (stock?: number) => {
    if (!stock) {return 'Нет в наличии'}
    return `${stock} шт.`
  }

  return (
    <div className="card-item">
      <div className="card-header">
        <div className="price-section">
          {(() => {
            const priceDisplay = getPriceDisplay()
            return (
              <>
                <div
                  className={`price ${!product.Price ? 'price-no-value' : ''}`}
                >
                  {priceDisplay.main}
                </div>
                <div
                  className={`price-subtitle ${!product.Price ? 'price-subtitle-no-value' : ''}`}
                >
                  {priceDisplay.subtitle}
                </div>
              </>
            )
          })()}
        </div>
        {!hideBuyButton && (
          <div className="action-buttons">
            <button className="buy-button" onClick={handleBuy}>
              {buyLabel}
            </button>
          </div>
        )}
      </div>

      <div className="card-content">
        <div className="product-details">
          <div className="detail-row">
            <span className="detail-label">ГОСТ</span>
            <span className="detail-value">{product.Gost}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Марка стали</span>
            <span className="detail-value">{product.SteelGrade}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Склад</span>
            <span className="detail-value">
              {product.StockName || product.Stock}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Количество в наличии</span>
            <span className="detail-value">{formatStock(product.InStock)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">ID</span>
            <span className="detail-value with-icon">
              {product.Id}
              <button
                className="doc-button"
                onClick={handleCopyId}
                aria-label="Скопировать ID"
              >
                <span className="icon-doc" aria-hidden="true" />
              </button>
            </span>
          </div>
        </div>
      </div>
      {isCopiedToastVisible &&
        createPortal(
          <div className="copy-toast">ID скопирован</div>,
          document.body,
        )}
    </div>
  )
}
