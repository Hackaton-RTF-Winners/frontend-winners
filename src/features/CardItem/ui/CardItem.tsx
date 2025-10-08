import './CardItem.css'
import { useState } from 'react'
import { useTelegramHaptic } from '@features/TelegramHaptic'
import type { PipeNomenclature } from '@features/JSONInerfaces'

export interface CardItemProps {
  product?: PipeNomenclature
  price?: string
  pricePerUnit?: string
  sellerName?: string
  sellerIcon?: string
  tradesCount?: number
  successRate?: number
  available?: string
  limits?: string
  paymentMethods?: string[]
  onBuy?: () => void
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
  },
  price = 'По запросу',
  onBuy,
}: CardItemProps) => {
  const { vibrate } = useTelegramHaptic()
  const [isCopiedToastVisible, setIsCopiedToastVisible] = useState(false)

  const handleBuy = () => {
    vibrate('light')
    if (onBuy) {
      onBuy()
    }
  }

  const handleCopyTypeId = async () => {
    try {
      await navigator.clipboard.writeText(product.TypeId)
      vibrate('light')
      setIsCopiedToastVisible(true)
      setTimeout(() => setIsCopiedToastVisible(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div className="card-item">
      <div className="card-header">
        <div className="price-section">
          <div className="price">{price}</div>
          <div className="price-subtitle">{product.ProductionType}</div>
        </div>
        <div className="action-buttons">
          <button className="buy-button" onClick={handleBuy}>
            КУПИТЬ
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="seller-info">
          <div className="seller-avatar">
            <span className="seller-icon">🔧</span>
            <div className="online-indicator"></div>
          </div>
          <div className="seller-details">
            <div className="seller-name">{product.Manufacturer}</div>
            <div className="seller-stats">
              {product.Gost} • {product.SteelGrade}
            </div>
          </div>
        </div>

        <div className="transaction-details">
          <div className="detail-row">
            <span className="detail-label">Диаметр</span>
            <span className="detail-value">{product.Diameter} мм</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Толщина стенки</span>
            <span className="detail-value">{product.PipeWallThickness} мм</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Форма длины</span>
            <span className="detail-value">{product.FormOfLength}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Артикул</span>
            <span className="detail-value with-icon">
              {product.IDTypeNew}
              <button
                className="doc-button"
                onClick={handleCopyTypeId}
                aria-label="Скопировать инвентарный номер"
              >
                <span className="icon-doc" aria-hidden="true" />
              </button>
            </span>
          </div>
        </div>
      </div>
      {isCopiedToastVisible && (
        <div className="copy-toast">Инвентарный номер скопирован</div>
      )}
    </div>
  )
}
