import './CardItem.css'
import { useTelegramHaptic } from '@features/TelegramHaptic'

interface CardItemProps {
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
  onShare?: () => void
}

export const CardItem = ({
  price = '82.98 RUB',
  pricePerUnit = 'Price per 1 USDT',
  sellerName = 'Funny Bee',
  sellerIcon = '🐝',
  tradesCount = 234,
  successRate = 100,
  available = '481.34 USDT',
  limits = '39,000 – 39,000 RUB',
  paymentMethods = ['SBP'],
  onBuy,
  onShare,
}: CardItemProps) => {
  const { vibrate, showAlert } = useTelegramHaptic()

  const handleBuy = () => {
    vibrate('light')
    if (onBuy) {
      onBuy()
    } else {
      showAlert('Buy button clicked!')
    }
  }

  const handleShare = () => {
    vibrate('light')
    if (onShare) {
      onShare()
    } else {
      showAlert('Share button clicked!')
    }
  }

  return (
    <div className="card-item">
      <div className="card-header">
        <div className="price-section">
          <div className="price">{price}</div>
          <div className="price-subtitle">{pricePerUnit}</div>
        </div>
        <div className="action-buttons">
          <button className="share-button" onClick={handleShare}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="buy-button" onClick={handleBuy}>
            BUY
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="seller-info">
          <div className="seller-avatar">
            <span className="seller-icon">{sellerIcon}</span>
            <div className="online-indicator"></div>
          </div>
          <div className="seller-details">
            <div className="seller-name">{sellerName}</div>
            <div className="seller-stats">
              {tradesCount} trades • {successRate}%
            </div>
          </div>
        </div>

        <div className="transaction-details">
          <div className="detail-row">
            <span className="detail-label">Available</span>
            <span className="detail-value">{available}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Limits</span>
            <span className="detail-value">{limits}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Payment Methods</span>
            <span className="detail-value">{paymentMethods.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
