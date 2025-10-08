import { apiClient } from './client'
import type { ValidationError } from './types'

export interface NomenclaturesQuery {
  page?: number
  size?: number
}

export interface NomenclatureRecord {
  id: string
  category_id: string
  pipe_type_id: string
  classifier: string | null
  production_type: string | null
  name: string | null
  gost: string | null
  form_of_length: string | null
  manufacturer: string | null
  steel_grade: string | null
  diameter: number
  pipe_wall_thickness: number
  status: boolean
  koef: number
  created_at: string
  updated_at?: string | null
}

export interface NomenclatureResponse {
  ok: boolean
  detail?: string | null
  validation_errors?: ValidationError[] | null
  nomenclature: NomenclatureRecord
}

export interface NomenclaturesCollectionResponse {
  ok: boolean
  detail?: string | null
  validation_errors?: ValidationError[] | null
  page_id: number
  page_size: number
  total_elements: number
  total_pages: number
  nomenclatures: NomenclatureRecord[] | null
}

const NOMENCLATURES_BASE = '/api/v1/nomenclatures'

export const nomenclaturesApi = {
  getAll: async (params?: NomenclaturesQuery) => {
    const { data } = await apiClient.get<NomenclaturesCollectionResponse>(
      NOMENCLATURES_BASE,
      { params },
    )
    return data
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<NomenclatureResponse>(
      `${NOMENCLATURES_BASE}/${id}`,
    )
    return data
  },
}
