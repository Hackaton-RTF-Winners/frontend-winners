import './CardItem.css'

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

const CardItem = ({
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
  const tg = window.Telegram.WebApp

  const handleBuy = () => {
    tg.HapticFeedback.impactOccurred('light')
    if (onBuy) {
      onBuy()
    } else {
      tg.showAlert('Buy button clicked!')
    }
  }

  const handleShare = () => {
    tg.HapticFeedback.impactOccurred('light')
    if (onShare) {
      onShare()
    } else {
      tg.showAlert('Share button clicked!')
    }
  }

  return (
    <div className="card-item">
      {/* Top Section */}
      <div className="card-header">
        <div className="price-section">
          <div className="price">{price}</div>
          <div className="price-subtitle">{pricePerUnit}</div>
        </div>
        <div className="action-buttons">
          <button className="share-button" onClick={handleShare}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.24035 15.0391 5.47078 15.1111 5.68627L8.88889 9.31373C8.36089 8.97811 7.70848 8.8 7 8.8C4.79086 8.8 3 10.5909 3 12.8C3 15.0091 4.79086 16.8 7 16.8C7.70848 16.8 8.36089 16.6219 8.88889 16.2863L15.1111 19.9137C15.0391 20.1292 15 20.3596 15 20.6C15 22.2569 16.3431 23.6 18 23.6C19.6569 23.6 21 22.2569 21 20.6C21 18.9431 19.6569 17.6 18 17.6C17.2915 17.6 16.6391 17.7781 16.1111 18.1137L9.88889 14.4863C9.96089 14.2708 10 14.0404 10 13.8C10 13.5596 9.96089 13.3292 9.88889 13.1137L16.1111 9.48627C16.6391 9.82189 17.2915 10 18 10C19.6569 10 21 8.65685 21 7C21 5.34315 19.6569 4 18 4C16.3431 4 15 5.34315 15 7C15 7.24035 15.0391 7.47078 15.1111 7.68627L8.88889 11.3137C8.36089 10.9781 7.70848 10.8 7 10.8C4.79086 10.8 3 12.5909 3 14.8C3 17.0091 4.79086 18.8 7 18.8C7.70848 18.8 8.36089 18.6219 8.88889 18.2863L15.1111 21.9137C15.0391 22.1292 15 22.3596 15 22.6C15 24.2569 16.3431 25.6 18 25.6C19.6569 25.6 21 24.2569 21 22.6C21 20.9431 19.6569 19.6 18 19.6C17.2915 19.6 16.6391 19.7781 16.1111 20.1137L9.88889 16.4863C9.96089 16.2708 10 16.0404 10 15.8C10 15.5596 9.96089 15.3292 9.88889 15.1137L16.1111 11.4863C16.6391 11.8219 17.2915 12 18 12C19.6569 12 21 10.6569 21 9C21 7.34315 19.6569 6 18 6C16.3431 6 15 7.34315 15 9C15 9.24035 15.0391 9.47078 15.1111 9.68627L8.88889 13.3137C8.36089 12.9781 7.70848 12.8 7 12.8C4.79086 12.8 3 14.5909 3 16.8C3 19.0091 4.79086 20.8 7 20.8C7.70848 20.8 8.36089 20.6219 8.88889 20.2863L15.1111 23.9137C15.0391 24.1292 15 24.3596 15 24.6C15 26.2569 16.3431 27.6 18 27.6C19.6569 27.6 21 26.2569 21 24.6C21 22.9431 19.6569 21.6 18 21.6C17.2915 21.6 16.6391 21.7781 16.1111 22.1137L9.88889 18.4863C9.96089 18.2708 10 18.0404 10 17.8C10 17.5596 9.96089 17.3292 9.88889 17.1137L16.1111 13.4863C16.6391 13.8219 17.2915 14 18 14C19.6569 14 21 12.6569 21 11C21 9.34315 19.6569 8 18 8Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="buy-button" onClick={handleBuy}>
            BUY
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="card-content">
        {/* Seller Info */}
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

        {/* Transaction Details */}
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

export default CardItem
