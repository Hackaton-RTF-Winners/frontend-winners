import { MainPage } from '@pages/MainPage'
import { useInitializeTgApp } from '@features/InitializeTgApp'
import { Route, Routes } from 'react-router-dom'
import { CartItemPage } from '@pages/CartItemsPage'
import { SupportChatPage } from '@pages/SupportChatPage'
import { BottomBar } from '@widgets/BottomBar'
import { CartProvider } from '@shared/lib'
import { CatalogPage } from '@pages/CatalogPage'

function App() {
  useInitializeTgApp()
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartItemPage />} />
        <Route path="/chat" element={<SupportChatPage />} />
      </Routes>
      <BottomBar />
    </CartProvider>
  )
}

export default App
