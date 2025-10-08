import './MainPage.css'

export const MainPage = () => {
  const tmkLogo = `${import.meta.env.BASE_URL}images/images-Photoroom.png`
  return (
    <div className="main-page">
      <div className="main-content">
        <div className="welcome-section">
          <img src={tmkLogo} alt="TMK Logo" className="tmk-logo" />
          <h1 className="welcome-title">Добро пожаловать 👋</h1>
          <p className="welcome-subtitle">
            Мы поможем оформить заказ на трубную продукцию быстро и удобно
          </p>
        </div>
      </div>
    </div>
  )
}
