import { useCallback } from 'react'
import WebApp from '@twa-dev/sdk'
import type { HapticImpactStyle, HapticNotificationType } from '../types'

export const useTelegramHaptic = () => {
  const tg = WebApp

  const vibrate = useCallback((style: HapticImpactStyle = 'light') => {
    tg.HapticFeedback.impactOccurred(style)
  }, [])

  const notifyUser = useCallback((type: HapticNotificationType) => {
    tg.HapticFeedback.notificationOccurred(type)
  }, [])

  const vibrateSelection = useCallback(() => {
    tg.HapticFeedback.selectionChanged()
  }, [])

  const showConfirm = useCallback(
    (message: string, callback?: (confirmed: boolean) => void) => {
      tg.showConfirm(message, callback)
    },
    [],
  )

  return {
    tg,
    vibrate,
    notifyUser,
    vibrateSelection,
    showConfirm,
  }
}
