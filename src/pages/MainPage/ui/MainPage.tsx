import './MainPage.css'

export const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <div className="welcome-section">
          <img src="/images/TMK_logo.svg" alt="TMK Logo" className="tmk-logo" />
          <h1 className="welcome-title">Добро пожаловать 👋</h1>
          <p className="welcome-subtitle">
            Мы поможем оформить заказ на трубную продукцию быстро и удобно
          </p>
        </div>
      </div>
    </div>
  )
}
