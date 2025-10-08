import { apiClient } from './client'

const HEALTH_ENDPOINT = '/api/v1/health'

export const healthApi = {
  check: async () => {
    const { status } = await apiClient.get(HEALTH_ENDPOINT)
    return status === 200
  },
}
