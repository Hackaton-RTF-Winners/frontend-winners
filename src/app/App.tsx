import { MainPage } from '@pages/MainPage'
import { useInitializeTgApp } from '@features/InitializeTgApp'

function App() {
  useInitializeTgApp()
  return <MainPage />
}

export default App
