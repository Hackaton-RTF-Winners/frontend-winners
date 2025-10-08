import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { PipeNomenclature } from '@features/JSONInerfaces'

export interface CartItem {
  id: string
  name: string
  typeId: string
  product: PipeNomenclature
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (product: PipeNomenclature) => void
  removeItem: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: PipeNomenclature) => {
    setItems((prev) => {
      const id = product.Id || product.TypeId
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [
        ...prev,
        {
          id,
          name: product.Name,
          typeId: product.TypeId,
          product,
          quantity: 1,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({ items, addItem, removeItem, clear }),
    [items, addItem, removeItem, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
