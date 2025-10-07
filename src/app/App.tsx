import { MainPage } from '@pages/MainPage'
import { useInitializeTgApp } from '@features/InitializeTgApp'
import { Route, Routes } from 'react-router-dom'
import { CartItemPage } from '@pages/CartItemsPage'
import { SupportChatPage } from '@pages/SupportChatPage'

function App() {
  useInitializeTgApp()
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/cart" element={<CartItemPage />} />
      <Route path="/chat" element={<SupportChatPage />} />
    </Routes>
  )
}

export default App
