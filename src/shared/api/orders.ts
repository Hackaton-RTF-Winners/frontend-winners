import { apiClient } from './client'
import type { ValidationError } from './types'
export interface OrdersQuery {
  page?: number
  size?: number
}

export interface OrderRecord {
  id: string
  price_id: string
  first_name: string | null
  last_name: string | null
  inn: string | null
  phone: string | null
  created_at: string
  updated_at?: string | null
}

export interface OrdersCollectionResponse {
  ok: boolean
  detail?: string | null
  validation_errors?: ValidationError[] | null
  page_id: number
  page_size: number
  total_elements: number
  total_pages: number
  orders: OrderRecord[] | null
}

export interface OrderResponse {
  ok: boolean
  detail?: string | null
  validation_errors?: ValidationError[] | null
  order: OrderRecord
}
export interface CreateOrderRequest {
  nomenclature_id: string
  first_name: string
  last_name: string
  phone: string
  inn: string
  contact: string
}

const ORDERS_BASE = '/api/v1/orders'

export const ordersApi = {
  getAll: async (params?: OrdersQuery) => {
    const { data } = await apiClient.get<OrdersCollectionResponse>(
      ORDERS_BASE,
      {
        params,
      },
    )
    return data
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<OrderResponse>(`${ORDERS_BASE}/${id}`)
    return data
  },

  create: async (payload: CreateOrderRequest) => {
    const { data } = await apiClient.post<OrderResponse>(
      `${ORDERS_BASE}/create`,
      payload,
    )
    return data
  },
}
